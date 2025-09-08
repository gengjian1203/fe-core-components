import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import packageJson from '../package.json';

const theme = create({
  base: 'light',
  brandTitle: `FE CosX UI v${packageJson.version}`,
  brandUrl: './',
  brandImage: './logo.svg',
  brandTarget: '_self',

  // 确保标题显示的额外配置
  colorPrimary: '#1976d2',
  colorSecondary: '#1976d2',
});

addons.setConfig({
  theme,
});

// 确保favicon始终是我们的logo
// document.addEventListener('DOMContentLoaded', () => {
//   const setFavicon = () => {
//     // 移除所有现有的favicon
//     const existingIcons = document.querySelectorAll('link[rel*="icon"]');
//     existingIcons.forEach(icon => icon.remove());

//     // 添加我们的favicon
//     const favicon = document.createElement('link');
//     favicon.rel = 'icon';
//     favicon.type = 'image/svg+xml';
//     favicon.href = './logo.svg';
//     document.head.appendChild(favicon);

//     const shortcutIcon = document.createElement('link');
//     shortcutIcon.rel = 'shortcut icon';
//     shortcutIcon.type = 'image/svg+xml';
//     shortcutIcon.href = './logo.svg';
//     document.head.appendChild(shortcutIcon);
//   };

//   setFavicon();

//   // 监听路由变化
//   const observer = new MutationObserver(setFavicon);
//   observer.observe(document.head, { childList: true, subtree: true });
// });
