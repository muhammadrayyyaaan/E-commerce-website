(async function() {
  const container = document.getElementById('orders-container');
  if (!container) return;

  // Check login
  const authRes = await fetch('/api/me');
  const authData = await authRes.json();
  if (!authData.loggedIn) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <p style="font-size: 18px; margin-bottom: 20px;">Please log in to see your orders.</p>
        <a href="login.html" class="btn btn-accent btn-arrow">Log in</a>
      </div>
    `;
    return;
  }

  // Fetch orders
  const res = await fetch('/api/orders');
  const orders = await res.json();

  if (!orders.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <p style="font-size: 18px; margin-bottom: 20px; opacity: 0.7;">You haven't placed any orders yet.</p>
        <a href="products.html" class="btn btn-accent btn-arrow">Start shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const date = new Date(order.created_at + 'Z').toLocaleString();
    const itemsHtml = order.items.map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--line);">
        <div style="flex: 1;">
          <h5 style="margin: 0 0 4px 0;">${item.name}</h5>
          <div class="meta" style="font-size: 13px; opacity: 0.6;">Size ${item.size} · Qty ${item.qty}</div>
        </div>
        <div class="price" style="font-weight: 600;">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `).join('');

    return `
      <div style="border: 1px solid var(--line); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--line);">
          <div>
            <h3 style="margin: 0;">Order #${order.id}</h3>
            <div style="font-size: 13px; opacity: 0.6; margin-top: 4px;">${date}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; opacity: 0.6;">Status</div>
            <div style="font-weight: 600; text-transform: uppercase; font-size: 13px;">${order.status}</div>
          </div>
        </div>

        <div>${itemsHtml}</div>

        <div style="display: flex; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--line); font-weight: 700; font-size: 18px;">
          <span>Total</span>
          <span>$${order.total.toFixed(2)}</span>
        </div>

        ${order.shipping_address ? `
          <div style="margin-top: 16px; font-size: 13px; opacity: 0.7;">
            <strong>Ship to:</strong> ${order.shipping_name} — ${order.shipping_address}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
})();