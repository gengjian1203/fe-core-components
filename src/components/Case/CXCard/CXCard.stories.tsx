import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CXButton } from '../../Base/CXButton';
import { CXCard } from './CXCard';

const meta: Meta<typeof CXCard> = {
  title: 'Case/CXCard',
  component: CXCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CXCard 是基于 Ant Design Card 组件的二次封装，提供了更多的定制化选项和扩展功能，特别适合展示复杂的业务数据。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'shadow', 'minimal'],
      description: '卡片的视觉样式变体',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: '卡片的状态，会显示对应的左侧边框颜色',
    },
    loading: {
      control: 'boolean',
      description: '显示加载状态',
    },
    clickable: {
      control: 'boolean',
      description: '是否可点击',
    },
    children: {
      control: 'text',
      description: '卡片内容',
    },
  },
  args: {
    onCardClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '默认卡片',
    children: '这是一个默认样式的卡片内容。',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');

    // 验证卡片存在
    await expect(card).toBeInTheDocument();

    // 验证卡片标题
    const title = canvas.getByText('默认卡片');
    await expect(title).toBeInTheDocument();

    // 验证卡片内容
    const content = canvas.getByText('这是一个默认样式的卡片内容。');
    await expect(content).toBeInTheDocument();
  },
};

export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard title='默认样式' variant='default'>
        默认样式的卡片，使用 Ant Design 的默认外观。
      </CXCard>
      <CXCard title='边框样式' variant='bordered'>
        加粗边框样式的卡片，更突出的视觉效果。
      </CXCard>
      <CXCard title='阴影样式' variant='shadow'>
        带有阴影效果的卡片，悬停时阴影会加深。
      </CXCard>
      <CXCard title='最小样式' variant='minimal'>
        极简样式的卡片，去掉边框和阴影。
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '不同的卡片变体样式展示。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证所有变体卡片存在
    const defaultCard = canvas.getByText('默认样式');
    const borderedCard = canvas.getByText('边框样式');
    const shadowCard = canvas.getByText('阴影样式');
    const minimalCard = canvas.getByText('最小样式');

    await expect(defaultCard).toBeInTheDocument();
    await expect(borderedCard).toBeInTheDocument();
    await expect(shadowCard).toBeInTheDocument();
    await expect(minimalCard).toBeInTheDocument();

    // 验证卡片内容
    await expect(
      canvas.getByText('默认样式的卡片，使用 Ant Design 的默认外观。')
    ).toBeInTheDocument();
    await expect(canvas.getByText('加粗边框样式的卡片，更突出的视觉效果。')).toBeInTheDocument();
  },
};

export const StatusStates: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl'>
      <CXCard status='default' title='默认状态'>
        默认状态的卡片。
      </CXCard>
      <CXCard status='success' title='成功状态'>
        成功状态的卡片，显示绿色左边框。
      </CXCard>
      <CXCard status='warning' title='警告状态'>
        警告状态的卡片，显示黄色左边框。
      </CXCard>
      <CXCard status='error' title='错误状态'>
        错误状态的卡片，显示红色左边框。
      </CXCard>
      <CXCard status='info' title='信息状态'>
        信息状态的卡片，显示蓝色左边框。
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '不同状态的卡片，通过左侧边框颜色区分状态。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证所有状态的卡片存在
    const defaultCard = canvas.getByText('默认状态');
    const successCard = canvas.getByText('成功状态');
    const warningCard = canvas.getByText('警告状态');
    const errorCard = canvas.getByText('错误状态');
    const infoCard = canvas.getByText('信息状态');

    await expect(defaultCard).toBeInTheDocument();
    await expect(successCard).toBeInTheDocument();
    await expect(warningCard).toBeInTheDocument();
    await expect(errorCard).toBeInTheDocument();
    await expect(infoCard).toBeInTheDocument();

    // 验证状态边框样式
    const successCardElement = successCard.closest('[role="article"]');
    const errorCardElement = errorCard.closest('[role="article"]');

    await expect(successCardElement).toHaveClass('border-l-green-500');
    await expect(errorCardElement).toHaveClass('border-l-red-500');
  },
};

