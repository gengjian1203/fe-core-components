# Storybook 与单元测试集成指南

本指南展示了如何在 Storybook stories 中集成单元测试，提供多种方法来确保组件的质量和可靠性。

## 目录

1. [基础概念](#基础概念)
2. [集成方法](#集成方法)
3. [实际示例](#实际示例)
4. [测试运行](#测试运行)
5. [最佳实践](#最佳实践)

## 基础概念

### 为什么要集成测试？

- **视觉测试与功能测试结合**：Stories 提供视觉展示，测试确保功能正确
- **真实场景测试**：使用实际的 story 配置进行测试
- **维护一致性**：确保 stories 和测试保持同步
- **提高开发效率**：一次编写，多处使用

### 支持的测试类型

- ✅ 渲染测试
- ✅ 交互测试
- ✅ 无障碍访问测试
- ✅ 状态管理测试
- ✅ 快照测试

## 集成方法

### 方法一：使用 composeStories (推荐)

```typescript
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

// 将 stories 转换为可测试的组件
const { Default, Interactive, Variants } = composeStories(stories);

describe('Button Stories', () => {
  it('renders default story correctly', () => {
    render(<Default />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 方法二：直接测试 Story 函数

```typescript
import { render } from '@testing-library/react';
import { Default } from './Button.stories';

describe('Button Stories', () => {
  it('renders default story', () => {
    const StoryComponent = Default.render || Default;
    render(<StoryComponent {...Default.args} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 方法三：使用 Storybook Test Runner

```bash
# 安装依赖
pnpm add -D @storybook/test-runner playwright

# 运行测试
pnpm test-storybook
```

## 实际示例

### 基础渲染测试

```typescript
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

const { Default, Interactive, Variants } = composeStories(stories);

describe('Button Stories Integration', () => {
  describe('Default Story', () => {
    it('renders with correct text', () => {
      render(<Default />);
      expect(screen.getByText('默认按钮')).toBeInTheDocument();
    });

    it('has correct variant class', () => {
      render(<Default />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-500');
    });
  });
});
```

### 交互测试

```typescript
import userEvent from '@testing-library/user-event';

describe('Interactive Tests', () => {
  it('handles click events', async () => {
    const user = userEvent.setup();
    render(<Interactive />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(button).toBeEnabled();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Interactive />);
    
    const button = screen.getByRole('button');
    
    await user.tab();
    expect(button).toHaveFocus();
    
    await user.keyboard(' ');
    await user.keyboard('{Enter}');
  });
});
```

### 状态测试

```typescript
describe('State Tests', () => {
  it('handles disabled state', () => {
    render(<DisabledButton />);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows loading state correctly', () => {
    render(<LoadingButton />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });
});
```

### 多变体测试

```typescript
describe('Variants Tests', () => {
  it('renders all button variants', () => {
    render(<Variants />);
    
    const variants = [
      'Primary', 'Secondary', 'Success', 
      'Warning', 'Error', 'Info', 
      'Outline', 'Ghost', 'Link'
    ];
    
    variants.forEach(variant => {
      expect(screen.getByText(variant)).toBeInTheDocument();
    });
  });

  it('applies correct variant classes', () => {
    render(<Variants />);
    
    const primaryButton = screen.getByText('Primary');
    const outlineButton = screen.getByText('Outline');
    
    expect(primaryButton).toHaveClass('bg-blue-500');
    expect(outlineButton).toHaveClass('border-blue-500');
  });
});
```

### 表单集成测试

```typescript
describe('Form Integration', () => {
  it('handles form submission', async () => {
    const mockSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(
      <form onSubmit={mockSubmit}>
        <Button type="submit">提交</Button>
      </form>
    );
    
    await user.click(screen.getByText('提交'));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
```

## 测试运行

### 运行单个测试文件

```bash
# 运行特定的 story 测试
pnpm test Button.stories.test.ts

# 运行监视模式
pnpm test:watch Button.stories.test.ts
```

### 运行所有 stories 测试

```bash
# 运行所有 .stories.test.ts 文件
pnpm test --testMatch="**/*.stories.test.ts"

# 生成覆盖率报告
pnpm test:coverage --testMatch="**/*.stories.test.ts"
```

### 与 CI/CD 集成

```yaml
# .github/workflows/test.yml
- name: Run Storybook Tests
  run: |
    pnpm build-storybook
    pnpm test:storybook
```

## 最佳实践

### 1. 测试结构

```typescript
describe('ComponentName Stories', () => {
  describe('StoryName', () => {
    it('specific test case', () => {
      // 测试实现
    });
  });
});
```

### 2. 测试命名规范

- 测试文件：`Component.stories.test.ts`
- 测试描述：清晰描述测试目标
- 分组：按 story 名称分组

### 3. Mock 和清理

```typescript
describe('Button Tests', () => {
  beforeEach(() => {
    // 设置 mock
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // 清理 mock
    jest.restoreAllMocks();
  });
});
```

### 4. 异步测试

```typescript
it('handles async operations', async () => {
  const user = userEvent.setup();
  render(<AsyncButton />);
  
  await user.click(screen.getByRole('button'));
  
  await waitFor(() => {
    expect(screen.getByText('完成')).toBeInTheDocument();
  });
});
```

### 5. 无障碍访问测试

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<AccessibleButton />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});
```

## 工具配置

### Jest 配置

```javascript
// jest.config.js
module.exports = {
  testMatch: [
    '**/__tests__/**/*.(ts|tsx)',
    '**/*.test.(ts|tsx)',
    '**/*.stories.test.(ts|tsx)'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
};
```

### TypeScript 配置

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

## 总结

通过将单元测试与 Storybook stories 集成：

- ✅ 提高了测试覆盖率
- ✅ 确保了视觉与功能的一致性
- ✅ 简化了测试维护工作
- ✅ 提供了更好的开发体验

这种方法让你能够在一个地方管理组件的展示和测试，确保代码质量的同时提高开发效率。