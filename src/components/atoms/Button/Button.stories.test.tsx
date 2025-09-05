/**
 * Storybook Stories 集成单元测试
 * 
 * 使用 composeStories 工具复用 Storybook stories 作为测试用例
 * 遵循 Storybook 官方最佳实践
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

const { Default, Interactive, Variants, Sizes, States, WithIcons, FullWidth, WithShadow, LoadingStates } = composeStories(stories);

describe('Button Stories Integration Tests', () => {
  describe('Basic Stories Tests', () => {
    it('renders default story correctly', () => {
      render(<Default />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('默认按钮');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('renders interactive story correctly', () => {
      render(<Interactive />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('交互式按钮');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Story Variants Tests', () => {
    it('renders all variants from Variants story', () => {
      render(<Variants />);
      
      // Test that all variant buttons are rendered
      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Outline')).toBeInTheDocument();
      expect(screen.getByText('Ghost')).toBeInTheDocument();
      expect(screen.getByText('Link')).toBeInTheDocument();
    });
  });

  describe('Story Sizes Tests', () => {
    it('renders all sizes from Sizes story', () => {
      render(<Sizes />);
      
      // Test that all size buttons are rendered
      expect(screen.getByText('Extra Small')).toBeInTheDocument();
      expect(screen.getByText('Small')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Large')).toBeInTheDocument();
      expect(screen.getByText('Extra Large')).toBeInTheDocument();
    });
  });

  describe('Story States Tests', () => {
    it('renders all states from States story', () => {
      render(<States />);
      
      // Test different button states
      expect(screen.getByText('正常状态')).toBeInTheDocument();
      expect(screen.getByText('禁用状态')).toBeInTheDocument();
      expect(screen.getByText('加载中')).toBeInTheDocument();
      expect(screen.getByText('处理中...')).toBeInTheDocument();
      
      // Verify disabled button is actually disabled
      const disabledButton = screen.getByText('禁用状态');
      expect(disabledButton).toBeDisabled();
      
      // Verify loading buttons have aria-busy
      const loadingButtons = screen.getAllByRole('button', { busy: true });
      expect(loadingButtons).toHaveLength(2);
    });

    it('renders loading states from LoadingStates story', () => {
      render(<LoadingStates />);
      
      expect(screen.getByText('默认加载')).toBeInTheDocument();
      expect(screen.getByText('保存中...')).toBeInTheDocument();
      expect(screen.getByText('上传中...')).toBeInTheDocument();
      
      // All should be loading buttons with aria-busy
      const loadingButtons = screen.getAllByRole('button', { busy: true });
      expect(loadingButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Story Interactions Tests', () => {
    it('handles click events on interactive story', async () => {
      const user = userEvent.setup();
      render(<Interactive />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Interactive story should be clickable
      expect(button).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Interactive />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
      
      // Test space key
      await user.keyboard(' ');
      
      // Test enter key
      await user.keyboard('{Enter}');
    });

    it('disabled buttons from States story do not respond to clicks', async () => {
      const user = userEvent.setup();
      render(<States />);
      
      const disabledButton = screen.getByText('禁用状态');
      await user.click(disabledButton);
      
      // Should still be disabled
      expect(disabledButton).toBeDisabled();
    });
  });

  describe('Story Props Tests', () => {
    it('renders full width buttons from FullWidth story', () => {
      render(<FullWidth />);
      
      expect(screen.getByText('全宽主要按钮')).toBeInTheDocument();
      expect(screen.getByText('全宽边框按钮')).toBeInTheDocument();
      
      // Check if buttons have full width class
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('w-full');
      });
    });

    it('renders buttons with icons from WithIcons story', () => {
      render(<WithIcons />);
      
      expect(screen.getByText('下载')).toBeInTheDocument();
      expect(screen.getByText('继续')).toBeInTheDocument();
      expect(screen.getByText('保存并完成')).toBeInTheDocument();
      
      // Check for icon content
      expect(screen.getByText('📥')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
      expect(screen.getByText('💾')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('renders buttons with shadow from WithShadow story', () => {
      render(<WithShadow />);
      
      expect(screen.getByText('有阴影')).toBeInTheDocument();
      expect(screen.getByText('成功按钮')).toBeInTheDocument();
      expect(screen.getByText('错误按钮')).toBeInTheDocument();
    });
  });
});

/**
 * 使用示例：
 * 
 * 1. 运行单个测试：
 *    pnpm test -- Button.stories.test.tsx
 * 
 * 2. 运行所有 stories 测试：
 *    pnpm test -- --testNamePattern="Stories Integration"
 * 
 * 3. 在监视模式下运行：
 *    pnpm test:watch -- Button.stories.test.tsx
 * 
 * 4. 生成覆盖率报告：
 *    pnpm test:coverage -- Button.stories.test.tsx
 * 
 * 注意：此测试文件使用 composeStories 工具复用 Storybook stories
 * 遵循 Storybook 官方推荐的测试最佳实践
 */