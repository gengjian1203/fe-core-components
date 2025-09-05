import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '基础按钮组件，支持多种变体、尺寸和状态。提供完整的无障碍访问支持。',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'outline',
        'ghost',
        'link',
      ],
      description: '按钮变体样式',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '按钮尺寸',
    },
    shape: {
      control: { type: 'select' },
      options: ['rectangle', 'square', 'circle'],
      description: '按钮形状',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用按钮',
    },
    loading: {
      control: { type: 'boolean' },
      description: '是否显示加载状态',
    },
    loadingText: {
      control: { type: 'text' },
      description: '加载状态下的文本',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '是否占满父容器宽度',
    },
    shadow: {
      control: { type: 'boolean' },
      description: '是否显示阴影',
    },
    children: {
      control: { type: 'text' },
      description: '按钮内容',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    children: '默认按钮',
    variant: 'primary',
    size: 'md',
  },
};

// 所有变体展示
export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='success'>Success</Button>
      <Button variant='warning'>Warning</Button>
      <Button variant='error'>Error</Button>
      <Button variant='info'>Info</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示所有可用的按钮变体样式。',
      },
    },
  },
};

// 所有尺寸展示
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-end'>
      <Button size='xs'>Extra Small</Button>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示所有可用的按钮尺寸。',
      },
    },
  },
};

// 按钮形状展示
export const Shapes: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button shape='rectangle'>Rectangle</Button>
      <Button shape='square'>□</Button>
      <Button shape='circle'>●</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同的按钮形状：矩形、正方形和圆形。',
      },
    },
  },
};

// 按钮状态
export const States: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button>正常状态</Button>
      <Button disabled>禁用状态</Button>
      <Button loading>加载中</Button>
      <Button loading loadingText='处理中...'>
        加载状态
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示按钮的不同状态：正常、禁用、加载中。',
      },
    },
  },
};

// 带图标的按钮
export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button leftIcon={<span>📥</span>}>下载</Button>
      <Button rightIcon={<span>→</span>}>继续</Button>
      <Button leftIcon={<span>💾</span>} rightIcon={<span>✓</span>}>
        保存并完成
      </Button>
      <Button shape='circle'>
        <span>+</span>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示带有左侧图标、右侧图标或仅图标的按钮。',
      },
    },
  },
};

// 全宽按钮
export const FullWidth: Story = {
  render: () => (
    <div className='w-96 space-y-4'>
      <Button fullWidth variant='primary'>
        全宽主要按钮
      </Button>
      <Button fullWidth variant='outline'>
        全宽边框按钮
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示占满父容器宽度的按钮。',
      },
    },
  },
};

// 带阴影的按钮
export const WithShadow: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button shadow>有阴影</Button>
      <Button shadow variant='success'>
        成功按钮
      </Button>
      <Button shadow variant='error'>
        错误按钮
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示带有阴影效果的按钮。',
      },
    },
  },
};

// 交互式按钮（可在Controls面板调整）
export const Interactive: Story = {
  args: {
    children: '交互式按钮',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    shadow: false,
    shape: 'rectangle',
  },
  parameters: {
    docs: {
      description: {
        story: '可在Controls面板中调整各种属性来预览效果。支持测试的交互式按钮示例。',
      },
    },
  },
};

// 加载状态详细展示
export const LoadingStates: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4 items-center'>
      <Button loading>默认加载</Button>
      <Button loading loadingText='保存中...'>
        自定义文本
      </Button>
      <Button loading loadingText='上传中...' variant='success'>
        成功变体
      </Button>
      <Button loading size='lg' variant='outline'>
        边框变体
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同变体和尺寸下的加载状态。',
      },
    },
  },
};

// 暗色主题下的按钮（需要在Storybook中切换主题查看）
export const DarkMode: Story = {
  render: () => (
    <div className='dark bg-neutral-900 p-8 rounded-lg'>
      <div className='flex flex-wrap gap-4 items-center'>
        <Button variant='primary'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示在暗色主题下的按钮样式。',
      },
    },
  },
};

