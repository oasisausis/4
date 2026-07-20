
const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

const syncNav = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
syncNav();
window.addEventListener('scroll', syncNav, { passive: true });

menu?.addEventListener('click', () => {
  const open = links?.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(Boolean(open)));
});

links?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    links.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(node => observer.observe(node));

document.querySelectorAll('[data-tabs]').forEach(group => {
  const buttons = [...group.querySelectorAll('[data-tab]')];
  const targetSelector = group.dataset.tabs;
  const panels = [...document.querySelectorAll(targetSelector)];

  function activate(id, updateHash = true) {
    buttons.forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
    if (updateHash) history.replaceState(null, '', `#${id}`);
  }

  buttons.forEach(button => button.addEventListener('click', () => activate(button.dataset.tab)));
  const requested = location.hash.slice(1);
  const initial = panels.some(panel => panel.id === requested) ? requested : buttons[0]?.dataset.tab;
  if (initial) activate(initial, false);
});

// Homepage formula ticker and subtle card tilt.
const formulaTicker = document.querySelector('#formula-ticker');
if (formulaTicker) {
  const formulas = [
    'Δstress ∝ 1 / information',
    'CPI = Σ(credits × grade points) / Σcredits',
    'coffee + curiosity → survivable mornings',
    'Δx · Δp ≥ ħ / 2',
    'good seniors > random internet advice'
  ];
  let formulaIndex = 0;
  window.setInterval(() => {
    formulaIndex = (formulaIndex + 1) % formulas.length;
    formulaTicker.animate(
      [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }],
      { duration: 180, fill: 'forwards' }
    ).finished.then(() => {
      formulaTicker.textContent = formulas[formulaIndex];
      formulaTicker.animate(
        [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 220, fill: 'forwards' }
      );
    });
  }, 3200);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 2.6).toFixed(2)}deg) rotateY(${(x * 3.4).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
