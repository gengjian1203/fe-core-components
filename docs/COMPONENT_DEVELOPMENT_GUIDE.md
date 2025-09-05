# 组件库开发指南

本指南展示如何在本项目中开发 React 组件，包括组件结构、Storybook 配置和最佳实践。

## 🏗️ 项目结构

```
src/
├── components/
│   ├── atoms/           # 原子组件（最基础的UI元素）
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   │       ├── Input.tsx
│   │       ├── Input.stories.tsx
│   │       └── index.ts
│   ├── molecules/       # 分子组件（由原子组件组合）
│   │   └── Card/
│   │       ├── Card.tsx
│   │       ├── Card.stories.tsx
│   │       └── index.ts
│   └── organisms/       # 有机体组件（复杂的UI组合）
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
└── styles/             # 全局样式
```

## 📦 技术栈

- **React 19** - 最新的 React 版本
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Storybook 9** - 组件开发和文档
- **Vite** - 构建工具

## 🚀 开发新组件

### 1. 创建组件结构

```bash
# 创建新组件目录
mkdir -p src/components/atoms/YourComponent

# 创建必要文件
touch src/components/atoms/YourComponent/YourComponent.tsx
touch src/components/atoms/YourComponent/YourComponent.stories.tsx
touch src/components/atoms/YourComponent/index.ts
```

### 2. 组件开发模板

#### 组件文件 (`YourComponent.tsx`)

````tsx
import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { ComponentSize, BaseComponentProps } from '@/types';
import { cn } from '@/utils';

// 组件属性接口
export interface YourComponentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'size'>,
    BaseComponentProps {
  /** 组件大小 */
  size?: ComponentSize;
  /** 组件变体 */
  variant?: 'primary' | 'secondary';
  /** 子组件 */
  children: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * YourComponent 组件 - 组件描述
 *
 * @example
 * ```tsx
 * <YourComponent size="md" variant="primary">
 *   内容
 * </YourComponent>
 * ```
 */
export const YourComponent = React.forwardRef<HTMLDivElement, YourComponentProps>(
  ({ size = 'md', variant = 'primary', children, disabled = false, className, ...props }, ref) => {
    const componentClasses = cn(
      // 基础样式
      'inline-flex',
      'items-center',
      'justify-center',
      'transition-all',
      'duration-200',

      // 尺寸样式
      {
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-3 text-base': size === 'md',
        'px-6 py-4 text-lg': size === 'lg',
      },

      // 变体样式
      {
        'bg-primary-600 text-white': variant === 'primary',
        'bg-secondary-600 text-white': variant === 'secondary',
      },

      // 状态样式
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
      },

      className
    );

    return (
      <div ref={ref} className={componentClasses} aria-disabled={disabled} {...props}>
        {children}
      </div>
    );
  }
);

YourComponent.displayName = 'YourComponent';
````

#### Stories 文件 (`YourComponent.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/Atoms/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '组件的详细描述，解释其用途和功能。',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '组件尺寸',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: '组件变体',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    children: {
      control: { type: 'text' },
      description: '子组件内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    children: '默认组件',
    size: 'md',
    variant: 'primary',
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <YourComponent size='sm'>Small</YourComponent>
      <YourComponent size='md'>Medium</YourComponent>
      <YourComponent size='lg'>Large</YourComponent>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同尺寸的组件。',
      },
    },
  },
};

// 不同变体
export const Variants: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <YourComponent variant='primary'>Primary</YourComponent>
      <YourComponent variant='secondary'>Secondary</YourComponent>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同变体的组件。',
      },
    },
  },
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <YourComponent disabled>Disabled</YourComponent>
      <YourComponent>Enabled</YourComponent>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示禁用状态的组件。',
      },
    },
  },
};

// 交互式组件
export const Interactive: Story = {
  args: {
    children: '交互式组件',
    size: 'md',
    variant: 'primary',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '可在Controls面板中调整属性来预览效果。',
      },
    },
  },
};
```

#### 导出文件 (`index.ts`)

```tsx
export * from './YourComponent';
```

### 3. 更新导出

在 `src/components/atoms/index.ts` 中添加新组件的导出：

```tsx
export * from './YourComponent';
```

## 🎨 样式指南

### Tailwind CSS 最佳实践

1. **使用 `cn` 工具函数**组合类名：

```tsx
import { cn } from '@/utils';

