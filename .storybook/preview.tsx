import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import packageJson from '../package.json';
import { CXThemeProvider } from '../src/components/Base/CXThemeProvider';
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
    // 主题装饰器 - 同步 Storybook 工具栏主题与组件主题
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      useEffect(() => {
        // 同步 DOM class
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }, [theme]);

      return (
        <CXThemeProvider forcedMode={theme} storageKey='storybook-theme'>
          <div className='min-h-screen relative bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100'>
            <div className='p-4'>
              <Story />
            </div>
            {/* 版本信息显示在右下角 */}
            <div className='fixed bottom-2 right-2 text-xs text-gray-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm border'>
              v{packageJson.version}
            </div>
          </div>
        </CXThemeProvider>
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
