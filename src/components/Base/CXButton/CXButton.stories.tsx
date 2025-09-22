import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';
import { CXButton } from '../../Base';

// Simple icon components to replace Ant Design icons
const PlusIcon = () => <span>+</span>;
const DownloadIcon = () => <span>↓</span>;
const SearchIcon = () => <span>🔍</span>;

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
        'text',
      ],
      description: '按钮的视觉样式变体',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
      description: '按钮的形状',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    block: {
      control: 'boolean',
      description: '将按钮宽度调整为其父宽度的选项',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮的尺寸',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    loading: {
      control: 'boolean',
      description: '显示加载状态',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: 'text',
      description: '加载时显示的文本',
      table: {
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '禁用按钮',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '按钮的 HTML type 属性',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    children: {
      control: 'text',
      description: '按钮内容',
      table: {
        defaultValue: { summary: 'Button' },
      },
    },
    classNameChildren: {
      control: 'text',
      description: '应用到按钮内容容器的自定义样式类名',
      table: {
        defaultValue: { summary: '' },
      },
    },
    renderLeftContent: {
      control: 'object',
      description: '按钮左侧显示的图标组件，通常用于增强按钮的语义表达',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    renderRightContent: {
      control: 'object',
      description: '按钮右侧显示的图标组件，常用于下拉箭头、外链图标等场景',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: { type: 'number' },
      description: '自定义按钮宽度，支持数字（转换为px）或字符串（如 "100px", "10rem"）',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '自定义按钮高度，支持数字（转换为px）或字符串（如 "40px", "3rem"）',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'default',
    shape: 'default',
    size: 'medium',
    block: false,
    loading: false,
    loadingText: '',
    disabled: false,
    className: '',
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
        <CXButton {...args} variant='danger'>
          Danger
        </CXButton>
        <CXButton {...args} variant='destructive'>
          Destructive
        </CXButton>
      </div>
      <div className='flex gap-4 flex-wrap'>
        <CXButton {...args} variant='outline'>
          Outline
        </CXButton>
        <CXButton {...args} variant='secondary'>
          Secondary
        </CXButton>
        <CXButton {...args} variant='ghost'>
          Ghost
        </CXButton>
        <CXButton {...args} variant='link'>
          Link
        </CXButton>
        <CXButton {...args} variant='text'>
          Text
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
    const textBtn = canvas.getByRole('button', { name: /Text/i });

    await expect(primaryBtn).toBeInTheDocument();
    await expect(defaultBtn).toBeInTheDocument();
    await expect(dashedBtn).toBeInTheDocument();
    await expect(linkBtn).toBeInTheDocument();
    await expect(dangerBtn).toBeInTheDocument();
    await expect(destructiveBtn).toBeInTheDocument();
    await expect(outlineBtn).toBeInTheDocument();
    await expect(secondaryBtn).toBeInTheDocument();
    await expect(ghostBtn).toBeInTheDocument();
    await expect(textBtn).toBeInTheDocument();
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
        <CXButton {...args} renderLeftContent={() => <PlusIcon />}>
          添加
        </CXButton>
        <CXButton {...args} renderRightContent={() => <DownloadIcon />}>
          下载
        </CXButton>
        <CXButton
          {...args}
          renderLeftContent={() => <SearchIcon />}
          renderRightContent={() => <DownloadIcon />}
        >
          搜索并下载
        </CXButton>
      </div>
      <div className='flex gap-4'>
        <CXButton {...args} renderLeftContent={() => <PlusIcon />} variant='dashed'>
          添加项目
        </CXButton>
        <CXButton {...args} renderRightContent={() => <DownloadIcon />} variant='link'>
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
    const renderLeftContentSpan = addBtn?.querySelector('.shrink-0');
    const renderRightContentSpan = downloadBtn?.querySelector('.shrink-0');

    await expect(renderLeftContentSpan).toBeInTheDocument();
    await expect(renderRightContentSpan).toBeInTheDocument();
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
  render: args => {
    const { children: _children, ...otherArgs } = args;

    return (
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <CXButton {...otherArgs} shape='default'>
            Default
          </CXButton>
          <CXButton {...otherArgs} shape='round'>
            Round
          </CXButton>
          <CXButton {...otherArgs} renderLeftContent={() => <PlusIcon />} shape='circle' />
          <CXButton
            {...otherArgs}
            renderLeftContent={() => <SearchIcon />}
            shape='circle'
            variant='primary'
          />
        </div>
        <div className='flex gap-4 items-center'>
          <CXButton {...otherArgs} shape='round' variant='dashed'>
            Round Dashed
          </CXButton>
          <CXButton
            {...otherArgs}
            renderLeftContent={() => <DownloadIcon />}
            shape='circle'
            variant='link'
          />
        </div>
      </div>
    );
  },
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

export const CustomSize: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 items-center'>
        <CXButton {...args} height={40} width={120}>
          120×40
        </CXButton>
        <CXButton {...args} height={60} variant='primary' width={80}>
          80×60
        </CXButton>
        <CXButton {...args} height={30} variant='dashed' width={200}>
          200×30
        </CXButton>
      </div>
      <div className='flex gap-4 items-center'>
        <CXButton {...args} height='50px' variant='outline' width='150px'>
          150px×50px
        </CXButton>
        <CXButton {...args} height='3rem' variant='secondary' width='10rem'>
          10rem×3rem
        </CXButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '自定义宽度和高度的按钮。支持数字（转换为px）和字符串值。',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证自定义尺寸按钮存在
    const btn120x40 = canvas.getByRole('button', { name: /120×40/ });
    const btn80x60 = canvas.getByRole('button', { name: /80×60/ });
    const btn200x30 = canvas.getByRole('button', { name: /200×30/ });

    await expect(btn120x40).toBeInTheDocument();
    await expect(btn80x60).toBeInTheDocument();
    await expect(btn200x30).toBeInTheDocument();

    // 验证自定义尺寸的style属性
    await expect(btn120x40).toHaveStyle('width: 120px; height: 40px');
    await expect(btn80x60).toHaveStyle('width: 80px; height: 60px');
    await expect(btn200x30).toHaveStyle('width: 200px; height: 30px');

    // 验证字符串尺寸按钮
    const btnPx = canvas.getByRole('button', { name: /150px×50px/ });
    const btnRem = canvas.getByRole('button', { name: /10rem×3rem/ });

    await expect(btnPx).toBeInTheDocument();
    await expect(btnRem).toBeInTheDocument();

    await expect(btnPx).toHaveStyle('width: 150px; height: 50px');
    await expect(btnRem).toHaveStyle('width: 10rem; height: 3rem');
  },
};