const classes = cn(
  'base-classes',
  'more-classes',
  {
    'conditional-class': condition,
    'another-conditional': anotherCondition,
  },
  className // 外部传入的类名
);
```

2. **响应式设计**：

```tsx
('px-4 py-2', // 基础样式
  'md:px-6 md:py-3', // 中等屏幕
  'lg:px-8 lg:py-4'); // 大屏幕
```

3. **主题支持**（暗色模式）：

```tsx
('bg-white dark:bg-gray-800', 'text-gray-900 dark:text-white');
```

### 颜色系统

```tsx
// 主色调
'bg-primary-500'; // 主要颜色
'bg-secondary-500'; // 次要颜色

// 状态颜色
'bg-success-500'; // 成功
'bg-warning-500'; // 警告
'bg-error-500'; // 错误
'bg-info-500'; // 信息

// 中性色
'bg-neutral-100'; // 浅灰
'bg-neutral-500'; // 中灰
'bg-neutral-900'; // 深灰
```

## 📖 TypeScript 类型指南

### 基础类型

```tsx
// 组件尺寸
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 颜色变体
type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// 基础组件属性
interface BaseComponentProps {
  /** 自定义CSS类名 */
  className?: string;
}
```

### 扩展HTML属性

```tsx
// 扩展按钮属性
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    BaseComponentProps {
  size?: ComponentSize;
  // 其他自定义属性
}

// 扩展Div属性
interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseComponentProps {
  // 自定义属性
}
```

## 📝 Storybook 最佳实践

### 1. 故事分类

```tsx
// 按原子设计分类
title: 'Components/Atoms/Button'; // 原子组件
title: 'Components/Molecules/Card'; // 分子组件
title: 'Components/Organisms/Header'; // 有机体组件

// 按功能分类
title: 'Forms/Input'; // 表单相关
title: 'Navigation/Menu'; // 导航相关
title: 'Feedback/Alert'; // 反馈相关
```

### 2. 控件配置

```tsx
argTypes: {
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: '组件尺寸'
  },
  disabled: {
    control: { type: 'boolean' },
    description: '是否禁用'
  },
  children: {
    control: { type: 'text' },
    description: '子组件内容'
  },
  onClick: {
    action: 'clicked'
  }
}
```

### 3. 文档说明

```tsx
parameters: {
  docs: {
    description: {
      component: '组件的整体描述',
      story: '这个故事展示的特定功能'
    }
  }
}
```

## 🧪 开发和测试

### 启动开发环境

```bash
# 启动 Storybook
pnpm dev

# 构建组件库
pnpm build

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

### 开发流程

1. **创建组件结构**
2. **编写组件逻辑**
3. **添加 TypeScript 类型**
4. **编写 Storybook 故事**
5. **测试各种场景**
6. **添加文档说明**
7. **更新导出文件**

## 🔧 工具配置

### VS Code 推荐插件

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter

### 代码片段

在 VS Code 中创建 React 组件的代码片段：

```json
{
  "React Component with TypeScript": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import type { HTMLAttributes, ReactNode } from 'react';",
      "import { cn } from '@/utils';",
      "",
      "interface ${1:Component}Props extends HTMLAttributes<HTMLDivElement> {",
      "  children: ReactNode;",
      "}",
      "",
      "export const ${1:Component} = React.forwardRef<HTMLDivElement, ${1:Component}Props>(",
      "  ({ children, className, ...props }, ref) => {",
      "    return (",
      "      <div ref={ref} className={cn('', className)} {...props}>",
      "        {children}",
      "      </div>",
      "    );",
      "  }",
      ");",
      "",
      "${1:Component}.displayName = '${1:Component}';"
    ],
    "description": "Create a React functional component with TypeScript"
  }
}
```

## 📚 参考资源

- [React 19 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Storybook 文档](https://storybook.js.org/)
- [原子设计方法论](https://atomicdesign.bradfrost.com/)

## 🤝 贡献指南

1. 遵循现有的代码风格和结构
2. 为每个组件编写完整的 TypeScript 类型
3. 创建全面的 Storybook 故事
4. 添加适当的文档说明
5. 确保组件支持无障碍访问
6. 测试各种使用场景