export const WithHeaderElements: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard headerIcon={<FileTextOutlined />} title='带图标标题' variant='bordered'>
        这是一个带有图标的卡片标题。
      </CXCard>
      <CXCard
        headerActions={
          <div className='flex gap-2'>
            <CXButton leftIcon={<EditOutlined />} size='small' variant='ghost'>
              编辑
            </CXButton>
            <CXButton leftIcon={<DeleteOutlined />} size='small' variant='ghost'>
              删除
            </CXButton>
          </div>
        }
        title='带操作按钮'
        variant='shadow'
      >
        这是一个带有操作按钮的卡片。
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '带有标题图标和操作按钮的卡片示例。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    const iconCard = canvas.getByText('带图标标题');
    const actionCard = canvas.getByText('带操作按钮');

    await expect(iconCard).toBeInTheDocument();
    await expect(actionCard).toBeInTheDocument();

    // 验证标题图标存在
    const fileIcon = canvas.getByRole('img', { hidden: true });
    await expect(fileIcon).toBeInTheDocument();

    // 验证操作按钮存在并可以点击
    const editBtn = canvas.getByRole('button', { name: /编辑/i });
    const deleteBtn = canvas.getByRole('button', { name: /删除/i });

    await expect(editBtn).toBeInTheDocument();
    await expect(deleteBtn).toBeInTheDocument();

    // 测试按钮交互
    await userEvent.click(editBtn);
    await userEvent.click(deleteBtn);
  },
};

export const WithAvatar: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard
        avatar={{
          text: 'JD',
          size: 'large',
        }}
        title='用户信息'
        variant='bordered'
      >
        <p>
          <strong>John Doe</strong>
        </p>
        <p>前端开发工程师</p>
        <p>专注于 React 和 TypeScript 开发</p>
      </CXCard>
      <CXCard
        avatar={{
          icon: <SettingOutlined />,
          size: 'default',
        }}
        status='info'
        title='系统通知'
      >
        <p>系统将于明天凌晨 2:00 进行维护。</p>
        <p>预计维护时间：2小时</p>
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '带有头像或图标的卡片示例。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    const userCard = canvas.getByText('用户信息');
    const notificationCard = canvas.getByText('系统通知');

    await expect(userCard).toBeInTheDocument();
    await expect(notificationCard).toBeInTheDocument();

    // 验证用户信息内容
    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
    await expect(canvas.getByText('前端开发工程师')).toBeInTheDocument();

    // 验证系统通知内容
    await expect(canvas.getByText(/系统将于明天凌晨/)).toBeInTheDocument();

    // 验证头像文本
    await expect(canvas.getByText('JD')).toBeInTheDocument();
  },
};

export const WithTags: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard
        headerIcon={<FileTextOutlined />}
        tags={[
          { text: 'React', color: 'blue' },
          { text: 'TypeScript', color: 'green' },
          { text: '进行中', color: 'orange' },
        ]}
        title='项目信息'
        variant='shadow'
      >
        <p>这是一个使用 React 和 TypeScript 开发的前端项目。</p>
        <p>当前状态：开发阶段</p>
      </CXCard>
      <CXCard
        status='warning'
        tags={[
          { text: '高优先级', color: 'red', variant: 'outlined' },
          { text: '前端', color: 'blue', variant: 'outlined' },
          { text: '待处理', color: 'orange', variant: 'outlined' },
        ]}
        title='任务详情'
      >
        <p>紧急：修复用户登录问题</p>
        <p>预计完成时间：今天下午</p>
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '带有标签的卡片，支持实心和空心两种标签样式。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    await expect(canvas.getByText('项目信息')).toBeInTheDocument();
    await expect(canvas.getByText('任务详情')).toBeInTheDocument();

    // 验证标签存在
    await expect(canvas.getByText('React')).toBeInTheDocument();
    await expect(canvas.getByText('TypeScript')).toBeInTheDocument();
    await expect(canvas.getByText('进行中')).toBeInTheDocument();
    await expect(canvas.getByText('高优先级')).toBeInTheDocument();
    await expect(canvas.getByText('前端')).toBeInTheDocument();
    await expect(canvas.getByText('待处理')).toBeInTheDocument();

    // 验证标签样式
    const reactTag = canvas.getByText('React');
    const typescriptTag = canvas.getByText('TypeScript');

    await expect(reactTag.closest('.ant-tag')).toHaveClass('ant-tag-blue');
    await expect(typescriptTag.closest('.ant-tag')).toHaveClass('ant-tag-green');
  },
};

