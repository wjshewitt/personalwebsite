async function loadBooks() {
  if (window.BOOKS && Array.isArray(window.BOOKS) && window.BOOKS.length) return window.BOOKS;
  try {
    const res = await fetch('./books-data.json');
    return await res.json();
  } catch (e) {
    return window.BOOKS || [];
  }
}

function slideEl(book) {
  const el = document.createElement('div');
  el.className = 'slide';
  el.tabIndex = 0;
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', `${book.title} by ${book.author}`);
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(book); } });
  el.addEventListener('dblclick', () => openDrawer(book));
  el.addEventListener('click', () => openDrawer(book));

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = book.src;
  img.alt = `${book.title} cover`;

  el.appendChild(img);
  return el;
}

function openDrawer(book) {
  const drawer = document.getElementById('drawer');
  const content = drawer.querySelector('.drawer-content');
  content.innerHTML = `<h2>${book.title}</h2><p>${book.author || ''} ${book.year ? '(' + book.year + ')' : ''}</p>`;
  drawer.hidden = false;
}

document.getElementById('closeDrawer')?.addEventListener('click', () => {
  document.getElementById('drawer').hidden = true;
});

(async function init() {
  const data = await loadBooks();
  const track = document.getElementById('track');
  data.forEach(b => track.appendChild(slideEl(b)));
})();
