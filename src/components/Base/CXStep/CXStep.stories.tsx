import type { CXStepItem, CXStepStatus, CXStepsProps } from '@/components';
import { CXIcon, CXSteps } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

const meta: Meta<CXStepsProps> = {
  title: 'Base/CXStep',
  component: CXSteps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible step component that supports horizontal and vertical layouts with different statuses and customizable content. Perfect for wizards, progress indicators, and guided workflows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 0 },
      description: 'Current active step index',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['wait', 'process', 'finish', 'error'],
      description: 'Status of the current step',
      table: {
        type: { summary: 'CXStepStatus' },
        defaultValue: { summary: 'process' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the steps',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default'],
      description: 'Size of the step component',
      table: {
        type: { summary: 'small | default' },
        defaultValue: { summary: 'default' },
      },
    },
    steps: {
      control: { type: 'object' },
      description: 'Array of step configurations',
      table: {
        type: { summary: 'CXStepItem[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<CXStepsProps>;

const basicSteps: CXStepItem[] = [
  {
    title: 'Account Setup',
    description: 'Create your account and verify email',
  },
  {
    title: 'Profile Information',
    description: 'Add your personal details',
  },
  {
    title: 'Payment Method',
    description: 'Configure your payment settings',
  },
  {
    title: 'Confirmation',
    description: 'Review and confirm your setup',
  },
];

export const Default: Story = {
  args: {
    current: 1,
    steps: basicSteps,
  },
};

export const Horizontal: Story = {
  args: {
    current: 2,
    direction: 'horizontal',
    steps: basicSteps,
  },
};

export const Vertical: Story = {
  args: {
    current: 1,
    direction: 'vertical',
    steps: basicSteps,
  },
};

export const SmallSize: Story = {
  args: {
    current: 1,
    size: 'small',
    steps: basicSteps,
  },
};

export const WithIcons: Story = {
  render: args => {
    const stepsWithIcons: CXStepItem[] = [
      {
        title: 'Planning',
        description: 'Define project requirements',
        icon: <CXIcon height={16} name='IconList' width={16} />,
      },
      {
        title: 'Development',
        description: 'Build the application',
        icon: <CXIcon height={16} name='IconEdit' width={16} />,
      },
      {
        title: 'Testing',
        description: 'Verify functionality',
        icon: <CXIcon height={16} name='IconIssueCheck' width={16} />,
      },
      {
        title: 'Deployment',
        description: 'Release to production',
        icon: <div className='w-[10px] h-[10px] rounded-full bg-[#FFFFFF]' />,
      },
    ];

    return <CXSteps {...args} steps={stepsWithIcons} />;
  },
  args: {
    current: 1,
  },
};

export const Interactive: Story = {
  render: args => {
    const [currentStep, setCurrentStep] = useState(args.current ?? 0);

    return (
      <div className='space-y-6'>
        <CXSteps {...args} current={currentStep} onChange={setCurrentStep} />
        <div className='text-sm text-gray-600 text-center'>
          Current step: {currentStep + 1} / {args.steps.length}
        </div>
      </div>
    );
  },
  args: {
    current: 0,
    steps: basicSteps,
  },
};

export const WithStatus: Story = {
  render: args => {
    const statusSteps: CXStepItem[] = [
      { title: 'Completed Step', description: 'This step is done' },
      { title: 'Current Step', description: 'Working on this now' },
      { title: 'Future Step', description: 'Will do this later' },
      { title: 'Error Step', description: 'Something went wrong' },
    ];

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-medium mb-4'>Process Status</h3>
          <CXSteps {...args} current={1} status='process' steps={statusSteps} />
        </div>
        <div>
          <h3 className='text-lg font-medium mb-4'>Error Status</h3>
          <CXSteps {...args} current={3} status='error' steps={statusSteps} />
        </div>
        <div>
          <h3 className='text-lg font-medium mb-4'>Finished Status</h3>
          <CXSteps {...args} current={3} status='finish' steps={statusSteps} />
        </div>
      </div>
    );
  },
  args: {
    direction: 'horizontal',
  },
};

export const MinimalSteps: Story = {
  args: {
    current: 0,
    steps: [{ title: 'Start' }, { title: 'Middle' }, { title: 'End' }],
  },
};

export const DisabledSteps: Story = {
  args: {
    current: 1,
    steps: [
      { title: 'Available', description: 'You can click this' },
      { title: 'Current', description: 'Currently active' },
      { title: 'Disabled', description: 'Cannot interact', disabled: true },
      { title: 'Future', description: 'Not yet available' },
    ],
  },
};

export const LongTitles: Story = {
  args: {
    current: 1,
    direction: 'horizontal',
    steps: [
      {
        title: (
          <div className='flex flex-row justify-between items-center'>
            <div>John Liu</div>
            <div className='text-orange-800'>Sep 4 at 8:22 AM</div>
          </div>
        ),
        description: (
          <div className='text-lg text-red-600'>
            The system has begun extracting data to populate the application form.
          </div>
        ),
      },
      {
        title: (
          <div className='flex flex-row justify-between items-center'>
            <div className='bg-slate-700 text-gray-300'>John Liu</div>
            <div>Sep 5 at 8:22 AM</div>
          </div>
        ),
        description: (
          <div className='text-xs text-green-600'>
            The process has been paused. All progress is saved and can be resumed at any time.
          </div>
        ),
      },
      {
        title: (
          <div className='flex flex-row justify-between items-center'>
            <div>John Liu</div>
            <div>Sep 6 at 8:22 AM</div>
          </div>
        ),
        description: (
          <div className='text-sm'>
            <span className='text-orange-400'>The system is continuing </span>
            <span className='text-yellow-400'>to populate the form </span>
            <span className='text-green-700'>from where it </span>
            <span className='text-blue-600'>left </span>
            <span className='text-purple-600'>off</span>
          </div>
        ),
      },
      {
        title: (
          <div className='flex flex-row justify-between items-center'>
            <div>John Liu</div>
            <div>Sep 7 at 8:22 AM</div>
          </div>
        ),
        description: (
          <div className='flex flex-row items-center text-2xl'>
            <CXIcon height={32} name='IconRefresh' width={32} />
            <div>A copy of the application form, was downloaded.</div>
            <CXIcon height={32} name='IconRefresh' width={32} />
            <CXIcon height={32} name='IconRefresh' width={32} />
            <CXIcon height={32} name='IconRefresh' width={32} />
          </div>
        ),
      },
    ],
  },
};

export const AnimatedDemo: Story = {
  render: args => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [status, setStatus] = useState<CXStepStatus>('process');

    const demoSteps: CXStepItem[] = [
      {
        title: 'Initialize',
        description: 'Setting up the environment',
        icon: <CXIcon height={16} name='IconPlus' width={16} />,
      },
      {
        title: 'Processing',
        description: 'Processing your request',
        icon: <CXIcon height={16} name='IconRefresh' width={16} />,
      },
      {
        title: 'Validation',
        description: 'Validating the results',
        icon: <CXIcon height={16} name='IconIssueCheck' width={16} />,
      },
      {
        title: 'Complete',
        description: 'Task completed successfully',
        icon: <CXIcon height={16} name='IconCheckGreen' width={16} />,
      },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev >= demoSteps.length - 1 ? 0 : prev + 1;

          // 随机决定是否在当前步骤显示错误状态 (40% 概率)
          const shouldShowError = Math.random() < 0.4;

          if (shouldShowError && nextStep > 0) {
            setStatus('error');
          } else if (nextStep === demoSteps.length - 1) {
            setStatus('finish');
          } else {
            setStatus('process');
          }

          return nextStep;
        });
      }, 1500);

      return () => clearInterval(interval);
    }, [demoSteps.length]);

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-4'>水平自动演示</h3>
          <CXSteps
            {...args}
            current={currentStep}
            direction='horizontal'
            status={status}
            steps={demoSteps}
          />
        </div>
        <div>
          <h3 className='text-sm font-medium text-gray-700 mb-4'>垂直自动演示</h3>
          <CXSteps
            {...args}
            current={currentStep}
            direction='vertical'
            status={status}
            steps={demoSteps}
          />
        </div>
      </div>
    );
  },
  args: {
    status: 'process',
  },
  parameters: {
    docs: {
      description: {
        story:
          '演示步骤组件的自动进度效果，每1.5秒自动前进到下一步，随机展示错误状态（20%概率）。同时展示水平和垂直两种布局，以及不同的状态效果。',
      },
    },
  },
};
