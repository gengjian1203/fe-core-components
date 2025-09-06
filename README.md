# @cosx/fe-core-components

[![npm version](https://badge.fury.io/js/@cosx/fe-core-components.svg)](https://badge.fury.io/js/@cosx/fe-core-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[展示目录](https://gengjian1203.github.io/fe-core-components/)

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
# 配置 GitHub Package Registry（仅针对 @cosx scope）
npm config set @cosx:registry https://npm.pkg.github.com

# 或在项目根目录创建 .npmrc 文件
echo "@cosx:registry=https://npm.pkg.github.com" >> .npmrc
```

### 2.2 安装组件库

```bash
# 使用 pnpm（推荐）
pnpm add @cosx/fe-core-components

# 或使用 npm
npm install @cosx/fe-core-components

# 或使用 yarn
yarn add @cosx/fe-core-components
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
import '@cosx/fe-core-components/styles'; // 导入样式文件（必须）
```

或者使用完整路径：

```tsx
// main.tsx 或 App.tsx
import '@cosx/fe-core-components/dist/styles.css'; // 完整路径导入样式
```

如果忘记导入样式文件，组件会正常渲染但没有任何样式效果。

### 2.5 基础使用示例

```tsx
import { CXButton, CXCard } from '@cosx/fe-core-components';
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
import type { CXButtonProps, CXCardProps } from '@cosx/fe-core-components';

// 完整的类型支持和智能提示
const MyButton: React.FC<CXButtonProps> = props => {
  return <CXButton {...props} />;
};
```

### 2.7 不同框架集成

#### 2.7.1 React + Vite 项目

```bash
# 安装依赖
pnpm add @cosx/fe-core-components antd tailwindcss @ant-design/v5-patch-for-react-19

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
import '@cosx/fe-core-components/styles'; // 导入样式文件（必须）
import '@cosx/fe-core-components'; // 应用 React 19 兼容补丁
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
pnpm add @cosx/fe-core-components antd tailwindcss @ant-design/v5-patch-for-react-19
```

在 `app/layout.tsx` 中：

```tsx
import '@cosx/fe-core-components/styles'; // 导入样式文件（必须）
import '@cosx/fe-core-components';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh'>
      <body>{children}</body>
    </html>
  );
}
```

## 3. 本地开发工作流

### 3.1 环境要求

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0（推荐包管理器）
- **React** >= 19.0.0
- **Git** 最新版本

### 3.2 项目克隆和初始化

```bash
# 1. 克隆项目
git clone https://github.com/your-org/fe-core-components.git
cd fe-core-components

# 2. 安装依赖
pnpm install

# 3. 启动 Storybook 开发环境
pnpm dev
# 浏览器自动打开 http://localhost:6006
```

### 3.3 开发命令

```bash
# 构建相关
pnpm build              # 构建组件库（用于生产）
pnpm build:watch        # 构建并启用监听模式（用于本地调试）
pnpm build-storybook    # 构建 Storybook 静态文件

# 代码质量检查
pnpm lint               # ESLint 检查并自动修复
pnpm lint:check         # ESLint 检查不修复
pnpm typecheck          # TypeScript 类型检查
pnpm format             # Prettier 格式化
pnpm format:check       # Prettier 格式检查

# 分析工具
pnpm analyze            # 包大小分析（限制：ESM ≤50KB, CJS ≤55KB）
```

### 3.4 项目结构

```
fe-core-components/
├── .github/workflows/     # GitHub Actions 工作流
├── src/
│   ├── components/
│   │   ├── Base/          # 基础组件（扩展 Ant Design）
│   │   │   └── CXButton/  # 按钮组件
│   │   └── Case/          # 复合组件（业务场景）
│   │       └── CXCard/    # 卡片组件
│   ├── styles/
│   │   └── globals.css    # 全局样式
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   └── index.ts           # 主入口文件
├── dist/                  # 构建输出目录
├── .storybook/           # Storybook 配置
├── CLAUDE.md             # Claude AI 指南
└── README.md
```

### 3.5 本地项目 Link 调试

#### 3.5.1 组件库项目创建链接

```bash
# 在组件库项目根目录
cd fe-core-components

# 构建组件库
pnpm build

# 进入构建输出目录
cd dist

# 创建全局链接
pnpm link --global

# 或者使用 npm
npm link
```

#### 3.5.2 宿主项目链接组件库

```bash
# 在需要使用组件库的宿主项目中
cd your-host-project

# 链接本地组件库
pnpm link --global @cosx/fe-core-components

# 或者使用 npm
npm link @cosx/fe-core-components
```

**⚠️ 本地 Link 开发时的样式导入**：

在本地 link 开发模式下，由于链接的是 `dist` 目录，样式文件的导入路径需要调整：

```tsx
// 方式一：导入 ESM 版本样式（推荐）
import '@cosx/fe-core-components/styles.css';

// 方式二：如果方式一无法解析，使用相对路径
import '@cosx/fe-core-components/dist/esm/styles.css';
import '../node_modules/@cosx/fe-core-components/dist/esm/styles.css';
```

#### 3.5.3 开发时实时更新

```bash
# 在组件库项目中，启用监听模式构建
pnpm build:watch