export const WithMetadata: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard
        headerIcon={<FileTextOutlined />}
        metadata={[
          { label: '订单号', value: 'ORD-2024-001' },
          { label: '创建时间', value: '2024-01-15 14:30' },
          { label: '状态', value: '已完成' },
          { label: '金额', value: '¥299.00' },
        ]}
        status='success'
        title='订单详情'
        variant='bordered'
      >
        <p>感谢您的购买！订单已成功完成。</p>
      </CXCard>
      <CXCard
        avatar={{
          icon: <UserOutlined />,
          size: 'large',
        }}
        metadata={[
          { label: '总用户数', value: '1,234' },
          { label: '活跃用户', value: '856' },
          { label: '新增用户', value: '45' },
        ]}
        title='用户统计'
        variant='shadow'
      >
        <p>本月用户增长情况良好。</p>
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '带有元数据信息的卡片，适合展示结构化数据。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    await expect(canvas.getByText('订单详情')).toBeInTheDocument();
    await expect(canvas.getByText('用户统计')).toBeInTheDocument();

    // 验证元数据信息存在
    await expect(canvas.getByText('订单号')).toBeInTheDocument();
    await expect(canvas.getByText('ORD-2024-001')).toBeInTheDocument();
    await expect(canvas.getByText('金额')).toBeInTheDocument();
    await expect(canvas.getByText('¥299.00')).toBeInTheDocument();

    await expect(canvas.getByText('总用户数')).toBeInTheDocument();
    await expect(canvas.getByText('1,234')).toBeInTheDocument();
    await expect(canvas.getByText('活跃用户')).toBeInTheDocument();
    await expect(canvas.getByText('856')).toBeInTheDocument();

    // 验证卡片内容
    await expect(canvas.getByText(/感谢您的购买/)).toBeInTheDocument();
    await expect(canvas.getByText(/用户增长情况良好/)).toBeInTheDocument();
  },
};

export const WithCover: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard
        cover='https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'
        metadata={[
          { label: '作者', value: 'John Doe' },
          { label: '发布时间', value: '2024-01-15' },
        ]}
        tags={[
          { text: '技术', color: 'blue' },
          { text: '前端', color: 'green' },
        ]}
        title='文章预览'
      >
        <p>这是一篇关于前端开发的技术文章，介绍了最新的开发实践和技术趋势。</p>
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '带有封面图片的卡片示例。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    await expect(canvas.getByText('文章预览')).toBeInTheDocument();

    // 验证封面图片存在
    const coverImage = canvas.getByRole('img');
    await expect(coverImage).toBeInTheDocument();
    await expect(coverImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'));

    // 验证元数据信息存在
    await expect(canvas.getByText('作者')).toBeInTheDocument();
    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
    await expect(canvas.getByText('发布时间')).toBeInTheDocument();
    await expect(canvas.getByText('2024-01-15')).toBeInTheDocument();

    // 验证标签存在
    await expect(canvas.getByText('技术')).toBeInTheDocument();
    await expect(canvas.getByText('前端')).toBeInTheDocument();

    // 验证文章内容
    await expect(canvas.getByText(/这是一篇关于前端开发/)).toBeInTheDocument();
  },
};

export const WithFooter: Story = {
  render: () => (
    <CXCard
      className='w-full max-w-md'
      footer={
        <div className='flex justify-between items-center'>
          <span className='text-gray-500'>最后更新：2小时前</span>
          <div className='flex gap-2'>
            <CXButton size='small' variant='outline'>
              查看详情
            </CXButton>
            <CXButton size='small' variant='primary'>
              编辑任务
            </CXButton>
          </div>
        </div>
      }
      headerIcon={<CalendarOutlined />}
      metadata={[
        { label: '截止时间', value: '2024-01-20' },
        { label: '负责人', value: 'Alice Wang' },
      ]}
      title='任务管理'
      variant='bordered'
    >
      <p>完成用户界面设计和原型制作。</p>
      <p>当前进度：80%</p>
    </CXCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '带有页脚操作区域的卡片示例。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题存在
    await expect(canvas.getByText('任务管理')).toBeInTheDocument();

    // 验证元数据信息存在
    await expect(canvas.getByText('截止时间')).toBeInTheDocument();
    await expect(canvas.getByText('2024-01-20')).toBeInTheDocument();
    await expect(canvas.getByText('负责人')).toBeInTheDocument();
    await expect(canvas.getByText('Alice Wang')).toBeInTheDocument();

    // 验证卡片内容
    await expect(canvas.getByText(/完成用户界面设计/)).toBeInTheDocument();
    await expect(canvas.getByText(/当前进度：80%/)).toBeInTheDocument();

    // 验证页脚操作按钮存在并可点击
    const detailBtn = canvas.getByRole('button', { name: /查看详情/i });
    const editBtn = canvas.getByRole('button', { name: /编辑任务/i });

    await expect(detailBtn).toBeInTheDocument();
    await expect(editBtn).toBeInTheDocument();

    // 测试按钮交互
    await userEvent.click(detailBtn);
    await userEvent.click(editBtn);

    // 验证更新时间信息
    await expect(canvas.getByText(/最后更新：2小时前/)).toBeInTheDocument();
  },
};

export const ClickableCard: Story = {
  args: {
    title: '可点击卡片',
    children: '这是一个可点击的卡片，点击后会触发回调。',
    clickable: true,
    variant: 'shadow',
    onCardClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '可点击的卡片，会显示手型光标和悬停效果。',
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');

    // 验证卡片存在
    await expect(card).toBeInTheDocument();

    // 验证卡片有可点击的样式
    await expect(card).toHaveClass('cursor-pointer');

    // 点击卡片
    await userEvent.click(card);

    // 验证回调函数被调用
    await expect(args.onCardClick).toHaveBeenCalled();
    await expect(args.onCardClick).toHaveBeenCalledTimes(1);
  },
};

