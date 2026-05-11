// ============================================
// APEX — Shared data, cart, and utilities
// Used across all pages via window.APEX
// ============================================

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Velocity FG Football Boot',
    category: 'football',
    type: 'Football Boots',
    price: 189,
    oldPrice: 220,
    tag: 'New',
    sizes: ['7','8','9','10','11','12'],
    img: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
      'https://images.unsplash.com/photo-1536122985607-4fe00b283652?w=900&q=80',
      'https://images.unsplash.com/photo-1571267434388-6a1df2649dce?w=900&q=80',
      'https://images.unsplash.com/photo-1580974869414-5e7b7e796a24?w=900&q=80',
    ],
    desc: 'Engineered for the player who refuses to slow down. Lightweight knit upper, precision-molded studs for explosive acceleration on firm ground. Built for the moment the whistle blows.'
  },
  {
    id: 'p2',
    name: 'Strike Pro Match Jersey',
    category: 'jerseys',
    type: 'Match Jerseys',
    price: 89,
    sizes: ['S','M','L','XL','XXL'],
    img: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=900&q=80',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?w=900&q=80',
      'https://images.unsplash.com/photo-1662096909714-e2f206d0a636?w=900&q=80',
      'https://images.unsplash.com/photo-1577212017308-55c4d60d2609?w=900&q=80'
    ],
    desc: 'Moisture-wicking technical fabric. Tournament-grade construction. Wear what the pros wear when the stakes are real.'
  },
  {
    id: 'p3',
    name: 'Apex Compression Tights',
    category: 'activewear',
    type: 'Activewear',
    price: 65,
    tag: 'Best Seller',
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1702449414685-1ed9316b7253?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1702449414685-1ed9316b7253?w=900&q=80',
      'https://plus.unsplash.com/premium_photo-1723507295759-30caa2a9759b?w=900&q=80',
      'https://images.unsplash.com/photo-1580058572462-98e2c0e0e2f0?w=900&q=80',
      'https://images.unsplash.com/photo-1665999374889-2a3242f105cf?w=900&q=80'
    ],
    desc: 'Graduated compression for muscle support and faster recovery. Four-way stretch fabric moves with you, not against you.'
  },
  {
    id: 'p4',
    name: 'Iron Forge Training Hoodie',
    category: 'gym',
    type: 'Gym Wear',
    price: 79,
    sizes: ['S','M','L','XL','XXL'],
    img: 'https://images.unsplash.com/photo-1600026453346-a44501602a02?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1600026453346-a44501602a02?w=900&q=80',
      'https://images.unsplash.com/photo-1660154531278-a066979d6307?w=900&q=80',
      'https://images.unsplash.com/photo-1584863431255-3997371dcc01?w=900&q=80',
      'https://images.unsplash.com/photo-1618355281641-077fc388c651?w=900&q=80'
    ],
    desc: 'Heavyweight cotton blend. Tapered fit. The kind of hoodie you wear from the warmup to the cooldown — and to the post-session coffee.'
  },
  {
    id: 'p5',
    name: 'Phantom Turf Trainer',
    category: 'football',
    type: 'Football Boots',
    price: 145,
    sizes: ['7','8','9','10','11'],
    img: 'https://images.unsplash.com/photo-1768696082282-df2812a4f7d8?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1768696082282-df2812a4f7d8?w=900&q=80',
      'https://images.unsplash.com/photo-1768696082140-e042cf8223e7?w=900&q=80',
      'https://images.unsplash.com/photo-1768696082264-44f14594ca2c?w=900&q=80',
      'https://images.unsplash.com/photo-1768696082133-024fedbdbc3b?w=900&q=80'
    ],
    desc: 'Built for artificial turf. Multi-stud configuration for grip in every direction. Train how you play.'
  },
  {
    id: 'p6',
    name: 'Heritage Away Jersey',
    category: 'jerseys',
    type: 'Match Jerseys',
    price: 95,
    oldPrice: 115,
    tag: 'Sale',
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1580089595767-98745d7025c5?w=900&q=80',
      'https://images.unsplash.com/photo-1580149959184-c3aaa501a0d4?w=900&q=80',
      'https://images.unsplash.com/photo-1710945261882-a94b3f31b15e?w=900&q=80',
      'https://images.unsplash.com/photo-1551479460-5e76c686816a?w=900&q=80'
    ],
    desc: 'A modern take on the classic away kit. Subtle texture, bold silhouette. For those who play with pride.'
  },
  {
    id: 'p7',
    name: 'Endurance Running Shorts',
    category: 'activewear',
    type: 'Activewear',
    price: 45,
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1695918428487-7934244c19ac?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1695918428487-7934244c19ac?w=900&q=80',
      'https://images.unsplash.com/photo-1695918425489-6c56df5eff9b?w=900&q=80',
      'https://images.unsplash.com/photo-1695918427978-c7add5d96333?w=900&q=80',
      'https://images.unsplash.com/photo-1695918425283-eb385c012b7a?w=900&q=80'
    ],
    desc: 'Lightweight, vented, built for distance. Hidden zip pocket. Reflective details. Made for the long miles.'
  },
  {
    id: 'p8',
    name: 'Lift Heavy Tank',
    category: 'gym',
    type: 'Gym Wear',
    price: 38,
    tag: 'New',
    sizes: ['S','M','L','XL','XXL'],
    img: 'https://images.unsplash.com/photo-1704223523232-526f6fab30a3?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1704223523232-526f6fab30a3?w=900&q=80',
      'https://images.unsplash.com/photo-1704223523409-016ec3b5779f?w=900&q=80',
      'https://images.unsplash.com/photo-1597452494947-f2986526d1be?w=900&q=80',
      'https://images.unsplash.com/flagged/photo-1597786772028-7859f6dcb903?w=900&q=80'
    ],
    desc: 'Drop-arm cut. Soft cotton-modal blend. The tank that earns its place in your rotation.'
  },
  {
    id: 'p9',
    name: 'Apex Series Joggers',
    category: 'gym',
    type: 'Gym Wear',
    price: 72,
    sizes: ['S','M','L','XL'],
    img: 'https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?w=900&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&q=80',
      'https://images.unsplash.com/photo-1552902831-bb0e060ac5a2?w=900&q=80',
      'https://images.unsplash.com/photo-1553247407-23251ce81f59?w=900&q=80'
    ],
    desc: 'Tapered. Tailored. The joggers you can wear to the gym, the cafe, and everywhere in between.'
  }
];

