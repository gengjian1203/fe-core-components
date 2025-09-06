#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 执行发布前检查...\n');

// 检查是否在主分支
try {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  if (currentBranch !== 'main' && currentBranch !== 'master') {
    console.warn(`⚠️  警告: 当前在 ${currentBranch} 分支，建议在主分支发布`);
  } else {
    console.log('✅ 当前在主分支');
  }
} catch (error) {
  console.error('❌ 无法获取当前分支信息');
}

// 检查工作区是否干净
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (status) {
    console.error('❌ 工作区不干净，请先提交所有更改');
    process.exit(1);
  } else {
    console.log('✅ 工作区干净');
  }
} catch (error) {
  console.error('❌ 无法检查 git 状态');
  process.exit(1);
}

// 检查 package.json
const packagePath = path.join(__dirname, '../package.json');
if (!fs.existsSync(packagePath)) {
  console.error('❌ 找不到 package.json 文件');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
console.log(`✅ 当前版本: ${packageJson.version}`);

// 检查必要文件
const requiredFiles = ['README.md', 'CHANGELOG.md', 'LICENSE'];
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 缺少必要文件: ${file}`);
    process.exit(1);
  }
}
console.log('✅ 所有必要文件存在');

// 运行测试和构建
console.log('\n🧪 运行测试和构建...');
try {
  console.log('运行 ESLint...');
  execSync('pnpm lint:check', { stdio: 'inherit' });
  
  console.log('运行 TypeScript 检查...');
  execSync('pnpm typecheck', { stdio: 'inherit' });
  
  console.log('构建项目...');
  execSync('pnpm build', { stdio: 'inherit' });
  
  console.log('检查包大小...');
  execSync('pnpm analyze', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ 测试或构建失败');
  process.exit(1);
}

console.log('\n✅ 所有检查通过，可以发布！');
console.log('\n发布命令：');
console.log('  补丁版本: pnpm run release:patch');
console.log('  次要版本: pnpm run release:minor');
console.log('  主要版本: pnpm run release:major');