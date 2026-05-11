# APEX Athletic — Full-Stack E-Commerce Website

**Author:** Rayyan

A multi-page e-commerce website for a fictional sports and fitness apparel brand, built with a Node.js + Express backend and a SQLite database. Features include user registration and login, a persistent shopping cart, secure checkout tied to user accounts, order history, and a role-based admin dashboard.

---

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks, no build tools)
- **Backend:** Node.js with Express
- **Database:** SQLite (via better-sqlite3)
- **Authentication:** bcryptjs for password hashing, express-session for session management

---

## Features

### Customer-facing
- Multi-page storefront (Home, Shop, Product Detail, Cart, Checkout, About, Contact)
- Dark and light theme toggle
- Product catalog with filtering
- Shopping cart (persists in localStorage)
- User registration with email provider validation (only Gmail, Outlook, Hotmail, Yahoo, or iCloud accepted)
- Show/hide password toggle
- Protected checkout (requires login)
- Personal order history page

### Admin
- Role-based access (only users marked as admin can access)
- Dashboard with total orders, total revenue, and customer count
- View all orders across all customers
- See customer details attached to each order

### Security
- Passwords hashed with bcrypt (never stored in plain text)
- Session-based authentication with HTTP-only cookies
- Admin routes protected on both frontend and backend

---

## How to Run

### Prerequisites
- Node.js (version 18 or higher). Download from https://nodejs.org

### Steps

1. **Unzip the project folder.**

2. **Open a terminal inside the project folder** (the one containing `server.js` and `package.json`).

3. **Start the server:**
```
   node server.js
```
   You should see:
```
   Database ready
   Server running at http://localhost:3000
```

4. **Open the site in a browser:**
   Go to http://localhost:3000

5. **To stop the server:** Press `Ctrl+C` in the terminal.

> **Note:** `node_modules` is included in this submission, so no `npm install` is needed. If for any reason the server fails to start, run `npm install` first.

---

## Demo Walkthrough

### Regular user experience

1. Go to http://localhost:3000
2. Browse products on the Shop page
3. Click a product to view details
4. Add items to your cart
5. Click the cart icon (top right), then Checkout
6. You will be redirected to register/login since checkout requires an account
7. Click "Sign up" and create an account (must use a Gmail, Outlook, Hotmail, Yahoo, or iCloud email)
8. After signing up, you're redirected home — add items to cart again and proceed to checkout
9. Fill in the form and click "Place Order"
10. View your order under "My Orders" in the navbar

### Admin experience

By default no account is an admin. To test the admin dashboard:

1. Register a new account at http://localhost:3000/register.html
2. Stop the server (`Ctrl+C`)
3. Run this command in the terminal, replacing `your-email@gmail.com` with the email you registered with:
```
   node -e "const db=require('better-sqlite3')('database.db');db.prepare('UPDATE users SET is_admin=1 WHERE email=?').run('your-email@gmail.com');console.log('Admin access granted')"
```
4. Start the server again (`node server.js`)
5. Log in with that account — you will see an "Admin" link in the navbar (neon green)
6. Click "Admin" to view the dashboard with stats and all orders

---

## Project Structure

```
web/
├── server.js              Backend server and API routes
├── package.json           Project dependencies
├── README.md              This file
├── public/                All frontend files served by the server
│   ├── index.html         Home page
│   ├── products.html      Product catalog
│   ├── product-detail.html
│   ├── cart.html          Shopping cart
│   ├── checkout.html      Checkout form
│   ├── login.html
│   ├── register.html
│   ├── orders.html        User order history
│   ├── admin.html         Admin dashboard
│   ├── about.html
│   ├── contact.html
│   ├── style.css
│   ├── shared.js          Shared functions + product data
│   └── [page].js          Per-page JavaScript
└── node_modules/          Installed dependencies
```

The file `database.db` is created automatically the first time the server runs.

---

## API Endpoints

All endpoints return JSON.

### Authentication
- `POST /api/register` — Create a new account
- `POST /api/login` — Log in
- `POST /api/logout` — Log out
- `GET /api/me` — Get current logged-in user info

### Orders
- `POST /api/orders` — Create a new order (requires login)
- `GET /api/orders` — Get current user's orders (requires login)
- `GET /api/admin/orders` — Get all orders (requires admin)

---

## Database Schema

**users table**
- id, email, password (hashed), name, is_admin, created_at

**orders table**
- id, user_id, items (JSON), total, shipping_name, shipping_address, status, created_at

---

## Notes

- The database file (`database.db`) is created automatically the first time the server is started.
- Product data is stored in `public/shared.js`. This could be migrated to the database as a future improvement.
- Session cookies last 7 days.
- The application runs on port 3000 by default.
# E-commerce-website
Full stack e-commerce website for a college project
