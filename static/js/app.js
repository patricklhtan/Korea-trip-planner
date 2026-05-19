// Korea trip planner — small client helpers

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
  tickCountdown();
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyToClipboard(btn));
  });
  const search = document.getElementById('phrase-search');
  if (search) search.addEventListener('input', () => filterPhrases(search));
});
