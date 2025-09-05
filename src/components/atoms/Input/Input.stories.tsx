import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '基础输入框组件，支持多种变体、尺寸和状态。提供完整的表单输入功能和无障碍访问支持。',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '输入框尺寸',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: '输入框变体样式',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    required: {
      control: { type: 'boolean' },
      description: '是否必填',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '是否全宽',
    },
    clearable: {
      control: { type: 'boolean' },
      description: '是否显示清除按钮',
    },
    label: {
      control: { type: 'text' },
      description: '标签文本',
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符文本',
    },
    helperText: {
      control: { type: 'text' },
      description: '帮助文本',
    },
    error: {
      control: { type: 'text' },
      description: '错误信息',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
    helperText: '用户名长度为3-20个字符',
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input label='Small' placeholder='Small input' size='sm' />
      <Input label='Medium' placeholder='Medium input' size='md' />
      <Input label='Large' placeholder='Large input' size='lg' />
      <Input label='Extra Large' placeholder='Extra large input' size='xl' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同尺寸的输入框：sm、md、lg、xl。',
      },
    },
  },
};

// 不同变体
export const Variants: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input label='Default' placeholder='Default variant' variant='default' />
      <Input label='Filled' placeholder='Filled variant' variant='filled' />
      <Input label='Outlined' placeholder='Outlined variant' variant='outlined' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同变体的输入框样式。',
      },
    },
  },
};

// 带图标的输入框
export const WithIcons: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input
        label='搜索'
        leftIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z' />
          </svg>
        }
        placeholder='搜索内容...'
      />
      <Input
        label='邮箱'
        leftIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
          </svg>
        }
        placeholder='请输入邮箱地址'
        rightIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
          </svg>
        }
        type='email'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示带有左侧图标和右侧图标的输入框。',
      },
    },
  },
};

// 可清除的输入框
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('可以清除的内容');

    return (
      <Input
        clearable
        helperText='点击右侧的 × 按钮可以清除内容'
        label='可清除输入框'
        placeholder='输入一些内容...'
        value={value}
        onChange={e => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '展示支持清除功能的输入框，当有内容时会显示清除按钮。',
      },
    },
  },
};

// 不同状态
export const States: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input helperText='这是一个正常状态的输入框' label='正常状态' placeholder='正常的输入框' />
      <Input required helperText='此字段为必填项' label='必填输入框' placeholder='请输入必填内容' />
      <Input
        defaultValue='invalid-input'
        error='用户名格式不正确'
        label='错误状态'
        placeholder='有错误的输入框'
      />
      <Input
        disabled
        defaultValue='禁用的内容'
        helperText='此输入框已被禁用'
        label='禁用状态'
        placeholder='禁用的输入框'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示输入框的不同状态：正常、必填、错误、禁用。',
      },
    },
  },
};

// 不同输入类型
export const InputTypes: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input label='文本输入' placeholder='请输入文本' type='text' />
      <Input
        label='邮箱输入'
        leftIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
          </svg>
        }
        placeholder='请输入邮箱地址'
        type='email'
      />
      <Input
        label='密码输入'
        leftIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
          </svg>
        }
        placeholder='请输入密码'
        type='password'
      />
      <Input label='数字输入' max={100} min={0} placeholder='请输入数字' type='number' />
      <Input
        label='电话输入'
        leftIcon={
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
          </svg>
        }
        placeholder='请输入电话号码'
        type='tel'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示不同类型的输入框：文本、邮箱、密码、数字、电话等。',
      },
    },
  },
};

// 全宽输入框
export const FullWidth: Story = {
  render: () => (
    <div className='space-y-4'>
      <Input
        fullWidth
        helperText='输入框会占满容器的全部宽度'
        label='全宽输入框'
        placeholder='这是一个全宽的输入框'
      />
      <Input helperText='输入框使用自动宽度' label='默认宽度' placeholder='这是默认宽度的输入框' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示全宽和默认宽度的输入框对比。',
      },
    },
  },
};

// 表单示例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }));

      // 清除错误信息
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete newErrors[field];
          return newErrors;
        });
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.username) {
        newErrors.username = '用户名不能为空';
      }
      if (!formData.email) {
        newErrors.email = '邮箱不能为空';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '邮箱格式不正确';
      }
      if (!formData.password) {
        newErrors.password = '密码不能为空';
      } else if (formData.password.length < 6) {
        newErrors.password = '密码长度至少为6位';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.warn('表单提交成功！');
      }
    };

    return (
      <form className='space-y-4 max-w-md' onSubmit={handleSubmit}>
        <Input
          fullWidth
          required
          error={errors.username}
          label='用户名'
          leftIcon={
            <svg fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
            </svg>
          }
          placeholder='请输入用户名'
          value={formData.username}
          onChange={handleChange('username')}
        />

        <Input
          fullWidth
          required
          error={errors.email}
          label='邮箱'
          leftIcon={
            <svg fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
            </svg>
          }
          placeholder='请输入邮箱地址'
          type='email'
          value={formData.email}
          onChange={handleChange('email')}
        />

        <Input
          fullWidth
          required
          error={errors.password}
          helperText={!errors.password ? '密码长度至少为6位' : undefined}
          label='密码'
          leftIcon={
            <svg fill='currentColor' viewBox='0 0 24 24'>
              <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
            </svg>
          }
          placeholder='请输入密码'
          type='password'
          value={formData.password}
          onChange={handleChange('password')}
        />

        <Input
          fullWidth
          required
          error={errors.confirmPassword}
          label='确认密码'
          leftIcon={
            <svg fill='currentColor' viewBox='0 0 24 24'>
              <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
            </svg>
          }
          placeholder='请再次输入密码'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
        />

        <Input
          fullWidth
          helperText='选填项目'
          label='手机号码'
          leftIcon={
            <svg fill='currentColor' viewBox='0 0 24 24'>
              <path d='M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
            </svg>
          }
          placeholder='请输入手机号码'
          type='tel'
          value={formData.phone}
          onChange={handleChange('phone')}
        />

        <button
          className='w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200'
          type='submit'
        >
          提交注册
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '展示在表单中使用输入框组件的完整示例，包括表单验证和错误处理。',
      },
    },
  },
};

// 交互式输入框
export const Interactive: Story = {
  args: {
    label: '交互式输入框',
    placeholder: '在Controls面板中调整属性',
    helperText: '可以在Controls面板中调整各种属性来预览效果',
    size: 'md',
    variant: 'default',
    fullWidth: false,
    required: false,
    disabled: false,
    clearable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '可在Controls面板中调整各种属性来预览输入框效果。',
      },
    },
  },
};
