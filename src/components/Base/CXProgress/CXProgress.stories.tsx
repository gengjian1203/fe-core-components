import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { CXProgress } from '../../Base';

const meta: Meta<typeof CXProgress> = {
  title: 'Base/CXProgress',
  component: CXProgress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '进度条组件，支持线形和环形两种类型，可自定义颜色、尺寸和动画效果。value 值变化时会自动播放动画。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['linear', 'circle'],
      description: '进度条类型：线形或环形',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '当前进度值',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: '最大值',
    },
    color: {
      control: { type: 'color' },
      description: '高优先级绝对颜色，设置后会覆盖processColor和successColor',
    },
    processColor: {
      control: { type: 'color' },
      description: '进行中状态颜色（进度 < 100%）',
    },
    successColor: {
      control: { type: 'color' },
      description: '成功状态颜色（进度 >= 100%）',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '背景颜色',
    },
    width: {
      control: { type: 'text' },
      description: '宽度(支持string或number类型。线形进度条宽度，环形进度条尺寸)',
    },
    height: {
      control: { type: 'text' },
      description: '高度(支持string或number类型。线形进度条忽略此值，环形进度条尺寸)',
    },
    strokeWidth: {
      control: { type: 'text' },
      description: '线宽(支持px等单位。线形进度条高度，环形进度条线宽)',
    },
    showText: {
      control: { type: 'text' },
      description: '进度标题文本，为空则不显示标题和百分比',
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: '动画持续时间(ms)',
    },
    borderRadius: {
      control: { type: 'text' },
      description: '圆角大小(支持px等单位，仅线形进度条)',
    },
    className: {
      control: { type: 'text' },
      description: '自定义CSS类名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'linear',
    value: 60,
    max: 100,
    width: '100%',
    strokeWidth: '8px',
    animationDuration: 300,
    borderRadius: '4px',
  },
};

export const WithText: Story = {
  args: {
    value: 75,
    max: 100,
    showText: '任务进度',
    processColor: 'rgb(251, 191, 36)',
    successColor: '#51AC65',
    width: '100%',
    strokeWidth: '12px',
  },
};

export const AbsoluteColor: Story = {
  args: {
    value: 85,
    max: 100,
    color: 'rgb(239, 68, 68)',
    width: '100%',
    strokeWidth: '10px',
    showText: '警告状态',
  },
};

export const ThickProgress: Story = {
  args: {
    value: 45,
    max: 100,
    processColor: 'rgb(168, 85, 247)',
    successColor: '#51AC65',
    width: '100%',
    strokeWidth: '20px',
    showText: '粗进度条',
    borderRadius: '10px',
  },
};

export const SlowAnimation: Story = {
  args: {
    value: 90,
    max: 100,
    processColor: 'rgb(59, 130, 246)',
    successColor: '#51AC65',
    width: '100%',
    strokeWidth: '8px',
    animationDuration: 1500,
    showText: '慢动画',
  },
};

export const AnimatedDemo: Story = {
  render: args => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 10;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className='space-y-8'>
        <div>
          <h3 className='text-sm font-medium text-neutral-700 mb-4'>线形动画进度条</h3>
          <CXProgress {...args} strokeWidth='12px' type='linear' value={progress} width='100%' />
        </div>
        <div>
          <h3 className='text-sm font-medium text-neutral-700 mb-4'>环形动画进度条</h3>
          <div className='flex justify-center'>
            <CXProgress
              {...args}
              height={120}
              strokeWidth='8px'
              type='circle'
              value={progress}
              width={120}
            />
          </div>
        </div>
      </div>
    );
  },
  args: {
    max: 100,
    processColor: 'rgb(59, 130, 246)',
    successColor: '#51AC65',
    showText: '自动演示',
    animationDuration: 800,
  },
  parameters: {
    docs: {
      description: {
        story: '演示线形和环形进度条的自动递增动画效果，每秒增加10%，到达100%后重置为0。',
      },
    },
  },
};

