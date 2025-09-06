import { DownloadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CXButton } from './CXButton';

const meta: Meta<typeof CXButton> = {
  title: 'Components/Base/CXButton',
  component: CXButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CXButton 是基于 Ant Design Button 组件的二次封装，提供了更多的定制化选项和扩展功能。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: '按钮的视觉样式变体',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮的尺寸',
    },
    loading: {
      control: 'boolean',
      description: '显示加载状态',
    },
    loadingText: {
      control: 'text',
      description: '加载时显示的文本',
    },
    disabled: {
      control: 'boolean',
      description: '禁用按钮',
    },
    children: {
      control: 'text',
      description: '按钮内容',
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '默认按钮',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /默认按钮/i });

    // 验证按钮存在且可点击
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveClass('ant-btn');
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 flex-wrap'>
        <CXButton variant='primary'>Primary</CXButton>
        <CXButton variant='secondary'>Secondary</CXButton>
        <CXButton variant='outline'>Outline</CXButton>
        <CXButton variant='ghost'>Ghost</CXButton>
        <CXButton variant='danger'>Danger</CXButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同的按钮变体样式。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证所有变体按钮存在
    const primaryBtn = canvas.getByRole('button', { name: /Primary/i });
    const secondaryBtn = canvas.getByRole('button', { name: /Secondary/i });
    const outlineBtn = canvas.getByRole('button', { name: /Outline/i });
    const ghostBtn = canvas.getByRole('button', { name: /Ghost/i });
    const dangerBtn = canvas.getByRole('button', { name: /Danger/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(secondaryBtn).toBeInTheDocument();
    await expect(outlineBtn).toBeInTheDocument();
    await expect(ghostBtn).toBeInTheDocument();
    await expect(dangerBtn).toBeInTheDocument();

    // 验证按钮样式类
    await expect(primaryBtn).toHaveClass('ant-btn-primary');
    await expect(dangerBtn).toHaveClass('ant-btn-dangerous');
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex gap-4 items-center'>
      <CXButton size='small'>Small</CXButton>
      <CXButton size='medium'>Medium</CXButton>
      <CXButton size='large'>Large</CXButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同尺寸的按钮。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证不同尺寸按钮存在
    const smallBtn = canvas.getByRole('button', { name: /Small/i });
    const mediumBtn = canvas.getByRole('button', { name: /Medium/i });
    const largeBtn = canvas.getByRole('button', { name: /Large/i });

    await expect(smallBtn).toBeInTheDocument();
    await expect(mediumBtn).toBeInTheDocument();
    await expect(largeBtn).toBeInTheDocument();

    // 验证尺寸样式类
    await expect(smallBtn).toHaveClass('ant-btn-sm');
    await expect(largeBtn).toHaveClass('ant-btn-lg');
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <CXButton leftIcon={<PlusOutlined />}>添加</CXButton>
        <CXButton rightIcon={<DownloadOutlined />}>下载</CXButton>
        <CXButton leftIcon={<SearchOutlined />} rightIcon={<DownloadOutlined />}>
          搜索并下载
        </CXButton>
      </div>
      <div className='flex gap-4'>
        <CXButton leftIcon={<PlusOutlined />} variant='outline'>
          添加项目
        </CXButton>
        <CXButton rightIcon={<DownloadOutlined />} variant='ghost'>
          导出数据
        </CXButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '带图标的按钮，可以设置左图标、右图标或同时设置。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 获取所有按钮并通过文本内容验证
    const buttons = canvas.getAllByRole('button');

    // 验证至少有5个按钮
    await expect(buttons).toHaveLength(5);

    // 通过文本内容查找特定按钮
    const addBtn = canvas.getByText('添加').closest('button');
    const downloadBtn = canvas.getByText('下载').closest('button');
    const searchDownloadBtn = canvas.getByText('搜索并下载').closest('button');
    const addProjectBtn = canvas.getByText('添加项目').closest('button');
    const exportBtn = canvas.getByText('导出数据').closest('button');

    await expect(addBtn).toBeInTheDocument();
    await expect(downloadBtn).toBeInTheDocument();
    await expect(searchDownloadBtn).toBeInTheDocument();
    await expect(addProjectBtn).toBeInTheDocument();
    await expect(exportBtn).toBeInTheDocument();

    // 验证图标存在
    const plusIcon = addBtn?.querySelector('.anticon-plus');
    const downloadIcon = downloadBtn?.querySelector('.anticon-download');

    await expect(plusIcon).toBeInTheDocument();
    await expect(downloadIcon).toBeInTheDocument();
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className='flex gap-4'>
      <CXButton loading>Loading</CXButton>
      <CXButton loading loadingText='处理中...'>
        处理数据
      </CXButton>
      <CXButton loading variant='outline'>
        Loading Outline
      </CXButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '加载状态的按钮，可以自定义加载时显示的文本。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 获取所有加载状态的按钮
    const buttons = canvas.getAllByRole('button');

    for (const button of buttons) {
      // 验证按钮处于加载状态时是禁用的
      await expect(button).toBeDisabled();

      // 验证加载图标存在
      const loadingIcon = button.querySelector('.anticon-loading');
      await expect(loadingIcon).toBeInTheDocument();
    }

    // 验证自定义加载文本
    const customLoadingBtn = canvas.getByText(/处理中/i);
    await expect(customLoadingBtn).toBeInTheDocument();
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div className='flex gap-4'>
      <CXButton disabled>Disabled</CXButton>
      <CXButton disabled variant='outline'>
        Disabled Outline
      </CXButton>
      <CXButton disabled variant='ghost'>
        Disabled Ghost
      </CXButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '禁用状态的按钮。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证禁用状态的按钮
    const disabledBtn = canvas.getByRole('button', { name: /^Disabled$/i });
    const disabledOutlineBtn = canvas.getByRole('button', { name: /Disabled Outline/i });
    const disabledGhostBtn = canvas.getByRole('button', { name: /Disabled Ghost/i });

    await expect(disabledBtn).toBeInTheDocument();
    await expect(disabledOutlineBtn).toBeInTheDocument();
    await expect(disabledGhostBtn).toBeInTheDocument();

    // 验证所有按钮都被禁用
    await expect(disabledBtn).toBeDisabled();
    await expect(disabledOutlineBtn).toBeDisabled();
    await expect(disabledGhostBtn).toBeDisabled();

    // 尝试点击禁用的按钮，验证不会触发事件
    await userEvent.click(disabledBtn);
    await expect(disabledBtn).toBeDisabled();
  },
};
