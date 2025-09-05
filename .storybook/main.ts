import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  // Story文件路径配置
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  // 必要的插件配置
  addons: [
    // '@storybook/addon-essentials', // 版本兼容问题，暂时注释
    '@storybook/addon-a11y', // 无障碍访问检查
    '@storybook/addon-interactions', // 交互测试
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      // 支持React 19的配置
      legacyRootApi: false,
      // Vite特定配置
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  // TypeScript配置
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // 提取更多组件信息用于文档生成
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractValuesFromUnion: true,
      propFilter: prop => {
        // 过滤掉不需要在文档中显示的属性
        if (prop.name === 'children') return true;
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find(declaration => {
            return !declaration.fileName.includes('node_modules');
          });
          return Boolean(hasPropAdditionalDescription);
        }
        return true;
      },
    },
  },

  // 文档配置
  docs: {
    defaultName: 'Documentation',
  },

  // 静态文件目录
  staticDirs: ['../public'],

  // 特性配置（移除不受支持的选项）

  // Vite配置
  viteFinal: async config => {
    // 添加路径别名
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/types': path.resolve(__dirname, '../src/types'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
    };

    return config;
  },
};

export default config;
