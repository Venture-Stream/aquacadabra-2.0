document.getElementById('blog_tags').addEventListener('change', function() {
  if (this.value === '/blogs/news') return window.location.href = '/blogs/news';
  window.location.href = '/blogs/news/tagged/' + this.value;
});