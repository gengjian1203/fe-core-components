import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 外部依赖配置 - 这些库不会被打包进最终产物
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  // Ant Design 相关依赖
  'antd',
  /^antd\//,
  '@ant-design/icons',
  // 不要将 React 19 补丁作为外部依赖，需要打包进来
  // '@ant-design/v5-patch-for-react-19',
];

// 全局变量映射 - 用于UMD构建
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
  antd: 'antd',
  // Ant Design 具体组件全局变量
  'antd/es/card': 'antd.Card',
  'antd/es/avatar': 'antd.Avatar',
  'antd/es/space': 'antd.Space',
  'antd/es/tag': 'antd.Tag',
};

// 通用插件配置
const getPlugins = format => [
  // 解析node_modules中的模块
  resolve({
    browser: true,
    preferBuiltins: false,
    exportConditions: ['import', 'module', 'default'],
  }),

  // CommonJS转ESM
  commonjs({
    include: /node_modules/,
  }),

  // TypeScript编译
  typescript({
    tsconfig: './tsconfig.build.json',
    declaration: format === 'esm', // 只在ESM构建中生成类型声明
    declarationDir: format === 'esm' ? 'dist/types' : undefined,
    declarationMap: format === 'esm',
    rootDir: 'src',
    exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/*.stories.{ts,tsx}', 'stories/**/*'],
  }),

  // Babel转译 - 确保浏览器兼容性
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'],
          },
          modules: false, // 保持ESM模块格式，让Rollup处理
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic', // 使用新的JSX Transform
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [['@babel/plugin-transform-runtime']],
  }),

  // CSS处理 - 不提取CSS，因为有单独的CSS构建
  postcss({
    extract: false,
    inject: false,
    config: {
      path: './postcss.config.js',
    },
  }),

  // 生产环境压缩 - 始终启用以减小包大小
  terser({
    compress: {
      drop_console: true, // 移除console语句
      drop_debugger: true, // 移除debugger语句
      pure_getters: true, // 假设getter无副作用
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      // 更激进的压缩选项
      passes: 2, // 多次压缩优化
      pure_funcs: ['console.log', 'console.warn'], // 移除特定函数调用
      dead_code: true, // 移除死代码
      unused: true, // 移除未使用的变量
      collapse_vars: true, // 合并变量
      reduce_vars: true, // 减少变量使用
      keep_infinity: true, // 保持 Infinity
      toplevel: true, // 顶级作用域压缩
    },
    mangle: {
      safari10: true, // 修复Safari 10的问题
      toplevel: true, // 压缩顶级作用域名称
      properties: {
        regex: /^_/, // 压缩以 _ 开头的属性名
      },
    },
    output: {
      comments: false, // 移除注释
      ascii_only: true, // 确保输出为ASCII
      beautify: false, // 不美化输出
    },
    ecma: 2020, // 使用ES2020语法优化
  }),

  // 包大小分析 - 只在构建完成后生成
  ...(format === 'esm'
    ? [
        visualizer({
          filename: 'dist/bundle-analysis.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
      ]
    : []),
];

// 构建配置
export default [
  // CSS构建 - 单独提取CSS到dist根目录
  {
    input: 'src/styles/globals.css',
    output: {
      file: 'dist/styles.css',
      format: 'esm',
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        sourceMap: true,
        config: {
          path: './postcss.config.js',
        },
      }),
    ],
  },

  // ESM构建 - 用于现代打包工具
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      // 保持模块结构以支持tree shaking
      preserveModules: false,
      // 确保外部依赖不被打包
      interop: 'auto',
    },
    external,
    plugins: getPlugins('esm'),
    // 开启tree shaking
    treeshake: {
      moduleSideEffects: id => {
        // 保留CSS文件、样式模块和patch文件的副作用
        return /\.css$/.test(id) || 
               /\.scss$/.test(id) || 
               /\.less$/.test(id) ||
               /patch\.ts$/.test(id) ||
               /@ant-design\/v5-patch-for-react-19/.test(id);
      },
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },

  // CommonJS构建 - 用于Node.js环境
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto',
    },
    external,
    plugins: getPlugins('cjs'),
    treeshake: {
      moduleSideEffects: id => {
        // 保留CSS文件、样式模块和patch文件的副作用
        return /\.css$/.test(id) || 
               /\.scss$/.test(id) || 
               /\.less$/.test(id) ||
               /patch\.ts$/.test(id)
      },
    },
  },

  // UMD构建 - 用于直接在浏览器中使用
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'FeCoreComponents', // 全局变量名
      sourcemap: true,
      exports: 'named',
      globals,
    },
    external,
    plugins: getPlugins('umd'),
  },
];
