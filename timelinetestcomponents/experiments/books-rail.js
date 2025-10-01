async function loadBooks() {
  if (window.BOOKS && Array.isArray(window.BOOKS) && window.BOOKS.length) return window.BOOKS;
  try {
    const res = await fetch('./books-data.json');
    return await res.json();
  } catch (e) {
    return window.BOOKS || [];
  }
}

function bookMarker(book) {
  const el = document.createElement('div');
  el.className = 'book';
  el.setAttribute('role', 'listitem');

  const cover = document.createElement('div');
  cover.className = 'cover';
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = book.src;
  img.alt = `${book.title} cover`;
  cover.appendChild(img);

  const year = document.createElement('div');
  year.className = 'year';
  year.textContent = `${book.year || ''}`;

  el.appendChild(cover);
  el.appendChild(year);
  return el;
}

(async function init() {
  const data = await loadBooks();
  const rail = document.getElementById('rail');
  const sorted = data.slice().sort((a,b) => (a.year||0) - (b.year||0));
  sorted.forEach(b => rail.appendChild(bookMarker(b)));
})();
