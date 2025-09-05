#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建组件库...\n');

// 清理dist目录
console.log('📁 清理构建目录...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// 创建dist目录结构
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('dist/esm', { recursive: true });
fs.mkdirSync('dist/cjs', { recursive: true });
fs.mkdirSync('dist/umd', { recursive: true });
fs.mkdirSync('dist/types', { recursive: true });

try {
  // TypeScript类型检查
  console.log('🔍 TypeScript类型检查...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  
  // 运行Rollup构建
  console.log('📦 Rollup构建...');
  execSync('rollup -c rollup.config.js', { stdio: 'inherit' });
  
  // 生成package.json信息
  console.log('📝 生成构建信息...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    buildTime: new Date().toISOString(),
    nodeVersion: process.version
  };
  
  fs.writeFileSync(
    path.join('dist', 'build-info.json'), 
    JSON.stringify(buildInfo, null, 2)
  );
  
  // 复制必要文件
  console.log('📋 复制文件...');
  if (fs.existsSync('README.md')) {
    fs.copyFileSync('README.md', 'dist/README.md');
  }
  
  if (fs.existsSync('CHANGELOG.md')) {
    fs.copyFileSync('CHANGELOG.md', 'dist/CHANGELOG.md');
  }
  
  // 创建精简的package.json
  const distPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    main: 'cjs/index.js',
    module: 'esm/index.js',
    types: 'types/index.d.ts',
    exports: packageJson.exports,
    sideEffects: packageJson.sideEffects,
    peerDependencies: packageJson.peerDependencies,
    keywords: packageJson.keywords,
    author: packageJson.author,
    license: packageJson.license,
    repository: packageJson.repository,
    bugs: packageJson.bugs,
    homepage: packageJson.homepage
  };
  
  fs.writeFileSync(
    path.join('dist', 'package.json'), 
    JSON.stringify(distPackageJson, null, 2)
  );
  
  console.log('✅ 构建完成！');
  console.log('\n📊 构建产物：');
  console.log('  - ESM: dist/esm/');
  console.log('  - CJS: dist/cjs/');
  console.log('  - UMD: dist/umd/');
  console.log('  - Types: dist/types/');
  console.log('  - Styles: dist/styles.css');
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}