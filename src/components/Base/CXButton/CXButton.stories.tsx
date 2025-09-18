import { CXButton } from '@/components/Base/CXButton';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

// Simple icon components to replace Ant Design icons
const PlusIcon = () => <span>+</span>;
const DownloadIcon = () => <span>↓</span>;
const SearchIcon = () => <span>🔍</span>;

const meta: Meta<typeof CXButton> = {
  title: 'Base/CXButton',
  component: CXButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CXButton 是自定义实现的按钮组件，提供了丰富的样式变体、尺寸选项、图标支持和加载状态。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'default',
        'dashed',
        'link',
        'danger',
        'destructive',
        'outline',
        'secondary',
        'ghost',
      ],
      description: '按钮的视觉样式变体',
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
      description: '按钮的形状',
    },
    block: {
      control: 'boolean',
      description: '将按钮宽度调整为其父宽度的选项',
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
};

export const Variants: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 flex-wrap'>
        <CXButton {...args} variant='primary'>
          Primary
        </CXButton>
        <CXButton {...args} variant='default'>
          Default
        </CXButton>
        <CXButton {...args} variant='dashed'>
          Dashed
        </CXButton>
        <CXButton {...args} variant='link'>
          Link
        </CXButton>
        <CXButton {...args} variant='danger'>
          Danger
        </CXButton>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <CXButton {...args} variant='destructive'>
          Destructive
        </CXButton>
        <CXButton {...args} variant='outline'>
          Outline
        </CXButton>
        <CXButton {...args} variant='secondary'>
          Secondary
        </CXButton>
        <CXButton {...args} variant='ghost'>
          Ghost
        </CXButton>
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证所有变体按钮存在
    const primaryBtn = canvas.getByRole('button', { name: /Primary/i });
    const defaultBtn = canvas.getByRole('button', { name: /Default/i });
    const dashedBtn = canvas.getByRole('button', { name: /Dashed/i });
    const linkBtn = canvas.getByRole('button', { name: /Link/i });
    const dangerBtn = canvas.getByRole('button', { name: /Danger/i });
    const destructiveBtn = canvas.getByRole('button', { name: /Destructive/i });
    const outlineBtn = canvas.getByRole('button', { name: /Outline/i });
    const secondaryBtn = canvas.getByRole('button', { name: /Secondary/i });
    const ghostBtn = canvas.getByRole('button', { name: /Ghost/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(defaultBtn).toBeInTheDocument();
    await expect(dashedBtn).toBeInTheDocument();
    await expect(linkBtn).toBeInTheDocument();
    await expect(dangerBtn).toBeInTheDocument();
    await expect(destructiveBtn).toBeInTheDocument();
    await expect(outlineBtn).toBeInTheDocument();
    await expect(secondaryBtn).toBeInTheDocument();
    await expect(ghostBtn).toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: args => (
    <div className='flex gap-4 items-center'>
      <CXButton {...args} size='small'>
        Small
      </CXButton>
      <CXButton {...args} size='medium'>
        Medium
      </CXButton>
      <CXButton {...args} size='large'>
        Large
      </CXButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同尺寸的按钮。',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证不同尺寸按钮存在
    const smallBtn = canvas.getByRole('button', { name: /Small/i });
    const mediumBtn = canvas.getByRole('button', { name: /Medium/i });
    const largeBtn = canvas.getByRole('button', { name: /Large/i });

    await expect(smallBtn).toBeInTheDocument();
    await expect(mediumBtn).toBeInTheDocument();
    await expect(largeBtn).toBeInTheDocument();

    // 验证自定义尺寸样式类
    await expect(smallBtn).toHaveClass('h-6', 'text-sm');
    await expect(mediumBtn).toHaveClass('h-8', 'text-sm');
    await expect(largeBtn).toHaveClass('h-10', 'text-base');
  },
};

export const WithIcons: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <CXButton {...args} leftIcon={<PlusIcon />}>
          添加
        </CXButton>
        <CXButton {...args} rightIcon={<DownloadIcon />}>
          下载
        </CXButton>
        <CXButton {...args} leftIcon={<SearchIcon />} rightIcon={<DownloadIcon />}>
          搜索并下载
        </CXButton>
      </div>
      <div className='flex gap-4'>
        <CXButton {...args} leftIcon={<PlusIcon />} variant='dashed'>
          添加项目
        </CXButton>
        <CXButton {...args} rightIcon={<DownloadIcon />} variant='link'>
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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

    // 验证图标存在（简单的文本图标）
    const plusIcon = addBtn?.textContent?.includes('+');
    const downloadIcon = downloadBtn?.textContent?.includes('↓');

    await expect(plusIcon).toBe(true);
    await expect(downloadIcon).toBe(true);

    // 验证按钮包含图标容器
    const leftIconSpan = addBtn?.querySelector('.flex-shrink-0');
    const rightIconSpan = downloadBtn?.querySelector('.flex-shrink-0');

    await expect(leftIconSpan).toBeInTheDocument();
    await expect(rightIconSpan).toBeInTheDocument();
  },
};

