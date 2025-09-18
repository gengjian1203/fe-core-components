import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { CXCardPilot } from './CXCardPilot';

const meta: Meta<typeof CXCardPilot> = {
  title: 'Pilot/CXCardPilot',
  component: CXCardPilot,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CXCardPilot 是一个客户信息卡片组件，用于显示客户的基本信息和操作按钮，支持展开摘要内容。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    clientName: {
      control: 'text',
      description: '客户名称，显示在卡片主要位置的用户姓名',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'string' },
      },
    },
    clientEmail: {
      control: 'text',
      description: '客户邮箱地址，用于联系和通信的邮箱信息',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'string' },
      },
    },
    clientNationality: {
      control: 'text',
      description: '客户国籍，表示申请人的国籍或来源国家',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'string' },
      },
    },
    clientVisaType: {
      control: 'text',
      description: '签证类型，表示申请的签证种类和具体类别',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'string' },
      },
    },
    isDisabledBtnDownload: {
      control: 'boolean',
      description: '是否禁用下载按钮，禁用后按钮将无法点击',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isDisabledBtnStart: {
      control: 'boolean',
      description: '是否禁用开始按钮，禁用后按钮将无法点击',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    renderSummaryContent: {
      control: false,
      description: '渲染摘要内容的函数，返回要在摘要区域显示的 React 节点',
      table: {
        type: { summary: '() => React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onBtnDownloadClick: {
      control: false,
      description: '下载按钮点击事件回调函数',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onBtnStartClick: {
      control: false,
      description: '开始按钮点击事件回调函数',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    clientName: 'Ahmed Hassan',
    clientEmail: 'ahmed.hassan@gmail.com',
    clientNationality: 'Iraq',
    clientVisaType: 'Skilled Worker Visa',
    onBtnDownloadClick: fn(),
    onBtnStartClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: '显示客户信息卡片的默认状态，包含客户基本信息和操作按钮。',
      },
    },
  },
  args: {},
  play: async ({ args, canvasElement }: { args: typeof meta.args; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证客户信息显示
    await expect(canvas.getByText('Ahmed Hassan')).toBeInTheDocument();
    await expect(canvas.getByText('ahmed.hassan@gmail.com')).toBeInTheDocument();
    await expect(canvas.getByText('Iraq')).toBeInTheDocument();
    await expect(canvas.getByText('Skilled Worker Visa')).toBeInTheDocument();

    // 验证操作按钮存在
    const downloadBtn = canvas.getByRole('button', { name: /download form/i });
    const startBtn = canvas.getByRole('button', { name: /start auto-fill/i });
    const summaryBtn = canvas.getByRole('button', { name: /summary/i });

    await expect(downloadBtn).toBeInTheDocument();
    await expect(startBtn).toBeInTheDocument();
    await expect(summaryBtn).toBeInTheDocument();

    // 重置 mock 函数的调用计数
    const mockDownloadFn = args?.onBtnDownloadClick as ReturnType<typeof fn>;
    const mockStartFn = args?.onBtnStartClick as ReturnType<typeof fn>;
    mockDownloadFn?.mockClear();
    mockStartFn?.mockClear();

    // 测试按钮交互
    await userEvent.click(downloadBtn);
    await userEvent.click(startBtn);

    // 验证回调函数被调用
    await expect(mockDownloadFn).toHaveBeenCalledTimes(1);
    await expect(mockStartFn).toHaveBeenCalledTimes(1);

    // 测试摘要按钮交互
    await userEvent.click(summaryBtn);
  },
};

export const WithSummaryContent: Story = {
  name: 'With Summary Content',
  parameters: {
    docs: {
      description: {
        story: '展示带有自定义摘要内容的卡片，点击摘要按钮可以展开/收起内容。',
      },
    },
  },
  args: {
    renderSummaryContent: () => (
      <div className='p-4 mt-2'>
        <h4 className='font-semibold text-gray-800 mb-2'>Application Summary</h4>
        <p className='text-gray-600 text-sm mb-2'>
          This client is applying for a Skilled Worker Visa under the points-based immigration
          system.
        </p>
        <ul className='text-gray-600 text-sm space-y-1'>
          <li>• Educational qualification: Master&apos;s degree</li>
          <li>• Work experience: 5+ years in software development</li>
          <li>• English proficiency: IELTS 8.0</li>
          <li>• Job offer: Senior Developer at Tech Company</li>
        </ul>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证摘要按钮存在
    const summaryBtn = canvas.getByRole('button', { name: /summary/i });
    await expect(summaryBtn).toBeInTheDocument();

    // 点击摘要按钮展开内容
    await userEvent.click(summaryBtn);

    // 验证摘要内容显示
    await expect(canvas.getByText('Application Summary')).toBeInTheDocument();
    await expect(canvas.getByText(/points-based immigration system/)).toBeInTheDocument();
    await expect(
      canvas.getByText(/Educational qualification: Master's degree/)
    ).toBeInTheDocument();
    await expect(canvas.getByText(/Work experience: 5+ years/)).toBeInTheDocument();
    await expect(canvas.getByText(/English proficiency: IELTS 8.0/)).toBeInTheDocument();

    // 再次点击收起内容
    await userEvent.click(summaryBtn);
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  parameters: {
    docs: {
      description: {
        story: '测试组件在处理长文本内容时的表现，所有文本都会正确截断。',
      },
    },
  },
  args: {
    clientName: 'Mohammed Abdullah Al-Hassan bin Omar',
    clientEmail: 'mohammed.abdullah.al-hassan@very-long-email-domain.com',
    clientNationality: 'United Arab Emirates',
    clientVisaType: 'Tier 2 (General) Skilled Worker Visa Application',
    renderSummaryContent: () => (
      <div className='p-4 mt-2'>
        <p className='text-gray-800 text-sm'>
          This is a very long summary content that demonstrates how the component handles extensive
          text content. The summary can contain detailed information about the client&apos;s
          application status, requirements, and other important details that need to be displayed in
          an organized manner.
        </p>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证长文本显示但截断
    await expect(canvas.getByText('Mohammed Abdullah Al-Hassan bin Omar')).toBeInTheDocument();
    await expect(
      canvas.getByText('mohammed.abdullah.al-hassan@very-long-email-domain.com')
    ).toBeInTheDocument();
    await expect(canvas.getByText('United Arab Emirates')).toBeInTheDocument();
    await expect(
      canvas.getByText('Tier 2 (General) Skilled Worker Visa Application')
    ).toBeInTheDocument();

    // 验证卡片具有正确的截断样式
    const nameElement = canvas.getByText('Mohammed Abdullah Al-Hassan bin Omar');
    await expect(nameElement).toHaveClass('truncate');
  },
};

export const MinimalData: Story = {
  name: 'Minimal Data',
  parameters: {
    docs: {
      description: {
        story: '显示所有字段都为默认值的状态。',
      },
    },
  },
  args: {
    clientName: '--',
    clientEmail: '--',
    clientNationality: '--',
    clientVisaType: '--',
  },
};

export const DisabledButtons: Story = {
  name: 'Disabled Buttons',
  parameters: {
    docs: {
      description: {
        story: '展示禁用按钮状态的卡片，测试按钮的禁用功能。',
      },
    },
  },
  args: {
    clientName: 'Jane Doe',
    clientEmail: 'jane.doe@email.com',
    clientNationality: 'Canada',
    clientVisaType: 'Student Visa',
    isDisabledBtnDownload: true,
    isDisabledBtnStart: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证禁用的按钮存在且被禁用
    const downloadBtn = canvas.getByRole('button', { name: /download form/i });
    const startBtn = canvas.getByRole('button', { name: /start auto-fill/i });

    await expect(downloadBtn).toBeInTheDocument();
    await expect(startBtn).toBeInTheDocument();
    await expect(downloadBtn).toBeDisabled();
    await expect(startBtn).toBeDisabled();
  },
};

export const DifferentVisaTypes: Story = {
  name: 'Different Visa Types',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '展示不同类型的签证申请案例。',
      },
    },
  },
  render: () => (
    <div className='space-y-4 w-full max-w-4xl'>
      <CXCardPilot
        clientEmail='john.smith@email.com'
        clientName='John Smith'
        clientNationality='United States'
        clientVisaType='Tourist Visa'
        renderSummaryContent={() => (
          <div className='p-3 mt-2'>
            <p className='text-gray-800 text-sm'>Tourist visa application for 30-day vacation.</p>
          </div>
        )}
        onBtnDownloadClick={fn()}
        onBtnStartClick={fn()}
      />
      <CXCardPilot
        clientEmail='maria.garcia@email.com'
        clientName='Maria Garcia'
        clientNationality='Spain'
        clientVisaType='Student Visa'
        renderSummaryContent={() => (
          <div className='p-3 mt-2'>
            <p className='text-gray-800 text-sm'>
              Master&apos;s degree program at University College.
            </p>
          </div>
        )}
        onBtnDownloadClick={fn()}
        onBtnStartClick={fn()}
      />
      <CXCardPilot
        clientEmail='zhang.wei@email.com'
        clientName='Zhang Wei'
        clientNationality='China'
        clientVisaType='Work Visa'
        renderSummaryContent={() => (
          <div className='p-3 mt-2'>
            <p className='text-gray-800 text-sm'>Software engineer position at startup company.</p>
          </div>
        )}
        onBtnDownloadClick={fn()}
        onBtnStartClick={fn()}
      />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 验证所有客户信息存在
    await expect(canvas.getByText('John Smith')).toBeInTheDocument();
    await expect(canvas.getByText('Maria Garcia')).toBeInTheDocument();
    await expect(canvas.getByText('Zhang Wei')).toBeInTheDocument();

    // 验证签证类型显示
    await expect(canvas.getByText('Tourist Visa')).toBeInTheDocument();
    await expect(canvas.getByText('Student Visa')).toBeInTheDocument();
    await expect(canvas.getByText('Work Visa')).toBeInTheDocument();

    // 验证所有按钮都存在且可点击
    const downloadBtns = canvas.getAllByRole('button', { name: /download form/i });
    const startBtns = canvas.getAllByRole('button', { name: /start auto-fill/i });

    await expect(downloadBtns).toHaveLength(3);
    await expect(startBtns).toHaveLength(3);

    // 测试第一组按钮交互
    await userEvent.click(downloadBtns[0] as Element);
    await userEvent.click(startBtns[0] as Element);
  },
};

export const ResponsiveLayout: Story = {
  name: 'Responsive Layout',
  parameters: {
    docs: {
      description: {
        story: '展示组件在不同宽度下的响应式表现。',
      },
    },
  },
  render: args => (
    <div className='space-y-4'>
      <div className='w-96'>
        <h3 className='text-sm font-medium text-gray-600 mb-2'>Medium Width (384px)</h3>
        <CXCardPilot {...args} />
      </div>
      <div className='w-80'>
        <h3 className='text-sm font-medium text-gray-600 mb-2'>Small Width (320px)</h3>
        <CXCardPilot {...args} />
      </div>
      <div className='w-full max-w-2xl'>
        <h3 className='text-sm font-medium text-gray-600 mb-2'>Large Width (768px)</h3>
        <CXCardPilot {...args} />
      </div>
    </div>
  ),
  args: {
    renderSummaryContent: () => (
      <div className='p-3 mt-2'>
        <p className='text-gray-700 text-sm'>Responsive layout demonstration content.</p>
      </div>
    ),
  },
};
