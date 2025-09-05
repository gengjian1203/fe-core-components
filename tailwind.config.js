/** @type {import('tailwindcss').Config} */
export default {
  // 内容路径配置 - Tailwind会扫描这些文件来生成CSS
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}'
  ],
  
  // 暗黑模式配置
  darkMode: 'class', // 使用class策略，通过添加'dark'类来切换
  
  theme: {
    extend: {
    }
  },
  
  plugins: [
    
  ]
};