export const LoadingState: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      <CXCard loading title='加载中' variant='bordered'>
        内容正在加载中...
      </CXCard>
      <CXCard loading variant='shadow'>
        这个卡片处于完全加载状态...
      </CXCard>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '加载状态的卡片示例。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cards = canvas.getAllByRole('article');

    // 验证卡片存在
    await expect(cards[0]).toBeInTheDocument();
    await expect(cards[1]).toBeInTheDocument();

    // 验证加载状态
    // 在 Ant Design Card 的加载状态下，会显示骷髅屏
    for (const card of cards) {
      const loadingElements = card.querySelectorAll('.ant-skeleton');
      await expect(loadingElements.length).toBeGreaterThan(0);
    }
  },
};

export const Complex: Story = {
  render: () => (
    <CXCard
      avatar={{
        text: 'PJ',
        size: 'large',
      }}
      className='w-full max-w-lg'
      footer={
        <div className='flex justify-between items-center'>
          <span className='text-gray-500'>团队：前端开发组</span>
          <div className='flex gap-2'>
            <CXButton size='small' variant='outline'>
              查看详情
            </CXButton>
            <CXButton size='small' variant='primary'>
              更新状态
            </CXButton>
          </div>
        </div>
      }
      headerActions={
        <CXButton leftIcon={<SettingOutlined />} size='small' variant='ghost'>
          设置
        </CXButton>
      }
      headerIcon={<FileTextOutlined />}
      metadata={[
        { label: '项目编号', value: 'PRJ-2024-001' },
        { label: '开始时间', value: '2024-01-01' },
        { label: '预计完成', value: '2024-03-01' },
        { label: '完成度', value: '65%' },
      ]}
      status='info'
      tags={[
        { text: '重要', color: 'red' },
        { text: '项目', color: 'blue' },
        { text: '进行中', color: 'green' },
      ]}
      title='复合示例'
      variant='shadow'
    >
      <div className='space-y-3'>
        <p>
          <strong>电商平台前端重构项目</strong>
        </p>
        <p>使用 React 18 和 TypeScript 重构现有电商平台的前端界面，提升用户体验和系统性能。</p>
        <div className='bg-gray-50 p-3 rounded'>
          <h4 className='font-medium mb-2'>最新进展:</h4>
          <ul className='text-sm space-y-1'>
            <li>✓ 完成组件库搭建</li>
            <li>✓ 完成首页重构</li>
            <li>🔄 正在进行商品详情页开发</li>
            <li>⏳ 购物车功能待开发</li>
          </ul>
        </div>
      </div>
    </CXCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '复合功能展示，包含所有可用的卡片功能。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 验证卡片标题和内容
    await expect(canvas.getByText('复合示例')).toBeInTheDocument();
    await expect(canvas.getByText('电商平台前端重构项目')).toBeInTheDocument();

    // 验证头像文本
    await expect(canvas.getByText('PJ')).toBeInTheDocument();

    // 验证元数据信息
    await expect(canvas.getByText('项目编号')).toBeInTheDocument();
    await expect(canvas.getByText('PRJ-2024-001')).toBeInTheDocument();
    await expect(canvas.getByText('完成度')).toBeInTheDocument();
    await expect(canvas.getByText('65%')).toBeInTheDocument();

    // 验证标签存在
    await expect(canvas.getByText('重要')).toBeInTheDocument();
    await expect(canvas.getByText('项目')).toBeInTheDocument();
    await expect(canvas.getByText('进行中')).toBeInTheDocument();

    // 验证页眉和页脚按钮存在并可点击
    const settingsBtn = canvas.getByRole('button', { name: /设置/i });
    const detailBtn = canvas.getByRole('button', { name: /查看详情/i });
    const updateBtn = canvas.getByRole('button', { name: /更新状态/i });

    await expect(settingsBtn).toBeInTheDocument();
    await expect(detailBtn).toBeInTheDocument();
    await expect(updateBtn).toBeInTheDocument();

    // 测试按钮交互
    await userEvent.click(settingsBtn);
    await userEvent.click(detailBtn);
    await userEvent.click(updateBtn);

    // 验证进展信息
    await expect(canvas.getByText('最新进展:')).toBeInTheDocument();
    await expect(canvas.getByText('✓ 完成组件库搭建')).toBeInTheDocument();
    await expect(canvas.getByText('🔄 正在进行商品详情页开发')).toBeInTheDocument();
  },
};
