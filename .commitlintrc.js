module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码格式修改
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或依赖项修改
        'ci', // CI配置文件和脚本修改
        'chore', // 其他不修改src或test文件的修改
        'revert', // 回退之前的提交
      ],
    ],
    // 主题不能为空
    'subject-empty': [2, 'never'],
    // 主题结尾不能有标点符号
    'subject-full-stop': [2, 'never', '.'],
    // 主题格式（小写开头）
    'subject-case': [2, 'always', 'lower-case'],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 类型格式（小写）
    'type-case': [2, 'always', 'lower-case'],
    // header最大长度
    'header-max-length': [2, 'always', 72],
    // body行最大长度
    'body-max-line-length': [2, 'always', 100],
    // footer行最大长度
    'footer-max-line-length': [2, 'always', 100],
  },
  // 自定义提示信息
  prompt: {
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个scope (可选):',
      customScope: '请输入自定义的scope:',
      subject: '填写一个简短精炼的描述语句:',
      body: '添加一个更加详细的描述，可以附上新增功能的描述或bug链接、截图链接 (可选):',
      breaking: '列举非兼容性重大的变更 (可选):',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀:',
      footer: '列举关联issue (可选):',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新功能' },
      { value: 'fix', name: 'fix:      修复' },
      { value: 'docs', name: 'docs:     文档变更' },
      { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
      { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'test', name: 'test:     增加测试' },
      { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
      { value: 'revert', name: 'revert:   回退' },
      { value: 'build', name: 'build:    打包' },
    ],
  },
};
