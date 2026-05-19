// Korea trip planner — small client helpers

function initPasswordGate() {
  const cfg = window.KOREA_TRIP_GATE;
  const gate = document.getElementById('password-gate');
  const shell = document.getElementById('site-shell');
  if (!cfg || !gate || !shell) return true;
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const error = document.getElementById('password-error');
  const unlock = () => {
    try { localStorage.setItem(cfg.storageKey, 'ok'); } catch {}
    gate.classList.add('gate-hidden');
    shell.classList.remove('gate-hidden');
  };
  try {
    if (localStorage.getItem(cfg.storageKey) === 'ok') {
      unlock();
      return true;
    }
  } catch {}
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input?.value || '';
    if (value === cfg.password) {
      if (error) error.textContent = '';
      unlock();
    } else if (error) {
      error.textContent = 'Incorrect password';
    }
  });
  setTimeout(() => input?.focus(), 50);
  return false;
}

function tickCountdown() {
  const root = document.getElementById('countdown');
  if (!root) return;
  const target = new Date(root.dataset.target);
  function update() {
    const now = new Date();
    let secs = Math.max(0, Math.floor((target - now) / 1000));
    const days = Math.floor(secs / 86400); secs -= days * 86400;
    const hrs = Math.floor(secs / 3600); secs -= hrs * 3600;
    const mins = Math.floor(secs / 60);
    const sec = secs - mins * 60;
    setText(root, 'days', String(days).padStart(2, '0'));
    setText(root, 'hours', String(hrs).padStart(2, '0'));
    setText(root, 'minutes', String(mins).padStart(2, '0'));
    setText(root, 'seconds', String(sec).padStart(2, '0'));
  }
  function setText(scope, key, val) {
    const el = scope.querySelector(`[data-cd="${key}"]`);
    if (el) el.textContent = val;
  }
  update();
  setInterval(update, 1000);
}

function copyToClipboard(btn) {
  const target = document.querySelector(btn.dataset.copy);
  if (!target) return;
  navigator.clipboard.writeText(target.textContent.trim()).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span>';
    setTimeout(() => { btn.innerHTML = original; }, 1200);
  });
}

function filterPhrases(input) {
  const q = input.value.toLowerCase().trim();
  document.querySelectorAll('[data-phrase]').forEach(row => {
    const txt = row.dataset.phrase.toLowerCase();
    row.style.display = !q || txt.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('[data-category]').forEach(cat => {
    const visible = cat.querySelectorAll('[data-phrase]:not([style*="display: none"])').length;
    cat.style.display = visible ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const unlocked = initPasswordGate();
  if (!unlocked) return;
  tickCountdown();
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyToClipboard(btn));
  });
  const search = document.getElementById('phrase-search');
  if (search) search.addEventListener('input', () => filterPhrases(search));
});
