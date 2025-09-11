export default {
  plugins: {
    // Tailwind CSS处理
    tailwindcss: {},
    // 自动添加浏览器前缀
    autoprefixer: {},
    // 生产环境CSS优化
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            // 保留CSS自定义属性(CSS变量)
            cssDeclarationSorter: false,
            // 不合并相同规则，保持CSS变量的覆盖顺序
            mergeRules: false,
            // 保留重要的注释
            discardComments: {
              removeAll: false,
            },
          },
        ],
      },
    }),
  },
};
