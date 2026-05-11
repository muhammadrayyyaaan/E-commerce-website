// contact.js
(function() {
  // Reveal email/phone on click (anti-scrape — never in plain HTML source)
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.addEventListener('click', e => {
      e.preventDefault();
      const addr = `${emailLink.dataset.user}@${emailLink.dataset.domain}`;
      emailLink.textContent = addr;
      emailLink.href = `mailto:${addr}`;
    });
  }
  const phoneLink = document.getElementById('phone-link');
  if (phoneLink) {
    phoneLink.addEventListener('click', e => {
      e.preventDefault();
      const num = `${phoneLink.dataset.prefix} ${phoneLink.dataset.num}`;
      phoneLink.textContent = num;
      phoneLink.href = `tel:${num.replace(/\s/g, '')}`;
    });
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(f => {
        if (!f.value.trim()) { ok = false; f.style.borderColor = 'var(--danger)'; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) { window.APEX.toast('Please fill required fields'); return; }
      // Basic email shape check
      const email = form.querySelector('#cemail').value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        window.APEX.toast('Enter a valid email'); return;
      }
      window.APEX.toast('Message sent — we\'ll be in touch');
      form.reset();
    });
  }
})();
