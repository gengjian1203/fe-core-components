import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/globals.css';

// 响应式断点配置
const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  desktopLarge: {
    name: 'Desktop Large',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
};

const preview: Preview = {
  // 全局参数配置
  parameters: {
    // 操作面板配置
    actions: {
      argTypesRegex: '^on[A-Z].*', // 自动检测事件处理函数
    },

    // 控件配置
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true, // 默认展开控件面板
      hideNoControlsWarning: true, // 隐藏无控件警告
    },

    // 文档配置
    docs: {
      toc: true, // 显示目录
      source: {
        state: 'open', // 默认展开源码
      },
    },

    // 视窗配置
    viewport: {
      viewports: {
        ...customViewports,
      },
      defaultViewport: 'desktop',
    },

    // 背景配置
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'neutral',
          value: '#f5f5f5',
        },
      ],
    },

    // 布局配置
    layout: 'padded', // 默认添加内边距

    // 工具栏配置
    toolbar: {
      title: { hidden: false },
      zoom: { hidden: false },
      eject: { hidden: false },
      copy: { hidden: false },
      fullscreen: { hidden: false },
    },
  },

  // 全局装饰器
  decorators: [
    // 容器装饰器 - 为所有故事添加一致的容器样式
    (Story, context) => {
      return (
        <div className='p-4'>
          <Story />
        </div>
      );
    },
  ],

  // 全局类型定义
  argTypes: {
    // 通用属性类型
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '组件尺寸',
    },
    variant: {
      control: { type: 'select' },
      description: '组件变体',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用',
    },
    loading: {
      control: { type: 'boolean' },
      description: '是否加载中',
    },
    className: {
      control: { type: 'text' },
      description: '额外的CSS类名',
    },
    children: {
      control: { type: 'text' },
      description: '子组件或内容',
    },
  },

  // 全局变量
  globalTypes: {
    theme: {
      description: '主题',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: '亮色主题', icon: 'sun' },
          { value: 'dark', title: '暗色主题', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
