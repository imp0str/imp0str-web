const routes = window.IMP0STR_ROUTES || {};

document.querySelectorAll('[data-route]').forEach((link) => {
  const destination = routes[link.dataset.route];
  if (destination) link.href = destination;
});

document.getElementById('year').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-motion');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
