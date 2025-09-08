import { CXButton } from '@/components/Base/CXButton';
import { useCXTheme } from '@/components/Base/CXThemeProvider';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { cn } from '../../../utils';

export interface CXThemeToggleProps {
  className?: string;
  darkTooltip?: string;
  lightTooltip?: string;
  showTooltip?: boolean;
  size?: 'small' | 'middle' | 'large';
  variant?: 'default' | 'text' | 'primary' | 'link';
}

export const CXThemeToggle: React.FC<CXThemeToggleProps> = ({
  className,
  darkTooltip = '切换到暗色模式',
  lightTooltip = '切换到亮色模式',
  showTooltip = true,
  size = 'middle',
  variant = 'default',
}) => {
  const { mode, toggleMode, isDark } = useCXTheme();

  const icon = isDark ? <SunOutlined /> : <MoonOutlined />;
  const tooltipTitle = isDark ? lightTooltip : darkTooltip;

  const handleClick = (): void => {
    toggleMode();
  };

  const getVariant = (): 'primary' | 'default' | 'dashed' | 'link' | 'danger' => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'text':
      case 'link':
        return 'link';
      default:
        return 'default';
    }
  };

  const button = (
    <CXButton
      aria-label={`当前${mode === 'light' ? '亮色' : '暗色'}模式，点击${mode === 'light' ? '切换到暗色' : '切换到亮色'}模式`}
      className={cn(
        'cx-theme-toggle',
        'transition-all duration-300',
        variant === 'link' && 'border-none shadow-none hover:bg-transparent hover:text-primary-500',
        className
      )}
      data-testid='cx-theme-toggle'
      leftIcon={icon}
      size={size === 'middle' ? 'medium' : size}
      variant={getVariant()}
      onClick={handleClick}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip placement='bottom' title={tooltipTitle}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

CXThemeToggle.displayName = 'CXThemeToggle';
