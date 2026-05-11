// product-detail.js
(function() {
  const root = document.getElementById('pdp');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'p1';
  const p = window.APEX.PRODUCTS.find(x => x.id === id) || window.APEX.PRODUCTS[0];
  const isFav = window.APEX.getFavs().includes(p.id);

  const sizeOptions = p.sizes.map((s, i) => `
    <label><input type="radio" name="size" value="${s}" ${i === 0 ? 'checked' : ''}>${s}</label>
  `).join('');

  const thumbs = p.images.map((img, i) => `
    <img src="${img}" alt="${p.name} view ${i+1}" class="${i === 0 ? 'active' : ''}" data-idx="${i}">
  `).join('');

  const old = p.oldPrice ? `<del>$${p.oldPrice}</del>` : '';

  root.innerHTML = `
    <div class="pdp-gallery">
      <div class="pdp-main"><img src="${p.images[0]}" alt="${p.name}" id="main-img"></div>
      <div class="pdp-thumbs">${thumbs}</div>
    </div>
    <div class="pdp-info">
      <span class="cat">${p.type}</span>
      <h1>${p.name}</h1>
      <div class="pdp-rating">
        <span class="stars">★★★★★</span>
        <span>4.9 · 312 reviews</span>
      </div>
      <div class="pdp-price">$${p.price} ${old}</div>
      <p class="pdp-desc">${p.desc}</p>

      <div class="pdp-section">
        <span class="label">Select Size</span>
        <div class="size-options">${sizeOptions}</div>
      </div>

      <div class="qty-row">
        <span class="label" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;">Qty</span>
        <div class="qty">
          <button id="qty-down">−</button>
          <input type="number" id="qty" value="1" min="1">
          <button id="qty-up">+</button>
        </div>
      </div>

      <div class="pdp-cta">
        <button class="btn btn-accent" id="add-cart">Add to Bag</button>
        <button class="btn btn-outline" id="fav-btn">${isFav ? '♥ Saved' : '♡ Save'}</button>
      </div>

      <div class="pdp-features">
        <div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>Free shipping over $100 — every order, no exceptions</div>
        <div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>30-day no-questions returns. Try it. Train in it.</div>
        <div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>You're not just buying gear. You're joining the squad.</div>
      </div>
    </div>
  `;

  // Wire up
  const mainImg = document.getElementById('main-img');
  document.querySelectorAll('.pdp-thumbs img').forEach(t => {
    t.addEventListener('click', () => {
      mainImg.src = t.src;
      document.querySelectorAll('.pdp-thumbs img').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  const qtyInput = document.getElementById('qty');
  document.getElementById('qty-up').addEventListener('click', () => qtyInput.value = parseInt(qtyInput.value || 1) + 1);
  document.getElementById('qty-down').addEventListener('click', () => qtyInput.value = Math.max(1, parseInt(qtyInput.value || 1) - 1));

  document.getElementById('add-cart').addEventListener('click', () => {
    const size = document.querySelector('input[name="size"]:checked').value;
    const qty = parseInt(qtyInput.value) || 1;
    window.APEX.addToCart(p.id, size, qty);
  });

  document.getElementById('fav-btn').addEventListener('click', () => {
    const nowFav = window.APEX.toggleFav(p.id);
    document.getElementById('fav-btn').innerHTML = nowFav ? '♥ Saved' : '♡ Save';
    window.APEX.toast(nowFav ? 'Saved to wishlist' : 'Removed from wishlist');
  });

  document.title = `${p.name} · APEX ATHLETIC`;
})();
