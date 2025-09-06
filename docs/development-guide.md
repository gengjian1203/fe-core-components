# 开发指南

## 项目概述

fe-core-components 是一个基于 React 19、TypeScript、Tailwind CSS 和 Storybook 构建的现代化组件库。采用原子设计方法论，提供高质量、可复用的 UI 组件。

## 技术栈

- **React 19**: 最新版本的 React，支持 Server Components
- **TypeScript**: 严格模式，确保类型安全
- **Tailwind CSS**: 原子化 CSS 框架，支持自定义主题
- **Storybook v7+**: 组件文档和开发环境
- **Rollup**: 构建工具，支持 Tree Shaking
- **Jest + RTL**: 测试框架
- **ESLint + Prettier**: 代码规范
- **Husky**: Git 钩子管理

## 项目结构

```
fe-core-components/
├── src/
│   ├── components/
│   │   ├── atoms/          # 原子组件（Button, Input 等）
│   │   ├── molecules/      # 分子组件（Card, Modal 等）
│   │   └── organisms/      # 组织体组件（Header, Sidebar 等）
│   ├── hooks/              # 自定义 React Hooks
│   ├── utils/              # 工具函数
│   ├── types/              # TypeScript 类型定义
│   └── styles/             # 全局样式和主题
├── stories/                # Storybook 故事文件
├── tests/                  # 测试工具和配置
├── docs/                   # 文档
└── dist/                   # 构建产物
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发命令

```bash
# 启动 Storybook 开发服务器
npm run dev

# 构建组件库
npm run build

# 运行测试
npm run test

# 运行测试（监听模式）
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage

# 代码检查
npm run lint

# 代码格式化
npm run format

# TypeScript 类型检查
npm run typecheck

# 提交代码（使用 Commitizen）
npm run commit
```

## 组件开发流程

### 1. 创建组件

根据原子设计原则，确定组件层级：

- **Atoms**: 最基础的 UI 元素（Button, Input, Icon）
- **Molecules**: 由多个原子组件组成（SearchBox, FormField）
- **Organisms**: 复杂的 UI 区域（Header, ProductList）

### 2. 组件目录结构

```
src/components/atoms/Button/
├── Button.tsx           # 组件实现
├── Button.test.tsx      # 单元测试
├── Button.stories.tsx   # Storybook 故事
└── index.ts            # 导出文件
```

### 3. 组件开发模板

````tsx
import React from 'react';
import type { HTMLAttributes } from 'react';
import type { BaseComponentProps } from '@/types';
import { cn } from '@/utils';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement>, BaseComponentProps {
  // 组件特定属性
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ComponentName 组件描述
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary" size="md">
 *   Content
 * </ComponentName>
 * ```
 */
export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'base-classes',
      // 条件类名
      {
        'variant-primary': variant === 'primary',
        'size-md': size === 'md',
      },
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
````

### 4. 编写测试

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test content</ComponentName>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick}>Clickable</ComponentName>);

    await userEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 5. 编写 Storybook 故事

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/Atoms/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};
```

## 代码规范

### TypeScript 规范

- 使用严格模式，启用所有严格检查
- 优先使用 `interface` 而不是 `type`
- 使用 `type` 导入类型定义
- 为所有组件提供完整的类型定义

### React 规范

- 使用函数组件和 Hooks
- 使用 `React.forwardRef` 转发 ref
- 设置 `displayName` 便于调试
- 使用解构赋值处理 props

### CSS 规范

- 使用 Tailwind CSS 原子类
- 通过 CSS 变量实现主题定制
- 使用 `cn` 工具函数合并类名
- 避免内联样式

### 文件命名规范

- 组件文件：`PascalCase.tsx`
- 工具函数：`camelCase.ts`
- 测试文件：`ComponentName.test.tsx`
- 故事文件：`ComponentName.stories.tsx`

## 样式和主题

### Tailwind CSS 配置

项目使用自定义的 Tailwind 配置，支持：

- 基于 CSS 变量的主题系统
- 暗黑模式支持
- 自定义颜色调色板
- 响应式断点扩展
- 自定义动画和过渡效果

### 主题定制

在 `src/styles/globals.css` 中定义 CSS 变量：

```css
:root {
  --color-primary-500: 59 130 246;
  --color-primary-600: 37 99 235;
}

.dark {
  --color-primary-500: 96 165 250;
  --color-primary-600: 147 197 253;
}
```

### 使用主题

```tsx
// 使用预定义的颜色类
<button className='bg-primary-500 text-white'>Button</button>;

// 使用工具函数
import { getVariantClasses } from '@/utils';
const classes = getVariantClasses('primary', 'bg');
```

## 测试策略

### 单元测试

- 测试组件渲染
- 测试用户交互
- 测试 props 传递
- 测试边界情况

### 测试工具

- Jest: 测试运行器
- React Testing Library: 组件测试
- jest-dom: DOM 断言扩展
- user-event: 用户交互模拟

### 覆盖率要求

- 分支覆盖率: >= 80%
- 函数覆盖率: >= 80%
- 行覆盖率: >= 80%
- 语句覆盖率: >= 80%

## 无障碍访问 (A11y)

### 基本要求

- 所有交互元素支持键盘操作
- 提供合适的 ARIA 标签
- 确保颜色对比度符合 WCAG 标准
- 支持屏幕阅读器

### 实现指南

```tsx
// 提供 ARIA 标签
<Button aria-label='关闭对话框' aria-describedby='dialog-description'>
  ×
</Button>;

// 支持键盘导航
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    onClick?.();
  }
};
```

## 构建和发布

### 构建配置

- **ESM**: 现代打包工具使用
- **CJS**: Node.js 环境使用
- **UMD**: 浏览器直接使用
- **TypeScript**: 类型声明文件

### 发布流程

1. 更新版本号
2. 生成 CHANGELOG
3. 运行完整测试
4. 构建组件库
5. 发布到 npm

```bash
# 发布准备
npm version patch  # 或 minor/major
npm run build
npm publish
```

## 性能优化

### Tree Shaking

- 使用 ES Modules 导出
- 避免副作用导入
- 标记纯函数

### Bundle 大小

- 监控构建产物大小
- 使用 `bundlesize` 检查
- 分析依赖关系

### 运行时性能

- 使用 `React.memo` 优化重渲染
- 合理使用 `useMemo` 和 `useCallback`
- 避免不必要的计算

## 常见问题

### Q: 如何添加新的组件变体？

A: 在组件的 props 接口中添加新的变体类型，然后在组件实现中处理对应的样式。

### Q: 如何处理复杂的状态逻辑？

A: 创建自定义 Hook 来封装复杂的状态逻辑，保持组件的简洁。

### Q: 如何确保样式的一致性？

A: 使用 Design Tokens（CSS 变量）和工具函数来保持样式的一致性。

### Q: 如何调试组件？

A: 使用 Storybook 的交互式环境，结合 React DevTools 进行调试。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 编写代码和测试
4. 确保所有检查通过
5. 提交 Pull Request

### 提交信息规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
feat: 添加新的 Button 组件变体
fix: 修复 Card 组件的响应式问题
docs: 更新开发指南
test: 添加 Input 组件测试用例
```
