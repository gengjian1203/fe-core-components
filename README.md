# @cosxai/fe-core-components

[![npm version](https://badge.fury.io/js/@cosxai/fe-core-components.svg)](https://badge.fury.io/js/@cosxai/fe-core-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[展示目录](https://cosxaiai.github.io/fe-core-components/)

## 1. 项目简介特性

现代化的 React 组件库，基于 **Ant Design 5.x** 和 **React 19** 构建，采用分层设计架构，提供高质量、可复用的企业级 UI 组件。

### 1.1 核心特性

- 🚀 **React 19 支持** - 支持最新 React 特性，包括 Server Components
- 🎨 **基于 Ant Design 5.x** - 扩展和包装 Ant Design 组件，提供定制化体验
- 💪 **严格 TypeScript** - 完整的类型支持，严格模式开发，零 any 类型
- 🎨 **Tailwind CSS** - 原子化 CSS，支持自定义主题和暗黑模式
- 📚 **Storybook 9.x** - 完整的组件文档和交互式开发环境
- 🏗️ **分层设计架构** - Base（基础组件）+ Case（复合组件）的可扩展架构
- ♿ **无障碍访问** - 完整的 A11y 支持，符合 WCAG 2.1 AA 标准
- 📦 **Tree Shaking** - 支持按需导入，优化包大小（ESM ≤50KB, CJS ≤55KB）
- 🧪 **完整测试** - Storybook 交互测试和可访问性测试
- 📖 **详细文档** - 完整的组件 API 文档和使用示例

### 1.2 架构设计

采用**修改版原子化设计**理念，将组件分为两个主要层级：

- **Base Components** (`src/components/Base/`) - 基础组件，扩展 Ant Design 组件功能
  - `CXButton` - 增强版按钮，支持 5 种变体、图标配置、加载状态
- **Case Components** (`src/components/Case/`) - 复合组件，适用于复杂业务场景
  - `CXCard` - 功能丰富的卡片组件，支持头像、标签、元数据、状态指示

### 1.3 技术栈

- **React** 19.x - 最新 React 特性支持
- **TypeScript** 5.x - 严格类型检查
- **Ant Design** 5.x - 基础组件库
- **Tailwind CSS** 3.x - 原子化 CSS 框架
- **Storybook** 9.x - 组件开发与文档
- **Rollup** - 模块打包工具
- **pnpm** - 高效包管理器

## 2. 用户安装使用

### 2.1 GitHub Package 安装配置

本项目发布到 GitHub Package Registry，需要先配置 npm 源：

```bash
vim ~/.npmrc

# 将以下行添加到你的 .npmrc 文件中
@cosxai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

vim ~/.bashrc

# 将以下行添加到你的 ~/.bashrc, ~/.zshrc 或 ~/.bash_profile 文件中
export GITHUB_TOKEN='ghp_yourActualTokenHere'

# 然后让配置生效
source ~/.bashrc  #（或其他对应的配置文件）

```

### 2.2 安装组件库

```bash
# 使用 pnpm（推荐）
pnpm add @cosxai/fe-core-components

# 或使用 npm
npm install @cosxai/fe-core-components

# 或使用 yarn
yarn add @cosxai/fe-core-components
```

### 2.3 安装对等依赖

```bash
# 安装必需的对等依赖（项目中如果已经存在则不用安装）
pnpm add react react-dom antd tailwindcss
```

### 2.4 快速集成

⚠️ **重要提醒**：为了确保组件样式正确显示，必须在应用入口文件中导入组件库的样式文件。

在应用入口文件中导入样式和兼容性补丁：

```tsx
// main.tsx 或 App.tsx
import '@cosxai/fe-core-components/styles'; // 导入样式文件（必须）
```

或者使用完整路径：

```tsx
// main.tsx 或 App.tsx
import '@cosxai/fe-core-components/dist/styles.css'; // 完整路径导入样式
```

如果忘记导入样式文件，组件会正常渲染但没有任何样式效果。

### 2.5 基础使用示例

```tsx
import { CXButton, CXCard } from '@cosxai/fe-core-components';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

function App() {
  return (
    <div className='p-6 space-y-4'>
      {/* 基础按钮组件 */}
      <div className='space-x-2'>
        <CXButton variant='primary' size='medium' leftIcon={<UserOutlined />}>
          主要按钮
        </CXButton>
        <CXButton variant='outline' size='medium'>
          次要按钮
        </CXButton>
        <CXButton variant='danger' loading>
          危险按钮
        </CXButton>
      </div>

      {/* 复合卡片组件 */}
      <CXCard
        title='项目概览'
        variant='shadow'
        status='success'
        headerIcon={<SettingOutlined />}
        avatar={{
          icon: <UserOutlined />,
          size: 'default',
        }}
        tags={[
          { text: '进行中', color: 'blue' },
          { text: '优先级高', color: 'red', variant: 'outlined' },
        ]}
        metadata={[
          { label: '创建时间', value: '2024-01-01' },
          { label: '负责人', value: '张三' },
        ]}
        footer={
          <div className='flex justify-end space-x-2'>
            <CXButton size='small' variant='ghost'>
              取消
            </CXButton>
            <CXButton size='small' variant='primary'>
              确认
            </CXButton>
          </div>
        }
        clickable
        onCardClick={() => console.log('Card clicked!')}
      >
        这是一个功能丰富的卡片组件，支持头像、标签、元数据等多种内容展示。
      </CXCard>
    </div>
  );
}
```

### 2.6 TypeScript 类型支持

组件库提供完整的 TypeScript 类型定义：

```tsx
import type { CXButtonProps, CXCardProps } from '@cosxai/fe-core-components';

// 完整的类型支持和智能提示
const MyButton: React.FC<CXButtonProps> = props => {
  return <CXButton {...props} />;
};
```

### 2.7 不同框架集成

#### 2.7.1 React + Vite 项目

```bash
# 安装依赖
pnpm add @cosxai/fe-core-components antd tailwindcss @ant-design/v5-patch-for-react-19

# 配置 vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['antd', '@ant-design/icons']
  }
});
```

在 `main.tsx` 中导入：

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cosxai/fe-core-components/styles'; // 导入样式文件（必须）
import '@cosxai/fe-core-components'; // 应用 React 19 兼容补丁
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 2.7.2 Next.js 项目

```bash
# 安装依赖
pnpm add @cosxai/fe-core-components antd tailwindcss @ant-design/v5-patch-for-react-19
```

在 `app/layout.tsx` 中：

```tsx
import '@cosxai/fe-core-components/styles'; // 导入样式文件（必须）
import '@cosxai/fe-core-components';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh'>
      <body>{children}</body>
    </html>
  );
}
```

## 3. 开发者指南

如果您是开发者，需要了解本地开发、构建、测试和部署等详细信息，请查看：

📖 **[开发者指南 - README_DEVELOP.md](./README_DEVELOP.md)**

开发者指南包含：

- 本地开发环境搭建
- 项目结构说明
- 开发命令和工具
- 本地 Link 调试方法
- GitHub Actions 部署流程
- 版本发布策略

---

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE) 开源。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 🙏 致谢

- [React](https://reactjs.org/) - UI 库
- [Ant Design](https://ant.design/) - 基础组件库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Storybook](https://storybook.js.org/) - 组件开发工具
