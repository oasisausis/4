(() => {
  const data = Array.isArray(window.IITB_RESOURCES) ? window.IITB_RESOURCES : [];
  const grid = document.querySelector('#resource-grid');
  const search = document.querySelector('#resource-search');
  const filters = [...document.querySelectorAll('[data-resource-filter]')];
  const frame = document.querySelector('#resource-frame');
  const title = document.querySelector('#resource-preview-title');
  const open = document.querySelector('#resource-open');
  const download = document.querySelector('#resource-download');
  const previewType = document.querySelector('#resource-preview-type');
  const empty = document.querySelector('#resource-empty');
  let activeFilter = 'All';

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  }

  function card(resource, index) {
    const isVideo = resource.type === 'video';
    const previewLabel = isVideo ? 'Play' : 'Preview';
    const openLabel = isVideo ? 'Watch video ↗' : 'Open PDF ↗';
    const imageAlt = isVideo ? `Video poster for ${resource.title}` : `First page of ${resource.title}`;
    return `<article class="resource-card resource-${escapeHtml(resource.accent)} ${isVideo ? 'resource-video' : 'resource-pdf'}" data-category="${escapeHtml(resource.category)}" data-search="${escapeHtml((resource.title+' '+resource.category+' '+resource.description+' '+(resource.type || 'pdf')).toLowerCase())}">
      <button class="resource-preview-button" type="button" data-resource-index="${index}" aria-label="${previewLabel} ${escapeHtml(resource.title)}">
        <img src="${escapeHtml(resource.thumbnail)}" alt="${escapeHtml(imageAlt)}" loading="lazy">
        ${isVideo ? '<span class="resource-video-play" aria-hidden="true">▶</span>' : ''}
        <span class="resource-card-icon" aria-hidden="true">${escapeHtml(resource.icon)}</span>
      </button>
      <div class="resource-card-body">
        <div class="resource-card-meta"><span>${escapeHtml(resource.category)}</span><small>${escapeHtml(resource.meta)}</small></div>
        <h2>${escapeHtml(resource.title)}</h2>
        <p>${escapeHtml(resource.description)}</p>
        <div class="resource-card-actions">
          <button type="button" class="btn btn-primary resource-inline-preview" data-resource-index="${index}">${previewLabel}</button>
          <a class="btn btn-secondary" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener">${openLabel}</a>
        </div>
      </div>
    </article>`;
  }

  function render() {
    if (!grid) return;
    grid.innerHTML = data.map(card).join('');
    grid.querySelectorAll('[data-resource-index]').forEach(control => {
      control.addEventListener('click', () => select(Number(control.dataset.resourceIndex)));
    });
    applyFilter();
  }

  function select(index) {
    const resource = data[index];
    if (!resource || !frame) return;
    const isVideo = resource.type === 'video';
    frame.src = isVideo ? (resource.embed || resource.url) : `${resource.url}#view=FitH`;
    frame.title = resource.title;
    title.textContent = resource.title;
    if (previewType) previewType.textContent = isVideo ? 'Video preview' : 'PDF preview';
    open.href = resource.url;
    open.textContent = isVideo ? 'Watch on Drive ↗' : 'Open ↗';
    download.hidden = isVideo;
    if (!isVideo) download.href = resource.url;
    document.querySelectorAll('.resource-card').forEach((item, i) => item.classList.toggle('selected', i === index));
    if (window.innerWidth < 980) document.querySelector('.resource-preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function applyFilter() {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll('.resource-card').forEach(card => {
      const categoryMatch = activeFilter === 'All' || card.dataset.category === activeFilter;
      const queryMatch = !query || card.dataset.search.includes(query);
      card.hidden = !(categoryMatch && queryMatch);
      if (!card.hidden) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.resourceFilter;
    filters.forEach(item => item.classList.toggle('active', item === button));
    applyFilter();
  }));
  search?.addEventListener('input', applyFilter);

  render();
  if (data.length) select(0);
})();
