// checkout.js
(async function() {
  const linesEl = document.getElementById('order-lines');
  if (!linesEl) return;

  // ============================================
  // Check if user is logged in — if not, redirect
  // ============================================
  try {
    const authRes = await fetch('/api/me');
    const authData = await authRes.json();
    if (!authData.loggedIn) {
      window.APEX.toast('Please log in to checkout');
      setTimeout(() => location.href = 'login.html', 1500);
      return;
    }
    // Pre-fill email if logged in
    const emailField = document.getElementById('email');
    if (emailField && authData.user.email) {
      emailField.value = authData.user.email;
    }
  } catch (err) {
    console.error('Auth check failed:', err);
  }

  // ============================================
  // Build the order summary (unchanged)
  // ============================================
  const cart = window.APEX.getCart();
  const lines = cart.map(item => {
    const p = window.APEX.PRODUCTS.find(x => x.id === item.id);
    if (!p) return '';
    return `
      <div class="order-line">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <h5>${p.name}</h5>
          <div class="meta">Size ${item.size} · Qty ${item.qty}</div>
        </div>
        <div class="price">$${(p.price * item.qty).toFixed(0)}</div>
      </div>
    `;
  }).join('') || '<div style="padding:20px 0;color:var(--ink-dim);font-size:13px;">Your bag is empty.</div>';

  linesEl.innerHTML = lines;

  const subtotal = window.APEX.cartTotal();
  const shipping = subtotal === 0 ? 0 : (subtotal >= 100 ? 0 : 9.50);
  const total = subtotal + shipping;
  document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
  document.getElementById('total').textContent = '$' + total.toFixed(2);

  // Toggle card fields based on payment method
  const cardFields = document.getElementById('card-fields');
  document.querySelectorAll('input[name="pay"]').forEach(r => {
    r.addEventListener('change', () => {
      cardFields.style.display = r.value === 'card' && r.checked ? '' : 'none';
    });
  });

  // ============================================
  // Form submit — save order to database
  // ============================================
  document.getElementById('checkout-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let ok = true;
    required.forEach(f => {
      if (!f.value.trim()) { ok = false; f.style.borderColor = 'var(--danger)'; }
      else { f.style.borderColor = ''; }
    });
    if (!ok) { window.APEX.toast('Please complete required fields'); return; }
    if (cart.length === 0) { window.APEX.toast('Your bag is empty'); return; }

    // Build order items with product details
    const orderItems = cart.map(item => {
      const p = window.APEX.PRODUCTS.find(x => x.id === item.id);
      return {
        id: item.id,
        name: p ? p.name : 'Unknown',
        price: p ? p.price : 0,
        size: item.size,
        qty: item.qty
      };
    });

    const shippingName = form.fname.value + ' ' + form.lname.value;
    const shippingAddress = `${form.addr.value}, ${form.city.value}, ${form.zip.value}, ${form.country.value}`;

    // Send to backend
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          total: total,
          shippingName: shippingName,
          shippingAddress: shippingAddress
        })
      });

      const data = await res.json();
      if (!res.ok) {
        window.APEX.toast(data.error || 'Order failed');
        return;
      }

      // Success
      window.APEX.toast(`Order #${data.orderId} placed — welcome to the squad`);
      window.APEX.saveCart([]);
      setTimeout(() => location.href = 'orders.html', 1800);
    } catch (err) {
      console.error('Order submission failed:', err);
      window.APEX.toast('Something went wrong. Please try again.');
    }
  });
})();