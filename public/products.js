// products.js — Shop listing with filters
(function() {
  const grid = document.getElementById('grid');
  const countEl = document.getElementById('count');
  const sortSel = document.getElementById('sort');
  const clearBtn = document.getElementById('clear-filters');
  if (!grid) return;

  // URL param prefilter
  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat');
  if (initialCat) {
    const box = document.querySelector(`input[name="category"][value="${initialCat}"]`);
    if (box) box.checked = true;
  }

  function getFilters() {
    const cats = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(i => i.value);
    const sizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(i => i.value);
    const min = parseFloat(document.getElementById('price-min').value) || 0;
    const max = parseFloat(document.getElementById('price-max').value) || Infinity;
    return { cats, sizes, min, max };
  }

  function render() {
    const { cats, sizes, min, max } = getFilters();
    let list = window.APEX.PRODUCTS.filter(p => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (p.price < min || p.price > max) return false;
      if (sizes.length && !sizes.some(s => p.sizes.includes(s))) return false;
      return true;
    });

    const sort = sortSel.value;
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    else if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

    countEl.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
    grid.innerHTML = list.length
      ? list.map(window.APEX.productCardHTML).join('')
      : '<div style="padding:60px 0;color:var(--ink-dim);grid-column:1/-1;text-align:center;">No products match your filters.</div>';
  }

  // Bind
  document.querySelectorAll('.filters input').forEach(i => i.addEventListener('change', render));
  sortSel.addEventListener('change', render);
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.filters input').forEach(i => {
      if (i.type === 'checkbox') i.checked = false;
      else i.value = '';
    });
    render();
  });

  render();
})();
