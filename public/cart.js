// cart.js
(function() {
  const root = document.getElementById('cart-root');
  if (!root) return;

  function render() {
    const cart = window.APEX.getCart();
    if (!cart.length) {
      root.innerHTML = `
        <div class="cart-empty">
          <div class="display">Your bag is empty.</div>
          <p>The squad's waiting. Find your gear and get back to work.</p>
          <a href="products.html" class="btn btn-accent btn-arrow">Shop The Drop</a>
        </div>
      `;
      return;
    }

    const items = cart.map(item => {
      const p = window.APEX.PRODUCTS.find(x => x.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item" data-id="${p.id}" data-size="${item.size}">
          <img src="${p.img}" alt="${p.name}">
          <div class="cart-item-body">
            <h4>${p.name}</h4>
            <div class="meta">${p.type} · Size ${item.size}</div>
            <div class="actions">
              <div class="qty">
                <button data-act="dec">−</button>
                <input type="number" value="${item.qty}" min="1" data-act="qty">
                <button data-act="inc">+</button>
              </div>
              <button data-act="remove">Remove</button>
            </div>
          </div>
          <div class="cart-item-price">$${(p.price * item.qty).toFixed(0)}</div>
        </div>
      `;
    }).join('');

    const subtotal = window.APEX.cartTotal();
    const shipping = subtotal >= 100 ? 0 : 9.50;
    const total = subtotal + shipping;

    root.innerHTML = `
      <div class="cart-layout">
        <div class="cart-items">${items}</div>
        <aside class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
          <div class="summary-row"><span>Tax</span><span>Calculated at checkout</span></div>
          <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
          <a href="checkout.html" class="btn btn-accent btn-arrow">Checkout</a>
          <a href="products.html" class="btn btn-outline" style="margin-top:10px;">Keep Shopping</a>
          <p style="margin-top:24px;font-size:12px;color:var(--ink-dim);text-align:center;">Free shipping on orders over $100. Secure checkout.</p>
        </aside>
      </div>
    `;

    // Wire row actions
    root.querySelectorAll('.cart-item').forEach(row => {
      const id = row.dataset.id;
      const size = row.dataset.size;
      row.querySelector('[data-act="inc"]').addEventListener('click', () => {
        const item = window.APEX.getCart().find(i => i.id === id && i.size === size);
        window.APEX.updateQty(id, size, item.qty + 1); render();
      });
      row.querySelector('[data-act="dec"]').addEventListener('click', () => {
        const item = window.APEX.getCart().find(i => i.id === id && i.size === size);
        window.APEX.updateQty(id, size, item.qty - 1); render();
      });
      row.querySelector('[data-act="qty"]').addEventListener('change', e => {
        window.APEX.updateQty(id, size, parseInt(e.target.value) || 1); render();
      });
      row.querySelector('[data-act="remove"]').addEventListener('click', () => {
        window.APEX.removeFromCart(id, size); render();
      });
    });
  }

  render();
})();
