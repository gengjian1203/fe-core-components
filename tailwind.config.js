/** @type {import('tailwindcss').Config} */
export default {
  // 内容路径配置 - Tailwind会扫描这些文件来生成CSS
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],

  // 添加前缀，所有生成的CSS类都会有前缀，避免与宿主项目冲突
  prefix: '',

  darkMode: 'class', // 使用class策略，通过添加'dark'类来切换

  theme: {
    // 完全使用Tailwind默认配置，不添加任何自定义扩展
    // 避免生成额外的CSS和潜在的全局污染
  },

  plugins: [],
};
