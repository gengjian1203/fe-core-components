import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Molecules/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '卡片组件，用于展示结构化内容。支持标题、描述、封面图片、操作按钮等多种配置。',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled'],
      description: '卡片变体样式',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: '内边距大小',
    },
    clickable: {
      control: { type: 'boolean' },
      description: '是否可点击',
    },
    divider: {
      control: { type: 'boolean' },
      description: '是否显示分隔线',
    },
    title: {
      control: { type: 'text' },
      description: '卡片标题',
    },
    description: {
      control: { type: 'text' },
      description: '卡片描述',
    },
    children: {
      control: { type: 'text' },
      description: '卡片内容',
    },
    coverImage: {
      control: { type: 'text' },
      description: '封面图片URL',
    },
    coverImageAlt: {
      control: { type: 'text' },
      description: '封面图片alt文本',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    title: '卡片标题',
    description: '这是一个基础的卡片组件，展示了标题和描述信息。',
    children: '这里是卡片的主要内容区域，可以包含任何React节点。',
  },
};

// 不同变体
export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <Card description='带有阴影效果的卡片' title='Elevated Card' variant='elevated'>
        这是一个带阴影的卡片，适合用于需要突出显示的内容。
      </Card>

      <Card description='带有边框的卡片' title='Outlined Card' variant='outlined'>
        这是一个带边框的卡片，风格更加简洁。
      </Card>

      <Card description='填充背景的卡片' title='Filled Card' variant='filled'>
        这是一个填充背景的卡片，适合用于次要内容。
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同变体的卡片样式：elevated（阴影）、outlined（边框）、filled（填充）。',
      },
    },
  },
};

// 带封面图片的卡片
export const WithCoverImage: Story = {
  render: () => (
    <div className='max-w-sm'>
      <Card
        coverImage='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
        coverImageAlt='Beautiful landscape'
        description='探索大自然的美丽瞬间'
        primaryAction={{
          label: '查看详情',
          onClick: () => console.warn('View details'),
        }}
        secondaryAction={{
          label: '收藏',
          onClick: () => console.warn('Add to favorites'),
        }}
        title='风景摄影'
      >
        这张照片拍摄于挪威的罗弗敦群岛，展现了北欧自然风光的壮丽景色。
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '带有封面图片和操作按钮的卡片示例。',
      },
    },
  },
};

// 可点击的卡片
export const Clickable: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl'>
      <Card
        clickable
        description='点击这张卡片可以触发操作'
        title='可点击卡片'
        onClick={() => console.warn('卡片被点击了！')}
      >
        这是一个可点击的卡片，鼠标悬停时会有视觉反馈。
      </Card>

      <Card
        clickable
        description='2024年第一季度'
        footer='最后更新：2024-03-15'
        title='项目报告'
        variant='outlined'
        onClick={() => console.warn('Open report')}
      >
        点击查看详细的项目进度报告和数据分析。
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示可点击的卡片，支持鼠标和键盘交互。',
      },
    },
  },
};

// 带操作按钮的卡片
export const WithActions: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <Card
        description='邀请新用户加入团队'
        primaryAction={{
          label: '发送邀请',
          onClick: () => console.warn('Send invitation'),
        }}
        title='用户邀请'
      >
        输入邮箱地址来邀请新成员加入您的团队协作。
      </Card>

      <Card
        description='检测到新的版本更新'
        primaryAction={{
          label: '立即更新',
          onClick: () => console.warn('Update now'),
          loading: false,
        }}
        secondaryAction={{
          label: '稍后提醒',
          onClick: () => console.warn('Remind later'),
        }}
        title='文档更新'
      >
        新版本包含重要的安全更新和功能改进。
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示带有主要和次要操作按钮的卡片。',
      },
    },
  },
};

// 不同内边距大小
export const PaddingSizes: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Card padding='none' title='No Padding' variant='outlined'>
        <div className='p-4 bg-primary-50 dark:bg-primary-900/20'>无内边距的卡片</div>
      </Card>

      <Card padding='sm' title='Small Padding' variant='outlined'>
        小号内边距
      </Card>

      <Card padding='md' title='Medium Padding' variant='outlined'>
        中号内边距（默认）
      </Card>

      <Card padding='lg' title='Large Padding' variant='outlined'>
        大号内边距
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同内边距大小的卡片。',
      },
    },
  },
};

// 复杂卡片示例
export const Complex: Story = {
  render: () => (
    <div className='max-w-md'>
      <Card
        divider
        coverImage='https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop'
        coverImageAlt='Modern office space'
        description='2024年春季新品发布'
        footer='地点：上海国际会展中心'
        header={
          <div className='flex items-center justify-between'>
            <span className='inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800'>
              即将开始
            </span>
            <span className='text-sm text-neutral-500'>3月15日</span>
          </div>
        }
        primaryAction={{
          label: '立即报名',
          onClick: () => console.warn('Register now'),
        }}
        secondaryAction={{
          label: '了解更多',
          onClick: () => console.warn('Learn more'),
        }}
        title='产品发布会'
        variant='elevated'
      >
        <div className='space-y-3'>
          <p>加入我们的春季新品发布会，了解最新的产品功能和技术创新。</p>
          <div className='flex items-center space-x-4 text-sm text-neutral-600'>
            <span>👥 已报名: 286人</span>
            <span>🕒 14:00-17:00</span>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示一个包含所有功能的复杂卡片示例：封面图片、头部、内容、操作按钮、底部信息等。',
      },
    },
  },
};

// 加载状态
export const LoadingState: Story = {
  render: () => (
    <div className='max-w-sm'>
      <Card
        description='正在保存您的更改'
        primaryAction={{
          label: '保存中...',
          onClick: () => console.warn('Saving'),
          loading: true,
        }}
        secondaryAction={{
          label: '取消',
          onClick: () => console.warn('Cancel'),
          disabled: true,
        }}
        title='处理中...'
      >
        请稍候，系统正在处理您的请求。
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示按钮处于加载状态的卡片。',
      },
    },
  },
};

// 交互式卡片（可在Controls面板调整）
export const Interactive: Story = {
  args: {
    title: '交互式卡片',
    description: '在Controls面板中调整属性来预览效果',
    children: '这是卡片的内容区域，可以包含任何内容。',
    variant: 'elevated',
    padding: 'md',
    clickable: false,
    divider: false,
    primaryAction: {
      label: '主要操作',
      onClick: () => console.warn('Primary action'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: '可在Controls面板中调整各种属性来预览卡片效果。',
      },
    },
  },
};
