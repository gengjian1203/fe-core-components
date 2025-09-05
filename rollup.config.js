import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 外部依赖配置 - 这些库不会被打包进最终产物
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime'
];

// 全局变量映射 - 用于UMD构建
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime'
};

// 通用插件配置
const getPlugins = (format) => [
  // 解析node_modules中的模块
  resolve({
    browser: true,
    preferBuiltins: false,
    exportConditions: ['import', 'module', 'default']
  }),
  
  // CommonJS转ESM
  commonjs({
    include: /node_modules/
  }),
  
  // TypeScript编译
  typescript({
    tsconfig: './tsconfig.build.json',
    declaration: format === 'esm', // 只在ESM构建中生成类型声明
    declarationDir: 'dist/types',
    rootDir: 'src',
    exclude: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      'stories/**/*'
    ]
  }),
  
  // Babel转译 - 确保浏览器兼容性
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    presets: [
      ['@babel/preset-env', {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
        },
        modules: false // 保持ESM模块格式，让Rollup处理
      }],
      ['@babel/preset-react', {
        runtime: 'automatic' // 使用新的JSX Transform
      }],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['@babel/plugin-transform-runtime']
    ]
  }),
  
  // CSS处理 - 提取CSS并支持Tailwind
  postcss({
    extract: 'styles.css',
    minimize: true,
    sourceMap: true,
    config: {
      path: './postcss.config.js'
    }
  }),
  
  // 生产环境压缩
  ...(process.env.NODE_ENV === 'production' ? [
    terser({
      compress: {
        drop_console: true, // 移除console语句
        drop_debugger: true, // 移除debugger语句
        pure_getters: true, // 假设getter无副作用
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      mangle: {
        safari10: true // 修复Safari 10的问题
      },
      output: {
        comments: false // 移除注释
      }
    })
  ] : []),
  
  // 包大小分析 - 只在构建完成后生成
  ...(format === 'esm' ? [
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ] : [])
];

// 构建配置
export default [
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
      interop: 'auto'
    },
    external,
    plugins: getPlugins('esm'),
    // 开启tree shaking
    treeshake: {
      moduleSideEffects: (id) => {
        // CSS文件和样式模块保留副作用
        return /\.css$/.test(id) || /\.scss$/.test(id) || /\.less$/.test(id);
      },
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false
    }
  },
  
  // CommonJS构建 - 用于Node.js环境
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto'
    },
    external,
    plugins: getPlugins('cjs'),
    treeshake: {
      moduleSideEffects: (id) => {
        return /\.css$/.test(id) || /\.scss$/.test(id) || /\.less$/.test(id);
      }
    }
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
      globals
    },
    external,
    plugins: getPlugins('umd')
  }
];