export const ColorTransition: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(59, 130, 246)'
          showText='进行中'
          strokeWidth='10px'
          successColor='#51AC65'
          value={60}
          width='100%'
        />
      </div>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(59, 130, 246)'
          showText='即将完成'
          strokeWidth='10px'
          successColor='#51AC65'
          value={95}
          width='100%'
        />
      </div>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(59, 130, 246)'
          showText='已完成'
          strokeWidth='10px'
          successColor='#51AC65'
          value={100}
          width='100%'
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '演示进度条从进行中颜色到成功颜色的自动变化。当进度达到100%时，颜色会自动从processColor切换到successColor。',
      },
    },
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(251, 191, 36)'
          showText='CPU使用率'
          strokeWidth='8px'
          successColor='#51AC65'
          type='linear'
          value={65}
          width='100%'
        />
      </div>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(239, 68, 68)'
          showText='内存使用率'
          strokeWidth='8px'
          successColor='#51AC65'
          type='linear'
          value={85}
          width='100%'
        />
      </div>
      <div>
        <CXProgress
          max={100}
          processColor='rgb(59, 130, 246)'
          showText='磁盘使用率'
          strokeWidth='8px'
          successColor='#51AC65'
          type='linear'
          value={45}
          width='100%'
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '多个进度条组合使用的示例，适用于显示系统状态等场景。',
      },
    },
  },
};

// Circular Progress Stories
export const CircularDefault: Story = {
  args: {
    type: 'circle',
    value: 75,
    max: 100,
    width: 120,
    height: 120,
    strokeWidth: '8px',
    animationDuration: 300,
  },
};

export const CircularWithText: Story = {
  args: {
    type: 'circle',
    value: 85,
    max: 100,
    width: 120,
    height: 120,
    strokeWidth: '8px',
    showText: '下载进度',
    processColor: 'rgb(59, 130, 246)',
    successColor: '#51AC65',
  },
};

export const CircularSmall: Story = {
  args: {
    type: 'circle',
    value: 60,
    max: 100,
    width: 80,
    height: 80,
    strokeWidth: '6px',
    processColor: 'rgb(168, 85, 247)',
    successColor: '#51AC65',
  },
};

export const CircularLarge: Story = {
  args: {
    type: 'circle',
    value: 90,
    max: 100,
    width: 160,
    height: 160,
    strokeWidth: '12px',
    processColor: 'rgb(251, 191, 36)',
    successColor: '#51AC65',
    showText: '系统状态',
  },
};

export const CircularComplete: Story = {
  args: {
    type: 'circle',
    value: 100,
    max: 100,
    width: 120,
    height: 120,
    strokeWidth: '8px',
    processColor: 'rgb(59, 130, 246)',
    successColor: '#51AC65',
    showText: '已完成',
  },
};

export const TypeComparison: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-sm font-medium text-neutral-700 mb-4'>线形进度条</h3>
        <div className='space-y-4'>
          <CXProgress
            max={100}
            processColor='rgb(59, 130, 246)'
            showText='任务A'
            strokeWidth='10px'
            successColor='#51AC65'
            type='linear'
            value={65}
            width='100%'
          />
          <CXProgress
            max={100}
            processColor='rgb(251, 191, 36)'
            showText='任务B'
            strokeWidth='10px'
            successColor='#51AC65'
            type='linear'
            value={100}
            width='100%'
          />
        </div>
      </div>
      <div>
        <h3 className='text-sm font-medium text-neutral-700 mb-4'>环形进度条</h3>
        <div className='flex gap-8'>
          <CXProgress
            height={100}
            max={100}
            processColor='rgb(59, 130, 246)'
            showText='任务A'
            strokeWidth='8px'
            successColor='#51AC65'
            type='circle'
            value={65}
            width={100}
          />
          <CXProgress
            height={100}
            max={100}
            processColor='rgb(251, 191, 36)'
            showText='任务B'
            strokeWidth='8px'
            successColor='#51AC65'
            type='circle'
            value={100}
            width={100}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示线形和环形进度条的对比效果，可以根据不同使用场景选择合适的类型。',
      },
    },
  },
};
