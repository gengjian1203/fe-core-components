import { CXThemeProvider } from '@/components/Base/CXThemeProvider';
import { CXThemeToggle } from '@/components/Base/CXThemeToggle';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';

const meta: Meta<typeof CXThemeToggle> = {
  title: 'Base/CXThemeToggle',
  component: CXThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CXThemeToggle 是一个主题切换按钮组件，用于在亮色和暗色主题之间切换。

## 特性

- 🌓 一键切换亮色/暗色主题
- 💡 自动显示当前主题状态
- 🔧 多种样式变体
- 📏 支持多种尺寸
- ♿ 完善的无障碍支持
- 🎯 支持工具提示

## 使用方法

\`\`\`tsx
import { CXThemeProvider, CXThemeToggle } from '@gengjian1203/fe-core-components';

function App() {
  return (
    <CXThemeProvider>
      <CXThemeToggle size="middle" variant="default" />
    </CXThemeProvider>
  );
}
\`\`\`

**注意：** CXThemeToggle 必须在 CXThemeProvider 内使用。
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <CXThemeProvider>
        <Story />
      </CXThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'middle', 'large'],
      description: '按钮尺寸',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'text', 'primary', 'link'],
      description: '按钮样式变体',
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: '是否显示工具提示',
    },
    lightTooltip: {
      control: { type: 'text' },
      description: '亮色模式工具提示文本',
    },
    darkTooltip: {
      control: { type: 'text' },
      description: '暗色模式工具提示文本',
    },
  },
  args: {
    size: 'middle',
    variant: 'default',
    showTooltip: true,
    lightTooltip: '切换到亮色模式',
    darkTooltip: '切换到暗色模式',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Space>
      <CXThemeToggle size='small' />
      <CXThemeToggle size='middle' />
      <CXThemeToggle size='large' />
    </Space>
  ),
};

export const Variants: Story = {
  render: () => (
    <Space>
      <CXThemeToggle variant='default' />
      <CXThemeToggle variant='primary' />
      <CXThemeToggle variant='text' />
      <CXThemeToggle variant='link' />
    </Space>
  ),
};

export const WithoutTooltip: Story = {
  args: {
    showTooltip: false,
  },
};

export const CustomTooltips: Story = {
  args: {
    lightTooltip: '亮色主题',
    darkTooltip: '暗色主题',
  },
};
