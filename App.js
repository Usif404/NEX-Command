// ========== المتغيرات العامة ==========
const grid = document.getElementById('commandsGrid');
const searchInput = document.getElementById('searchInput');
const systemFilter = document.getElementById('systemFilter');
const categoryFilter = document.getElementById('categoryFilter');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

// ========== عرض البطاقات ==========
function renderCards(commands) {
  grid.innerHTML = '';
  if (commands.length === 0) {
    grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#555;">لا توجد نتائج.</p>';
    return;
  }
  commands.forEach(cmd => {
    const card = document.createElement('div');
    card.className = 'command-card';
    card.onclick = () => openModal(cmd);
    card.innerHTML = `
      <button class="copy-btn" onclick="event.stopPropagation(); copyToClipboard('${cmd.command}')">📋 نسخ</button>
      <span class="system-badge">${cmd.system}</span>
      <span class="danger-badge danger-${cmd.dangerLevel}">${cmd.dangerLevel}</span>
      <h3>${cmd.command}</h3>
      <p class="desc">${cmd.descriptionAr}</p>
    `;
    grid.appendChild(card);
  });
}

// ========== تصفية وبحث ==========
function filterCommands() {
  const searchText = searchInput.value.toLowerCase();
  const sys = systemFilter.value;
  const cat = categoryFilter.value;
  
  const filtered = commandsDB.filter(cmd => {
    const matchSearch = searchText === '' ||
      cmd.command.toLowerCase().includes(searchText) ||
      cmd.descriptionAr.includes(searchText) ||
      cmd.descriptionEn.toLowerCase().includes(searchText);
    const matchSystem = sys === 'all' || cmd.system === sys;
    const matchCategory = cat === 'all' || cmd.category === cat;
    return matchSearch && matchSystem && matchCategory;
  });
  
  renderCards(filtered);
}

searchInput.addEventListener('input', filterCommands);
systemFilter.addEventListener('change', filterCommands);
categoryFilter.addEventListener('change', filterCommands);

// ========== فتح النافذة المنبثقة ==========
function openModal(cmd) {
  modalBody.innerHTML = `
    <h2>${cmd.command}</h2>
    <span class="system-badge">${cmd.system}</span>
    <span class="danger-badge danger-${cmd.dangerLevel}">${cmd.dangerLevel}</span>
    <p><strong>🔍 الصيغة:</strong></p>
    <div class="syntax">${cmd.syntax}</div>
    <p><strong>📖 الشرح:</strong> ${cmd.descriptionAr}</p>
    <p><em>${cmd.descriptionEn}</em></p>
    <p><strong>💡 أمثلة:</strong></p>
    <ul>${cmd.examplesAr.map(e => `<li>${e}</li>`).join('')}</ul>
    <p><strong>🔄 الأوامر المقابلة:</strong></p>
    <div class="cross-ref">
      ${Object.entries(cmd.crossRef).map(([sys, com]) => `<span><strong>${sys}:</strong> ${com}</span>`).join('')}
    </div>
    <button class="close-btn" onclick="closeModal()">إغلاق ✕</button>
  `;
  modalOverlay.classList.add('active');
}

// ========== إغلاق النافذة ==========
function closeModal() {
  modalOverlay.classList.remove('active');
}
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ========== نسخ النص ==========
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#00e676; color:#000; padding:10px 20px; border-radius:8px; z-index:9999; font-weight:bold;';
    toast.textContent = '✅ تم النسخ!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1500);
  });
}

// ========== اختصارات لوحة المفاتيح ==========
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ========== تحميل أولي ==========
renderCards(commandsDB);