(() => {
  const init = () => {
    const container = document.querySelector('#rightside-config-show');
    if (!container || document.querySelector('#pure-background-btn')) return;

    const button = document.createElement('button');
    button.id = 'pure-background-btn';
    button.type = 'button';
    button.title = '纯背景模式';
    button.setAttribute('aria-label', '切换纯背景模式');
    button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    button.addEventListener('click', () => {
      const enabled = document.body.classList.toggle('pure-background-mode');
      button.title = enabled ? '恢复内容显示' : '纯背景模式';
      button.setAttribute('aria-label', button.title);
      button.innerHTML = enabled
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
    container.insertBefore(button, container.firstChild);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
