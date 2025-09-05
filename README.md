# fe-core-components

[![npm version](https://badge.fury.io/js/fe-core-components.svg)](https://badge.fury.io/js/fe-core-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

现代化的 React 组件库，基于 React 19、TypeScript、Tailwind CSS 构建，提供高质量、可复用的 UI 组件。

## ✨ 特性

- 🚀 **React 19** - 支持最新 React 特性，包括 Server Components
- 💪 **TypeScript** - 完整的类型支持，严格模式开发
- 🎨 **Tailwind CSS** - 原子化 CSS，支持自定义主题和暗黑模式
- 📚 **Storybook v7+** - 完整的组件文档和交互式开发环境
- 🏗️ **原子设计** - 基于 Atoms/Molecules/Organisms 的组件架构
- ♿ **无障碍访问** - 完整的 A11y 支持，符合 WCAG 2.1 标准
- 📦 **Tree Shaking** - 支持按需导入，优化包大小
- 🌈 **主题定制** - 基于 CSS 变量的灵活主题系统
- 🧪 **完整测试** - Jest + React Testing Library，高覆盖率
- 📖 **详细文档** - 完整的开发指南和组件文档

## 📦 安装

```bash
npm install fe-core-components
# 或
yarn add fe-core-components
# 或
pnpm add fe-core-components
```

### 同时安装同伴依赖

```bash
npm install react react-dom
```

## 🚀 快速开始

### 1. 导入样式

在您的应用入口文件中导入组件库样式：

```tsx
// main.tsx 或 App.tsx
import 'fe-core-components/dist/styles.css';
```

### 2. 使用组件

```tsx
import { Button, Card } from 'fe-core-components';

function App() {
  return (
    <div className='p-6'>
      <Card
        title='欢迎使用'
        description='fe-core-components 组件库'
        primaryAction={{
          label: '开始使用',
          onClick: () => console.log('开始使用'),
        }}
      >
        这是一个现代化的 React 组件库，提供了丰富的 UI 组件。
      </Card>

      <div className='mt-4 space-x-2'>
        <Button variant='primary' size='md'>
          主要按钮
        </Button>
        <Button variant='outline' size='md'>
          次要按钮
        </Button>
      </div>
    </div>
  );
}
```

### 3. 配置主题（可选）

如果您需要自定义主题，可以覆盖 CSS 变量：

```css
/* 自定义主题 */
:root {
  --color-primary-500: 34 197 94; /* 自定义主色 */
  --color-primary-600: 22 163 74;
}

.dark {
  --color-primary-500: 74 222 128; /* 暗色模式下的主色 */
  --color-primary-600: 34 197 94;
}
```

## 📖 组件文档

访问我们的 [Storybook 文档](https://your-storybook-url.com) 查看所有组件的详细文档和交互示例。

或者在本地运行 Storybook：

```bash
git clone https://github.com/your-org/fe-core-components.git
cd fe-core-components
npm install
npm run dev
```

## 🧩 可用组件

### Atoms（原子组件）

- `Button` - 按钮组件，支持多种变体和状态
- `Input` - 输入框组件（开发中）
- `Icon` - 图标组件（开发中）

### Molecules（分子组件）

- `Card` - 卡片组件，支持标题、描述、操作按钮
- `Modal` - 模态框组件（开发中）
- `Toast` - 通知组件（开发中）

### Organisms（组织体组件）

- `Header` - 页面头部组件（计划中）
- `Sidebar` - 侧边栏组件（计划中）

## 🎨 主题系统

### 暗黑模式

组件库内置了暗黑模式支持，可以通过添加 `dark` 类来启用：

```tsx
// 全局启用暗黑模式
document.documentElement.classList.add('dark');

// 或在特定容器中启用
<div className='dark'>
  <Button>暗色模式下的按钮</Button>
</div>;
```

### 自定义主题

基于 CSS 变量的主题系统，支持灵活的自定义：

```css
:root {
  /* 主色系 */
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-900: 30 58 138;

  /* 中性色系 */
  --color-neutral-50: 250 250 250;
  --color-neutral-500: 115 115 115;
  --color-neutral-900: 23 23 23;

  /* 功能色系 */
  --color-success-500: 34 197 94;
  --color-warning-500: 245 158 11;
  --color-error-500: 239 68 68;
}
```

## 🔧 API 参考

### Button 组件

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  shape?: 'rectangle' | 'square' | 'circle';
  shadow?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent) => void;
}
```

### Card 组件

```tsx
interface CardProps {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  clickable?: boolean;
  coverImage?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}
```

## 📱 响应式设计

所有组件都支持响应式设计，并提供了预定义的断点：

```tsx
// 响应式尺寸
<Button size={{ base: 'sm', md: 'md', lg: 'lg' }}>
  响应式按钮
</Button>

// 响应式显示/隐藏
<div className="hidden md:block">
  桌面端显示的内容
</div>
```

## ♿ 无障碍访问

所有组件都内置了无障碍访问支持：

- **键盘导航** - 支持 Tab、Enter、Space、Arrow 键等
- **屏幕阅读器** - 提供合适的 ARIA 标签和描述
- **焦点管理** - 清晰的焦点指示和合理的焦点顺序
- **颜色对比** - 符合 WCAG 2.1 AA 标准的颜色对比度

```tsx
<Button aria-label='关闭对话框' aria-describedby='dialog-description' onClick={closeDialog}>
  <CloseIcon aria-hidden='true' />
</Button>
```

## 🧪 开发

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-org/fe-core-components.git
cd fe-core-components

# 安装依赖
npm install

# 启动 Storybook
npm run dev

# 运行测试
npm test

# 构建组件库
npm run build
```

### 开发工作流

1. 创建新组件
2. 编写测试用例
3. 编写 Storybook 故事
4. 更新文档
5. 提交代码

详细的开发指南请参考 [开发文档](./docs/development-guide.md)。

## 📊 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 提交问题

如果您发现了 bug 或有功能建议，请 [创建 issue](https://github.com/your-org/fe-core-components/issues)。

### 提交代码

1. Fork 此仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE)。

## 🙏 致谢

- [React](https://reactjs.org/) - UI 库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Storybook](https://storybook.js.org/) - 组件开发工具
- [Jest](https://jestjs.io/) - 测试框架
- [React Testing Library](https://testing-library.com/react) - 测试工具

## 📈 版本历史

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的版本更新记录。

## 📞 支持

- 📧 Email: support@yourcompany.com
- 💬 Discord: [加入我们的 Discord](https://discord.gg/your-server)
- 📖 文档: [完整文档](https://your-docs-site.com)
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-org/fe-core-components/issues)