// ============================================
// CART (localStorage backed)
// ============================================
const CART_KEY = 'apex_cart_v1';
const FAV_KEY = 'apex_favs_v1';
const THEME_KEY = 'apex_theme_v1';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, size, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, size, qty });
  saveCart(cart);
  toast('Added to bag');
}
function removeFromCart(productId, size) {
  const cart = getCart().filter(i => !(i.id === productId && i.size === size));
  saveCart(cart);
}
function updateQty(productId, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) { item.qty = Math.max(1, qty); saveCart(cart); }
}
function cartTotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function updateCartCount() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.dataset.count = count;
  });
}

// ============================================
// FAVORITES
// ============================================
function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { return []; }
}
function toggleFav(id) {
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1);
  else favs.push(id);
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  return favs.includes(id);
}

// ============================================
// THEME
// ============================================
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.dataset.theme = saved;
}
function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
}

// ============================================
// TOAST
// ============================================
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ============================================
// PRODUCT CARD HTML
// ============================================
function productCardHTML(p) {
  const favs = getFavs();
  const isFav = favs.includes(p.id);
  const tag = p.tag ? `<span class="product-tag">${p.tag}</span>` : '';
  const old = p.oldPrice ? `<del>$${p.oldPrice}</del>` : '';
  return `
    <article class="product-card" data-id="${p.id}">
      <a href="product-detail.html?id=${p.id}" class="product-card-img">
        ${tag}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </a>
      <button class="product-fav ${isFav ? 'active' : ''}" aria-label="Add to favorites" data-fav="${p.id}">♥</button>
      <a href="product-detail.html?id=${p.id}" class="product-card-body">
        <span class="cat">${p.type}</span>
        <h3>${p.name}</h3>
        <div class="price">$${p.price}${old}</div>
      </a>
    </article>
  `;
}

// ============================================
// INIT (run on every page)
// ============================================
function initPage() {
  initTheme();
  updateCartCount();

  // Theme toggle
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Favorite buttons (delegated)
  document.addEventListener('click', e => {
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      e.preventDefault();
      const isFav = toggleFav(favBtn.dataset.fav);
      favBtn.classList.toggle('active', isFav);
      toast(isFav ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });

  // Newsletter
  document.querySelectorAll('.newsletter').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      toast('Welcome to the squad');
      form.querySelector('input').value = '';
    });
  });

  // Fade-in observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

// Expose
window.APEX = {
  PRODUCTS, getCart, saveCart, addToCart, removeFromCart, updateQty,
  cartTotal, getFavs, toggleFav, productCardHTML, initPage, toast
};

document.addEventListener('DOMContentLoaded', initPage);
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}
// ============================================
// Auth status in navbar
// ============================================
async function loadAuthStatus() {
  try {
    const res = await fetch('/api/me');
    const data = await res.json();
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // Remove old auth elements if present
    const oldAuth = document.getElementById('auth-section');
    if (oldAuth) oldAuth.remove();

    const authDiv = document.createElement('div');
    authDiv.id = 'auth-section';
    authDiv.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-right: 12px;';

   if (data.loggedIn) {
      const adminLink = data.user.isAdmin ? `<a href="admin.html" style="font-size: 14px; text-decoration: none; color: var(--accent); font-weight: 600;">Admin</a>` : '';
      authDiv.innerHTML = `
        ${adminLink}
        <a href="orders.html" style="font-size: 14px; text-decoration: none; color: inherit;">My Orders</a>
        <span style="font-size: 14px; opacity: 0.8;">Hi, ${data.user.name}</span>
        <button id="logout-btn" class="icon-btn" style="font-size: 13px; padding: 6px 12px; width: auto; border-radius: 4px;">Log out</button>
      `;
      navActions.insertBefore(authDiv, navActions.firstChild);
      document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
      authDiv.innerHTML = `
        <a href="login.html" style="font-size: 14px; text-decoration: none; color: inherit;">Log in</a>
      `;
      navActions.insertBefore(authDiv, navActions.firstChild);
    }
  } catch (err) {
    console.error('Failed to load auth status:', err);
  }
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = 'index.html';
}

// Run on every page load
document.addEventListener('DOMContentLoaded', loadAuthStatus);