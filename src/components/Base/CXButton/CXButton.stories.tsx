import { CXButton } from '@/components/Base/CXButton';
import { DownloadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';

const meta: Meta<typeof CXButton> = {
  title: 'Base/CXButton',
  component: CXButton,
  parameters: {
    layout: 'centered',
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
      options: ['primary', 'default', 'dashed', 'link', 'danger'],
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
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 flex-wrap'>
        <CXButton variant='primary'>Primary</CXButton>
        <CXButton variant='default'>Default</CXButton>
        <CXButton variant='dashed'>Dashed</CXButton>
        <CXButton variant='link'>Link</CXButton>
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证所有变体按钮存在
    const primaryBtn = canvas.getByRole('button', { name: /Primary/i });
    const defaultBtn = canvas.getByRole('button', { name: /Default/i });
    const dashedBtn = canvas.getByRole('button', { name: /Dashed/i });
    const linkBtn = canvas.getByRole('button', { name: /Link/i });
    const dangerBtn = canvas.getByRole('button', { name: /Danger/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(defaultBtn).toBeInTheDocument();
    await expect(dashedBtn).toBeInTheDocument();
    await expect(linkBtn).toBeInTheDocument();
    await expect(dangerBtn).toBeInTheDocument();
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
        <CXButton leftIcon={<PlusOutlined />} variant='dashed'>
          添加项目
        </CXButton>
        <CXButton rightIcon={<DownloadOutlined />} variant='link'>
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

    // 验证图标存在（Ant Design图标仍然会有anticon类名）
    const plusIcon = addBtn?.querySelector('.anticon-plus');
    const downloadIcon = downloadBtn?.querySelector('.anticon-download');

    await expect(plusIcon).toBeInTheDocument();
    await expect(downloadIcon).toBeInTheDocument();

    // 验证按钮包含图标容器
    const leftIconSpan = addBtn?.querySelector('.flex-shrink-0');
    const rightIconSpan = downloadBtn?.querySelector('.flex-shrink-0');

    await expect(leftIconSpan).toBeInTheDocument();
    await expect(rightIconSpan).toBeInTheDocument();
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className='flex gap-4'>
      <CXButton loading>Loading</CXButton>
      <CXButton loading loadingText='处理中...'>
        处理数据
      </CXButton>
      <CXButton loading variant='dashed'>
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
  render: () => (
    <div className='flex gap-4'>
      <CXButton disabled>Disabled</CXButton>
      <CXButton disabled variant='dashed'>
        Disabled Dashed
      </CXButton>
      <CXButton disabled variant='link'>
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
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 items-center'>
        <CXButton shape='default'>Default</CXButton>
        <CXButton shape='round'>Round</CXButton>
        <CXButton leftIcon={<PlusOutlined />} shape='circle' />
        <CXButton leftIcon={<SearchOutlined />} shape='circle' variant='primary' />
      </div>
      <div className='flex gap-4 items-center'>
        <CXButton shape='round' variant='dashed'>
          Round Dashed
        </CXButton>
        <CXButton leftIcon={<DownloadOutlined />} shape='circle' variant='link' />
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

    // 验证圆形按钮（通过图标验证）
    const circleButtons = canvasElement.querySelectorAll('button .anticon');
    await expect(circleButtons.length).toBeGreaterThanOrEqual(3); // 至少3个图标按钮
  },
};

export const Block: Story = {
  render: () => (
    <div className='flex flex-col gap-4' style={{ width: '300px' }}>
      <CXButton block>Block Button</CXButton>
      <CXButton block variant='primary'>
        Block Primary
      </CXButton>
      <CXButton block variant='dashed'>
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
