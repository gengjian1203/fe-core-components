import { CXButton } from '@/components/Base/CXButton';
import { CXThemeProvider } from '@/components/Base/CXThemeProvider';
import { CXThemeToggle } from '@/components/Base/CXThemeToggle';
import { CXCard } from '@/components/Case/CXCard';
import {
  EditOutlined,
  HeartOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, Card, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const ThemeDemo: React.FC = () => {
  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      <Card title='主题切换示例'>
        <Space direction='vertical' size='middle'>
          <Title level={4}>主题切换按钮</Title>
          <CXThemeToggle />

          <Title level={4}>Ant Design 组件</Title>
          <Space wrap>
            <Button type='primary'>Primary Button</Button>
            <Button>Default Button</Button>
            <Button type='dashed'>Dashed Button</Button>
            <Button type='link'>Link Button</Button>
          </Space>

          <Title level={4}>CX 组件</Title>
          <Space wrap>
            <CXButton variant='primary'>Primary</CXButton>
            <CXButton variant='default'>Default</CXButton>
            <CXButton variant='dashed'>Dashed</CXButton>
            <CXButton variant='link'>Link</CXButton>
            <CXButton variant='danger'>Danger</CXButton>
          </Space>

          <Card size='small' title='颜色示例'>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: 'rgb(var(--color-primary-500))',
                  color: 'white',
                  borderRadius: '4px',
                }}
              >
                Primary
              </div>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: 'rgb(var(--color-secondary-500))',
                  color: 'white',
                  borderRadius: '4px',
                }}
              >
                Secondary
              </div>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: 'rgb(var(--color-success-500))',
                  color: 'white',
                  borderRadius: '4px',
                }}
              >
                Success
              </div>
              <div
                style={{
                  padding: '8px',
                  backgroundColor: 'rgb(var(--color-error-500))',
                  color: 'white',
                  borderRadius: '4px',
                }}
              >
                Error
              </div>
            </div>
          </Card>

          <Title level={4}>CXCard 组件示例</Title>
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            {/* 基础卡片 */}
            <CXCard
              headerActions={
                <Space>
                  <CXThemeToggle size='small' variant='text' />
                  <CXButton leftIcon={<SettingOutlined />} size='small' variant='link'>
                    设置
                  </CXButton>
                </Space>
              }
              title='基础卡片'
            >
              <Paragraph>
                这是一个基础的CXCard示例，展示在不同主题下的表现。
                卡片会根据当前主题自动调整背景色、边框和文字颜色。
              </Paragraph>
              <Space wrap>
                <Tag color='blue'>标签1</Tag>
                <Tag color='green'>标签2</Tag>
                <Tag color='red'>标签3</Tag>
              </Space>
            </CXCard>

            {/* 带用户信息的卡片 */}
            <CXCard
              headerActions={
                <CXButton leftIcon={<EditOutlined />} size='small' variant='primary'>
                  编辑
                </CXButton>
              }
              headerIcon={<UserOutlined />}
              title='用户信息卡片'
            >
              <Space>
                <Avatar icon={<UserOutlined />} size='large' />
                <div>
                  <Title level={5} style={{ margin: 0 }}>
                    张三
                  </Title>
                  <Paragraph style={{ margin: 0, color: 'gray' }}>前端开发工程师</Paragraph>
                </div>
              </Space>
              <div style={{ marginTop: 16 }}>
                <Space wrap>
                  <CXButton leftIcon={<HeartOutlined />} size='small' variant='default'>
                    关注
                  </CXButton>
                  <CXButton leftIcon={<ShareAltOutlined />} size='small' variant='default'>
                    分享
                  </CXButton>
                </Space>
              </div>
            </CXCard>

            {/* 统计卡片 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <CXCard size='small' title='今日访问'>
                <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                  1,234
                </Title>
                <Paragraph style={{ margin: 0, color: 'gray' }}>+12.5% 较昨天</Paragraph>
              </CXCard>

              <CXCard size='small' title='总用户数'>
                <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
                  8,765
                </Title>
                <Paragraph style={{ margin: 0, color: 'gray' }}>+5.2% 较上周</Paragraph>
              </CXCard>

              <CXCard size='small' title='转化率'>
                <Title level={2} style={{ margin: 0, color: '#faad14' }}>
                  23.4%
                </Title>
                <Paragraph style={{ margin: 0, color: 'gray' }}>-2.1% 较上月</Paragraph>
              </CXCard>
            </div>
          </Space>

          <Paragraph>
            这个示例展示了如何使用 CXThemeProvider 来为应用提供亮色/暗色主题支持。
            主题会自动应用到所有 Ant Design 组件和 CX 组件上，包括 CXCard。
            请尝试切换主题按钮来查看不同组件在亮色和暗色模式下的表现。
          </Paragraph>
        </Space>
      </Card>
    </Space>
  );
};

const meta: Meta<typeof CXThemeProvider> = {
  title: 'Base/CXThemeProvider',
  component: CXThemeProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CXThemeProvider 是一个主题提供者组件，为应用提供亮色和暗色主题支持。

## 特性

- 🌓 支持亮色和暗色主题切换
- 🔄 自动同步系统主题偏好
- 💾 本地存储主题设置
- 🎨 完整的 Ant Design 主题集成
- 🧩 支持 CSS 变量和 Tailwind CSS
- ♿ 完善的无障碍支持

## 使用方法

\`\`\`tsx
import { CXThemeProvider, CXThemeToggle } from '@gengjian1203/fe-core-components';

function App() {
  return (
    <CXThemeProvider defaultMode="light" storageKey="my-theme">
      <CXThemeToggle />
      {/* 你的应用内容 */}
    </CXThemeProvider>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultMode: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
      description: '默认主题模式',
    },
    forcedMode: {
      control: { type: 'radio' },
      options: [undefined, 'light', 'dark'],
      description: '强制主题模式（禁用切换）',
    },
    storageKey: {
      control: { type: 'text' },
      description: 'localStorage 存储键名',
    },
  },
  args: {
    defaultMode: 'light',
    storageKey: 'cx-theme-mode',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <CXThemeProvider {...args}>
      <ThemeDemo />
    </CXThemeProvider>
  ),
};

export const ForcedLight: Story = {
  args: {
    forcedMode: 'light',
  },
  render: args => (
    <CXThemeProvider {...args}>
      <ThemeDemo />
    </CXThemeProvider>
  ),
};

export const ForcedDark: Story = {
  args: {
    forcedMode: 'dark',
  },
  render: args => (
    <CXThemeProvider {...args}>
      <ThemeDemo />
    </CXThemeProvider>
  ),
};
