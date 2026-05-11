(async function() {
  const container = document.getElementById('admin-container');
  const statsEl = document.getElementById('admin-stats');
  if (!container) return;

  // Check login + admin
  const authRes = await fetch('/api/me');
  const authData = await authRes.json();
  if (!authData.loggedIn) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <p style="font-size: 18px; margin-bottom: 20px;">Please log in.</p>
        <a href="login.html" class="btn btn-accent btn-arrow">Log in</a>
      </div>
    `;
    return;
  }
  if (!authData.user.isAdmin) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <p style="font-size: 18px; opacity: 0.7;">Access denied. Admin only.</p>
      </div>
    `;
    return;
  }

  // Fetch all orders
  const res = await fetch('/api/admin/orders');
  const orders = await res.json();

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomers = new Set(orders.map(o => o.user_id)).size;
  statsEl.innerHTML = `
    <div style="flex: 1; min-width: 180px; border: 1px solid var(--line); border-radius: 12px; padding: 20px;">
      <div style="font-size: 13px; opacity: 0.6;">Total Orders</div>
      <div style="font-size: 32px; font-weight: 700; margin-top: 4px;">${orders.length}</div>
    </div>
    <div style="flex: 1; min-width: 180px; border: 1px solid var(--line); border-radius: 12px; padding: 20px;">
      <div style="font-size: 13px; opacity: 0.6;">Revenue</div>
      <div style="font-size: 32px; font-weight: 700; margin-top: 4px;">$${totalRevenue.toFixed(2)}</div>
    </div>
    <div style="flex: 1; min-width: 180px; border: 1px solid var(--line); border-radius: 12px; padding: 20px;">
      <div style="font-size: 13px; opacity: 0.6;">Customers</div>
      <div style="font-size: 32px; font-weight: 700; margin-top: 4px;">${uniqueCustomers}</div>
    </div>
  `;

  if (!orders.length) {
    container.innerHTML = `<p style="opacity: 0.6; text-align: center; padding: 40px 0;">No orders yet.</p>`;
    return;
  }

  container.innerHTML = orders.map(order => {
    const date = new Date(order.created_at + 'Z').toLocaleString();
    const itemsHtml = order.items.map(item => `
      <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px;">
        <span>${item.name} — Size ${item.size} × ${item.qty}</span>
        <span style="font-weight: 600;">$${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('');

    return `
      <div style="border: 1px solid var(--line); border-radius: 12px; padding: 24px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--line);">
          <div>
            <h3 style="margin: 0;">Order #${order.id}</h3>
            <div style="font-size: 13px; opacity: 0.6; margin-top: 4px;">${date}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; opacity: 0.6;">Customer</div>
            <div style="font-weight: 600; font-size: 14px;">${order.customer_name}</div>
            <div style="font-size: 12px; opacity: 0.6;">${order.email}</div>
          </div>
        </div>

        <div>${itemsHtml}</div>

        <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line); font-weight: 700;">
          <span>Total</span>
          <span>$${order.total.toFixed(2)}</span>
        </div>

        <div style="margin-top: 12px; font-size: 13px; opacity: 0.7;">
          <strong>Ship to:</strong> ${order.shipping_name} — ${order.shipping_address}
        </div>
      </div>
    `;
  }).join('');
})();