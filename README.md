# fe-cosx-ui

[![npm version](https://badge.fury.io/js/fe-cosx-ui.svg)](https://badge.fury.io/js/fe-cosx-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

现代化的 React 组件库，基于 **Ant Design 5.x** 和 **React 19** 构建，提供高质量、可复用的企业级 UI 组件。

## ✨ 特性

- 🚀 **React 19** - 支持最新 React 特性，包括 Server Components
- 🎨 **基于 Ant Design 5.x** - 扩展和包装 Ant Design 组件，提供定制化体验
- 💪 **TypeScript** - 完整的类型支持，严格模式开发
- 🎨 **Tailwind CSS** - 原子化 CSS，支持自定义主题和暗黑模式
- 📚 **Storybook 9.x** - 完整的组件文档和交互式开发环境
- 🏗️ **分层设计** - Base（基础组件）+ Case（复合组件）架构
- ♿ **无障碍访问** - 完整的 A11y 支持，符合 WCAG 2.1 标准
- 📦 **Tree Shaking** - 支持按需导入，优化包大小
- 🧪 **Storybook 测试** - 完整的交互测试和可访问性测试
- 📖 **详细文档** - 完整的开发指南和组件文档

## 📦 安装

```bash
# 使用 pnpm (推荐)
pnpm add fe-cosx-ui

# 或使用 npm
npm install fe-cosx-ui

# 或使用 yarn
yarn add fe-cosx-ui
```

### 安装对等依赖

本组件库基于 Ant Design，需要安装以下对等依赖：

```bash
pnpm add react react-dom antd @ant-design/v5-patch-for-react-19 @ant-design/icons
```

## 🚀 快速开始

### 1. 导入样式和兼容性补丁

在您的应用入口文件中导入组件库：

```tsx
// main.tsx 或 App.tsx
import 'fe-cosx-ui/dist/styles.css';
import 'fe-cosx-ui'; // 自动应用 React 19 兼容性补丁
```

### 2. 使用组件

```tsx
import { CXButton, CXCard } from 'fe-cosx-ui';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

function App() {
  return (
    <div className='p-6 space-y-4'>
      {/* 基础按钮使用 */}
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

      {/* 卡片组件使用 */}
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

## 🧩 可用组件

### Base Components（基础组件）

基于 Ant Design 组件封装的基础组件：

#### CXButton

- **功能**: 扩展 Ant Design Button，支持更多变体和图标配置
- **特性**: 5种变体、加载状态、左右图标、自定义样式
- **变体**: `primary` | `secondary` | `outline` | `ghost` | `danger`
- **尺寸**: `small` | `medium` | `large`

### Case Components（复合组件）

更复杂的业务场景组件：

#### CXCard

- **功能**: 功能丰富的卡片组件，适用于展示复杂信息
- **特性**: 头像、标签、元数据、状态指示、点击交互
- **变体**: `default` | `bordered` | `shadow` | `minimal`
- **状态**: `default` | `success` | `warning` | `error` | `info`

## 📖 文档和 Storybook

### 本地开发和预览

```bash
# 克隆项目
git clone https://github.com/your-org/fe-cosx-ui.git
cd fe-cosx-ui

# 安装依赖
pnpm install

# 启动 Storybook 开发服务器
pnpm dev

# 浏览器访问 http://localhost:6006
```

## 🛠️ 本地开发

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)
- React >= 19.0.0

### 开发工作流

```bash
# 1. 克隆并安装
git clone <your-repo-url>
cd fe-cosx-ui
pnpm install

# 2. 启动开发环境
pnpm dev # 启动 Storybook (localhost:6006)

# 3. 构建组件库
pnpm build # 生成 dist/ 文件夹

# 4. 代码质量检查
pnpm lint # ESLint 检查并自动修复
pnpm typecheck # TypeScript 类型检查
pnpm format # Prettier 代码格式化

# 5. 分析打包大小
pnpm analyze # 生成包大小分析报告
```

### 目录结构

```
src/
├── components/
│   ├── Base/           # 基础组件（扩展 Ant Design）
│   │   └── CXButton/   # 按钮组件
│   └── Case/           # 复合组件（业务场景）
│       └── CXCard/     # 卡片组件
├── styles/
│   └── globals.css     # 全局样式
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
└── index.ts            # 主入口文件
```

## 🔗 本地链接开发

### 在组件库项目中创建链接

```bash
# 在组件库项目根目录
cd fe-cosx-ui

# 构建组件库
pnpm build

# 创建全局链接
pnpm link --global

# 或者使用 npm
npm link
```

### 在其他项目中使用链接

```bash
# 在需要使用组件库的项目中
cd your-app-project

# 链接本地组件库
pnpm link --global fe-cosx-ui

# 或者使用 npm
npm link fe-cosx-ui
```

### 开发时的实时更新

```bash
# 在组件库项目中，启用监听模式构建
pnpm build:watch

# 这样修改组件库代码后会自动重新构建
# 其他项目中会自动获取最新版本
```

### 取消链接

```bash
# 在使用项目中取消链接
pnpm unlink fe-cosx-ui

# 重新安装正式版本
pnpm install fe-cosx-ui
```

## 📦 GitHub 自动化打包发布

### 1. 设置 NPM 访问令牌

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

- `NPM_TOKEN`: 你的 NPM 访问令牌

### 2. 创建 GitHub Actions 工作流

创建 `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*' # 当推送以 v 开头的标签时触发

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org/'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests and linting
        run: |
          pnpm lint:check
          pnpm typecheck

      - name: Build library
        run: pnpm build

      - name: Publish to NPM
        run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3. 创建发布脚本

在 `package.json` 中添加发布脚本：

```json
{
  "scripts": {
    "release:patch": "npm version patch && git push && git push --tags",
    "release:minor": "npm version minor && git push && git push --tags",
    "release:major": "npm version major && git push && git push --tags"
  }
}
```

### 4. 发布新版本

```bash
# 发布补丁版本 (1.0.0 -> 1.0.1)
pnpm run release:patch

# 发布次要版本 (1.0.1 -> 1.1.0)
pnpm run release:minor

# 发布主要版本 (1.1.0 -> 2.0.0)
pnpm run release:major
```

## 🔧 其他项目如何使用

### 1. React + Vite 项目

```bash
# 安装
pnpm add fe-cosx-ui antd @ant-design/v5-patch-for-react-19

# 配置 vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['antd', '@ant-design/icons']
  }
})
```

在 `main.tsx` 中：

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'fe-cosx-ui/dist/styles.css';
import 'fe-cosx-ui'; // 应用 React 19 兼容补丁
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2. Next.js 项目

```bash
# 安装
pnpm add fe-cosx-ui antd @ant-design/v5-patch-for-react-19
```

在 `app/layout.tsx` 中：

```tsx
import 'fe-cosx-ui/dist/styles.css';
import 'fe-cosx-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh'>
      <body>{children}</body>
    </html>
  );
}
```

### 3. 样式主题定制

创建 `custom-theme.css`:

```css
:root {
  /* 自定义主色调 */
  --ant-color-primary: #1890ff;
  --ant-color-success: #52c41a;
  --ant-color-warning: #faad14;
  --ant-color-error: #ff4d4f;

  /* Tailwind 变量 */
  --color-primary-500: 24 144 255;
  --color-primary-600: 22 119 204;
}

.dark {
  --ant-color-primary: #177ddc;
  --color-primary-500: 23 125 220;
}
```

然后在项目中导入：

```tsx
import 'fe-cosx-ui/dist/styles.css';
import './custom-theme.css';
```

### 4. TypeScript 支持

组件库提供完整的 TypeScript 类型定义，支持智能提示：

```tsx
import type { CXButtonProps, CXCardProps } from 'fe-cosx-ui';

// 完整的类型支持和智能提示
const MyButton: React.FC<CXButtonProps> = props => {
  return <CXButton {...props} />;
};
```

## 📊 包大小限制

- ESM 构建: ≤ 50KB
- CJS 构建: ≤ 55KB
- Tree Shaking 支持，按需导入

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](./LICENSE)。

## 🙏 致谢

- [React](https://reactjs.org/) - UI 库
- [Ant Design](https://ant.design/) - 基础组件库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Storybook](https://storybook.js.org/) - 组件开发工具
