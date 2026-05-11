document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const errorEl = document.getElementById('register-error');
  errorEl.style.display = 'none';

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      })
    });

    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || 'Sign up failed';
      errorEl.style.display = 'block';
      return;
    }

    // Success — redirect to home
    window.location.href = 'index.html';
  } catch (err) {
    errorEl.textContent = 'Something went wrong. Please try again.';
    errorEl.style.display = 'block';
  }
});