export const LoadingStates: Story = {
  render: args => (
    <div className='flex gap-4'>
      <CXButton {...args} loading>
        Loading
      </CXButton>
      <CXButton {...args} loading loadingText='处理中...'>
        处理数据
      </CXButton>
      <CXButton {...args} loading variant='dashed'>
        Loading Dashed
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 获取所有加载状态的按钮
    const buttons = canvas.getAllByRole('button');

    for (const button of buttons) {
      // 验证按钮处于加载状态时是禁用的
      await expect(button).toBeDisabled();

      // 验证自定义加载动画存在（检查旋转动画类）
      const spinner = button.querySelector('.animate-spin');
      await expect(spinner).toBeInTheDocument();

      // 验证spinner的样式
      await expect(spinner).toHaveClass(
        'rounded-full',
        'border-2',
        'border-current',
        'border-t-transparent'
      );
    }

    // 验证自定义加载文本
    const customLoadingBtn = canvas.getByText(/处理中/i);
    await expect(customLoadingBtn).toBeInTheDocument();

    // 验证加载状态按钮具有pointer-events-none样式
    const loadingBtn = canvas.getByRole('button', { name: /^Loading$/ });
    await expect(loadingBtn).toHaveClass('pointer-events-none');
  },
};

export const DisabledStates: Story = {
  render: args => (
    <div className='flex gap-4'>
      <CXButton {...args} disabled>
        Disabled
      </CXButton>
      <CXButton {...args} disabled variant='dashed'>
        Disabled Dashed
      </CXButton>
      <CXButton {...args} disabled variant='link'>
        Disabled Link
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 获取所有禁用状态的按钮
    const buttons = canvas.getAllByRole('button');

    // 验证所有按钮都被禁用
    for (const button of buttons) {
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('aria-disabled', 'true');
    }

    // 验证特定按钮存在
    const disabledBtn = canvas.getByRole('button', { name: /^Disabled$/ });
    const disabledDashedBtn = canvas.getByRole('button', { name: /Disabled Dashed/ });
    const disabledLinkBtn = canvas.getByRole('button', { name: /Disabled Link/ });

    await expect(disabledBtn).toBeInTheDocument();
    await expect(disabledDashedBtn).toBeInTheDocument();
    await expect(disabledLinkBtn).toBeInTheDocument();
  },
};

export const Shapes: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 items-center'>
        <CXButton {...args} shape='default'>
          Default
        </CXButton>
        <CXButton {...args} shape='round'>
          Round
        </CXButton>
        <CXButton {...args} leftIcon={<PlusIcon />} shape='circle' />
        <CXButton {...args} leftIcon={<SearchIcon />} shape='circle' variant='primary' />
      </div>
      <div className='flex gap-4 items-center'>
        <CXButton {...args} shape='round' variant='dashed'>
          Round Dashed
        </CXButton>
        <CXButton {...args} leftIcon={<DownloadIcon />} shape='circle' variant='link' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同形状的按钮，包括默认、圆角和圆形。',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证文本按钮存在
    const defaultBtn = canvas.getByRole('button', { name: /Default/ });
    const roundBtn = canvas.getByRole('button', { name: /Round$/ });
    const roundDashedBtn = canvas.getByRole('button', { name: /Round Dashed/ });

    await expect(defaultBtn).toBeInTheDocument();
    await expect(roundBtn).toBeInTheDocument();
    await expect(roundDashedBtn).toBeInTheDocument();

    // 验证形状相关的CSS类
    await expect(defaultBtn).toHaveClass('rounded-md'); // default shape
    await expect(roundBtn).toHaveClass('rounded-full'); // round shape
    await expect(roundDashedBtn).toHaveClass('rounded-full'); // round shape

    // 验证圆形按钮（通过按钮内容验证）
    const circleButtons = canvasElement.querySelectorAll('button');
    const buttonsWithIcons = Array.from(circleButtons).filter(
      btn =>
        btn.textContent?.includes('+') ||
        btn.textContent?.includes('🔍') ||
        btn.textContent?.includes('↓')
    );
    await expect(buttonsWithIcons.length).toBeGreaterThanOrEqual(3); // 至少3个图标按钮
  },
};

export const Block: Story = {
  render: args => (
    <div className='flex flex-col gap-4' style={{ width: '300px' }}>
      <CXButton {...args} block>
        Block Button
      </CXButton>
      <CXButton {...args} block variant='primary'>
        Block Primary
      </CXButton>
      <CXButton {...args} block variant='dashed'>
        Block Dashed
      </CXButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '块级按钮，宽度填充父容器。',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 获取所有块级按钮
    const blockBtn = canvas.getByRole('button', { name: /Block Button/ });
    const blockPrimaryBtn = canvas.getByRole('button', { name: /Block Primary/ });
    const blockDashedBtn = canvas.getByRole('button', { name: /Block Dashed/ });

    await expect(blockBtn).toBeInTheDocument();
    await expect(blockPrimaryBtn).toBeInTheDocument();
    await expect(blockDashedBtn).toBeInTheDocument();

    // 验证块级按钮具有全宽样式
    await expect(blockBtn).toHaveClass('w-full');
    await expect(blockPrimaryBtn).toHaveClass('w-full');
    await expect(blockDashedBtn).toHaveClass('w-full');

    // 验证按钮宽度接近父容器宽度（300px）
    const blockBtnRect = blockBtn.getBoundingClientRect();
    const containerRect = canvasElement.getBoundingClientRect();

    // 验证按钮宽度大于容器宽度的80%（考虑边距和填充）
    await expect(blockBtnRect.width).toBeGreaterThan(containerRect.width * 0.8);
  },
};
