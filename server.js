// ============================================
// APEX Athletic - Backend Server
// ============================================

const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// ============================================
// Middleware (runs on every request)
// ============================================
app.use(express.json()); // allows reading JSON from requests
app.use(express.static(path.join(__dirname, 'public'))); // serves frontend files
app.use(session({
  secret: 'apex-athletic-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

// ============================================
// Database setup
// ============================================
const db = new Database('database.db');

// Create tables if they don't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    shipping_name TEXT,
    shipping_address TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('Database ready');

// ============================================
// Helper: check if user is logged in
// ============================================
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'You must be logged in' });
  }
  next();
}

// ============================================
// AUTH ROUTES
// ============================================

// Register a new user
// Register a new user
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Email must be from an allowed provider
  const allowedProviders = /@(gmail|outlook|hotmail|yahoo|icloud)\.com$/i;
  if (!allowedProviders.test(email)) {
    return res.status(400).json({ error: 'Email must be from Gmail, Outlook, Hotmail, Yahoo, or iCloud' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = db.prepare(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'
    ).run(email, hashedPassword, name);

    req.session.userId = result.lastInsertRowid;
    req.session.userName = name;
    res.json({ success: true, user: { id: result.lastInsertRowid, email, name } });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Log in
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  req.session.userId = user.id;
  req.session.userName = user.name;
  req.session.isAdmin = user.is_admin === 1;
  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, isAdmin: user.is_admin === 1 } });
});

// Log out
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Check who's logged in
app.get('/api/me', (req, res) => {
  if (!req.session.userId) {
    return res.json({ loggedIn: false });
  }
  const user = db.prepare('SELECT id, email, name, is_admin FROM users WHERE id = ?').get(req.session.userId);
  res.json({ loggedIn: true, user: { ...user, isAdmin: user.is_admin === 1 } });
});

// ============================================
// ORDER ROUTES
// ============================================

// Create an order (checkout)
app.post('/api/orders', requireLogin, (req, res) => {
  const { items, total, shippingName, shippingAddress } = req.body;

  if (!items || !total) {
    return res.status(400).json({ error: 'Items and total are required' });
  }

  const result = db.prepare(
    'INSERT INTO orders (user_id, items, total, shipping_name, shipping_address) VALUES (?, ?, ?, ?, ?)'
  ).run(req.session.userId, JSON.stringify(items), total, shippingName || '', shippingAddress || '');

  res.json({ success: true, orderId: result.lastInsertRowid });
});

// Get my orders
app.get('/api/orders', requireLogin, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.session.userId);
  const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.items) }));
  res.json(parsed);
});

// Admin: get all orders
app.get('/api/admin/orders', requireLogin, (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  const orders = db.prepare(`
    SELECT orders.*, users.email, users.name as customer_name
    FROM orders JOIN users ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `).all();
  const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.items) }));
  res.json(parsed);
});

// ============================================
// Start the server
// ============================================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});