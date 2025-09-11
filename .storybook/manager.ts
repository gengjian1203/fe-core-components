import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import packageJson from '../package.json';

const baseTheme = {
  brandTitle: `FE CosX UI v${packageJson.version}`,
  brandUrl: './',
  brandImage: './logo.svg',
  brandTarget: '_self',

  colorPrimary: '#3b82f6',
  colorSecondary: '#3b82f6',
};

const lightTheme = create({
  ...baseTheme,
  base: 'light',
});

const darkTheme = create({
  ...baseTheme,
  base: 'dark',
});

// 监听主题变化
addons.setConfig({
  theme: lightTheme,
});

// 动态切换主题
const channel = addons.getChannel();
channel.on('GLOBAL_CHANGED', data => {
  if (data?.globals?.theme) {
    const newTheme = data.globals.theme === 'dark' ? darkTheme : lightTheme;
    addons.setConfig({ theme: newTheme });
  }
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
