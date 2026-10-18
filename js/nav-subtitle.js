(() => {
  // 副标题由 _config.butterfly.yml 的 inject.bottom 里 data-text 传入，
  // 运行时插到导航栏 #blog-info 里，紧跟站点标题。
  const self = document.currentScript;
  const text = (self && self.dataset && self.dataset.text ? self.dataset.text : '').trim();
  if (!text) return;

  const render = () => {
    const blogInfo = document.getElementById('blog-info');
    if (!blogInfo) return;

    const existing = blogInfo.querySelector('.nav-subtitle');
    if (existing) {
      if (existing.textContent !== text) existing.textContent = text;
      return;
    }

    const subtitle = document.createElement('span');
    subtitle.className = 'nav-subtitle';
    subtitle.textContent = text;
    blogInfo.appendChild(subtitle);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render, { once: true });
  } else {
    render();
  }

  // 兼容 pjax（当前主题配置未开启，保留以防以后打开）
  document.addEventListener('pjax:complete', render);
})();
