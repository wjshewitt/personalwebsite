async function loadBooks() {
  if (window.BOOKS && Array.isArray(window.BOOKS) && window.BOOKS.length) return window.BOOKS;
  try {
    const res = await fetch('./books-data.json');
    return await res.json();
  } catch (e) {
    return window.BOOKS || [];
  }
}

function bookFigure(book) {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 'book';
  a.setAttribute('role', 'listitem');
  a.setAttribute('aria-label', `${book.title} by ${book.author}`);
  a.addEventListener('click', (e) => { e.preventDefault(); openDrawer(book); });
  a.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(book); } });

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = book.src;
  img.alt = `${book.title} cover`;

  const cap = document.createElement('figcaption');
  cap.textContent = book.title;

  const fig = document.createElement('figure');
  fig.appendChild(img);
  fig.appendChild(cap);
  a.appendChild(fig);
  return a;
}

function openDrawer(book) {
  const drawer = document.getElementById('drawer');
  const content = drawer.querySelector('.drawer-content');
  content.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'meta';

  const img = document.createElement('img');
  img.src = book.src;
  img.alt = `${book.title} cover large`;

  const info = document.createElement('div');
  info.innerHTML = `<h2>${book.title}</h2><p>${book.author || ''} ${book.year ? '(' + book.year + ')' : ''}</p>`;

  wrap.appendChild(img);
  wrap.appendChild(info);
  content.appendChild(wrap);

  drawer.hidden = false;
}

function closeDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.hidden = true;
}

document.getElementById('closeDrawer')?.addEventListener('click', closeDrawer);

(async function init() {
  const data = await loadBooks();
  const shelf = document.getElementById('shelf');
  data.forEach(b => shelf.appendChild(bookFigure(b)));
})();