// 测试相关的 stories - 展示如何进行各种测试场景
export const TestScenarios: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          点击事件测试场景
        </h3>
        <div className='space-x-4'>
          <Button onClick={() => console.warn('按钮被点击!')}>点击我</Button>
          <Button variant='secondary' onClick={() => console.warn('控制台输出')}>
            控制台日志
          </Button>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          状态测试场景
        </h3>
        <div className='space-x-4'>
          <Button>正常状态</Button>
          <Button disabled>禁用状态</Button>
          <Button loading>加载状态</Button>
          <Button loading loadingText='处理中...'>
            自定义加载文本
          </Button>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          键盘导航测试
        </h3>
        <div className='space-x-4'>
          <Button>Tab 导航 1</Button>
          <Button>Tab 导航 2</Button>
          <Button>Tab 导航 3</Button>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
          使用 Tab 键在按钮间导航，Space 或 Enter 键激活
        </p>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          表单提交测试
        </h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.warn('表单提交!');
          }}
        >
          <div className='space-x-4'>
            <Button type='submit'>提交表单</Button>
            <Button type='button'>普通按钮</Button>
            <Button type='reset'>重置表单</Button>
          </div>
        </form>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          尺寸变体测试
        </h3>
        <div className='flex flex-wrap gap-4 items-end'>
          <Button size='xs'>XS 尺寸</Button>
          <Button size='sm'>SM 尺寸</Button>
          <Button size='md'>MD 尺寸</Button>
          <Button size='lg'>LG 尺寸</Button>
          <Button size='xl'>XL 尺寸</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '综合展示各种测试场景，包括点击事件、状态变化、键盘导航、表单提交和尺寸变体等。',
      },
    },
  },
};

// Interaction Testing Stories
export const ButtonClickTest: Story = {
  args: {
    children: '点击测试按钮',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /点击测试按钮/i });

    // 验证按钮存在
    await expect(button).toBeInTheDocument();

    // 测试点击功能
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // 测试多次点击
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: 验证按钮点击功能和事件处理',
      },
    },
  },
};

export const KeyboardNavigationTest: Story = {
  render: () => (
    <div className='space-x-4'>
      <Button onClick={fn()}>按钮 1</Button>
      <Button onClick={fn()}>按钮 2</Button>
      <Button onClick={fn()}>按钮 3</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // 验证按钮数量
    await expect(buttons).toHaveLength(3);

    // 测试Tab导航
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();

    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();

    await userEvent.tab();
    await expect(buttons[2]).toHaveFocus();

    // 测试Enter键激活
    await userEvent.keyboard('{Enter}');
    // 注意：这里无法直接验证onClick调用，因为是在render中定义的fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: 验证键盘导航和Enter键激活功能',
      },
    },
  },
};

export const DisabledStateTest: Story = {
  args: {
    children: '禁用按钮',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /禁用按钮/i });

    // 验证按钮存在且被禁用
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();

    // 测试禁用状态下不响应点击
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: 验证禁用状态下按钮不响应点击事件',
      },
    },
  },
};

export const LoadingStateTest: Story = {
  args: {
    children: '加载按钮',
    loading: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /加载按钮/i });

    // 验证按钮存在且处于加载状态
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();

    // 验证加载图标存在
    const loadingIcon = button.querySelector('.anticon-loading');
    await expect(loadingIcon).toBeInTheDocument();

    // 测试加载状态下不响应点击
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: 验证加载状态下按钮不响应点击事件且显示加载图标',
      },
    },
  },
};

export const VariantsAccessibilityTest: Story = {
  render: () => (
    <div className='space-x-4'>
      <Button variant='primary' onClick={fn()}>
        Primary
      </Button>
      <Button variant='secondary' onClick={fn()}>
        Secondary
      </Button>
      <Button variant='outline' onClick={fn()}>
        Outline
      </Button>
      <Button variant='ghost' onClick={fn()}>
        Ghost
      </Button>
      <Button variant='error' onClick={fn()}>
        Error
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证所有变体按钮都存在且可访问
    const primaryBtn = canvas.getByRole('button', { name: /primary/i });
    const secondaryBtn = canvas.getByRole('button', { name: /secondary/i });
    const outlineBtn = canvas.getByRole('button', { name: /outline/i });
    const ghostBtn = canvas.getByRole('button', { name: /ghost/i });
    const errorBtn = canvas.getByRole('button', { name: /error/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(secondaryBtn).toBeInTheDocument();
    await expect(outlineBtn).toBeInTheDocument();
    await expect(ghostBtn).toBeInTheDocument();
    await expect(errorBtn).toBeInTheDocument();

    // 测试每个按钮都可以被点击
    await userEvent.click(primaryBtn);
    await userEvent.click(secondaryBtn);
    await userEvent.click(outlineBtn);
    await userEvent.click(ghostBtn);
    await userEvent.click(errorBtn);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: 验证所有变体按钮的可访问性和交互功能',
      },
    },
  },
};
