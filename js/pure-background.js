(() => {
  // 纯背景模式：隐藏除壁纸外的一切（导航、内容、页脚、侧栏），
  // 只保留一个变淡的开关按钮，另外按 Esc 也能退出。
  const CLASS = 'pure-background-mode';
  let keydownBound = false;

  const sync = button => {
    if (!button) return;
    const enabled = document.body.classList.contains(CLASS);
    button.title = enabled ? '恢复内容显示（Esc）' : '纯背景模式';
    button.setAttribute('aria-label', button.title);
    button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    button.innerHTML = enabled
      ? '<i class="fas fa-eye"></i>'
      : '<i class="fas fa-eye-slash"></i>';
  };

  const setMode = (enabled, button) => {
    document.body.classList.toggle(CLASS, enabled);
    sync(button);
  };

  const init = () => {
    const container = document.querySelector('#rightside-config-show');
    if (!container) return;

    let button = document.getElementById('pure-background-btn');

    if (!button) {
      button = document.createElement('button');
      button.id = 'pure-background-btn';
      button.type = 'button';
      button.addEventListener('click', () => {
        setMode(!document.body.classList.contains(CLASS), button);
      });
      container.insertBefore(button, container.firstChild);
    }

    sync(button);

    if (!keydownBound) {
      keydownBound = true;
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains(CLASS)) {
          setMode(false, document.getElementById('pure-background-btn'));
        }
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  document.addEventListener('pjax:complete', init);
})();
