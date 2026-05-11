// index.js — Home page
(function() {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  // Render first 6 products into carousel
  track.innerHTML = window.APEX.PRODUCTS.slice(0, 6).map(window.APEX.productCardHTML).join('');
})();