# 修改组件库代码后会自动重新构建
# 宿主项目中会自动获取最新版本（需要热重载支持）
```

#### 3.5.4 解除 Link 连接

##### 3.5.4.1 宿主项目解除链接

```bash
# 在宿主项目中解除链接
pnpm unlink @cosx/fe-core-components

# 重新安装正式版本
pnpm install @cosx/fe-core-components
```

##### 3.5.4.2 组件库项目解除链接

```bash
# 在组件库项目中解除全局链接
cd fe-core-components/dist
pnpm unlink --global

# 或者使用 npm
npm unlink --global
```

### 3.6 宿主项目使用指南

#### 3.6.1 在 React 项目中使用（本地 Link 开发）

```tsx
// 宿主项目的入口文件（main.tsx 或 App.tsx）
import '@cosx/fe-core-components/styles.css'; // 本地 link 开发时使用 ESM 版本样式

// 导入组件
import { CXButton, CXCard } from '@cosx/fe-core-components';

// 在组件中使用
function MyComponent() {
  return (
    <div>
      <CXButton variant='primary'>点击我</CXButton>
      <CXCard title='测试卡片'>卡片内容</CXCard>
    </div>
  );
}
```

#### 3.6.2 主题定制

创建 `custom-theme.css`：

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
import '@cosx/fe-core-components/styles.css'; // 必须先导入组件库样式
import './custom-theme.css'; // 再导入自定义主题
```

## 4. GitHub Actions 部署操作介绍

### 4.1 CI/CD 工作流概述

项目包含两个主要的 GitHub Actions 工作流：

#### 4.1.1 持续集成（CI）- `.github/workflows/ci.yml`

**触发条件**：

- 推送到 `main` 或 `develop` 分支
- 针对 `main` 或 `develop` 分支的 Pull Request

**执行步骤**：

- 多版本 Node.js 测试（18.x, 20.x）
- ESLint 代码检查
- TypeScript 类型检查
- Prettier 格式检查
- 组件库构建验证
- Storybook 构建验证
- 包大小限制检查

#### 4.1.2 发布到 NPM（Publish）- `.github/workflows/publish.yml`

**触发条件**：

- 推送以 `v` 开头的 Git 标签（如 `v1.0.0`）

**执行步骤**：

- 代码检出和环境配置
- 依赖安装（带缓存优化）
- 代码质量检查（lint + typecheck）
- 组件库构建
- 包大小验证
- 自动发布到 GitHub Package Registry

### 4.2 部署环境配置

#### 4.2.1 GitHub Secrets 设置

在 GitHub 仓库的 `Settings > Secrets and variables > Actions` 中添加：

- `NPM_TOKEN`: GitHub Personal Access Token，需要 `write:packages` 权限

#### 4.2.2 Package.json 配置

确保 package.json 中包含正确的 registry 配置：

```json
{
  "name": "@cosx/fe-core-components",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-org/fe-core-components.git"
  }
}
```

### 4.3 版本发布流程

#### 4.3.1 自动化发布

```bash
# 发布补丁版本（1.0.0 -> 1.0.1）
pnpm run release:patch

# 发布次要版本（1.0.1 -> 1.1.0）
pnpm run release:minor

# 发布主要版本（1.1.0 -> 2.0.0）
pnpm run release:major
```

这些命令会自动执行：

- 运行预发布检查（lint + typecheck + build）
- 更新版本号
- 创建 Git 标签
- 推送到远程仓库
- 触发 GitHub Actions 自动发布

#### 4.3.2 手动发布流程

如果需要手动控制发布流程：

```bash
# 1. 检查代码质量
pnpm run prerelease

# 2. 更新版本号（不推送）
npm version patch --no-git-tag-version

# 3. 手动创建和推送标签
git add package.json
git commit -m "chore: bump version to v1.0.1"
git tag v1.0.1
git push origin main --tags
```

### 4.4 发布监控和验证

#### 4.4.1 发布状态监控

- 在 GitHub 仓库的 `Actions` 标签页监控工作流执行状态
- 发布成功后，在 `Packages` 标签页查看已发布的包
- 检查包大小限制是否符合要求（ESM ≤50KB, CJS ≤55KB）

#### 4.4.2 发布验证

```bash
# 验证包是否发布成功
npm view @cosx/fe-core-components

# 在测试项目中验证安装
npm install @cosx/fe-core-components@latest
```

### 4.5 部署最佳实践

#### 4.5.1 版本管理

- **语义化版本**：严格遵循 [Semantic Versioning](https://semver.org/) 规范
- **变更日志**：每次发布前更新 `CHANGELOG.md`
- **预发布检查**：确保所有检查通过后再发布

#### 4.5.2 质量保证

- **包大小监控**：定期检查包大小，避免意外增长
- **依赖安全**：定期更新依赖，修复安全漏洞
- **自动化测试**：确保 CI 流程覆盖所有质量检查

#### 4.5.3 发布策略

- **主要版本**：包含破坏性更改时发布
- **次要版本**：添加新功能但保持向后兼容时发布
- **补丁版本**：修复 bug 或进行小幅改进时发布

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
