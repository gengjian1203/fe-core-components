import type { AccessibilityProps, ColorVariant, ComponentSize, LoadingProps } from '@/types';
import { cn, getSizeClasses, getVariantClasses } from '@/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';

// Button组件属性接口
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    LoadingProps,
    AccessibilityProps {
  /** 按钮变体 */
  variant?: ColorVariant | 'outline' | 'ghost' | 'link';
  /** 按钮大小 */
  size?: ComponentSize;
  /** 子组件内容 */
  children: ReactNode;
  /** 是否全宽 */
  fullWidth?: boolean;
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 按钮形状 */
  shape?: 'rectangle' | 'square' | 'circle';
  /** 是否显示阴影 */
  shadow?: boolean;
  /** 自定义CSS类名 */
  className?: string;
}

/**
 * Button 组件 - 基础按钮组件
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   点击我
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      disabled = false,
      loading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      shape = 'rectangle',
      shadow = false,
      className,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    // 处理点击事件
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // 构建CSS类名
    const buttonClasses = cn(
      // 基础样式
      'btn-base',
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'border',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',

      // 尺寸相关
      getSizeClasses(size),

      // 形状相关
      {
        'rounded-md': shape === 'rectangle',
        'rounded-lg aspect-square': shape === 'square',
        'rounded-full aspect-square': shape === 'circle',
      },

      // 宽度相关
      {
        'w-full': fullWidth,
        'w-auto': !fullWidth,
      },

      // 变体样式
      {
        // Primary变体
        [cn(
          getVariantClasses(variant as ColorVariant, 'bg'),
          'border-transparent',
          'text-white',
          'focus:ring-primary-500'
        )]:
          variant === 'primary' ||
          variant === 'secondary' ||
          variant === 'success' ||
          variant === 'warning' ||
          variant === 'error' ||
          variant === 'info',

        // Outline变体
        'border-current bg-transparent hover:bg-current hover:text-white focus:ring-primary-500':
          variant === 'outline',

        // Ghost变体
        'border-transparent bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-primary-500':
          variant === 'ghost',

        // Link变体
        'border-none bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline p-0 focus:ring-primary-500':
          variant === 'link',
      },

      // 阴影
      {
        'shadow-md hover:shadow-lg': shadow && !disabled && !loading,
      },

      // 禁用状态
      {
        'opacity-50 cursor-not-allowed': disabled || loading,
        'cursor-pointer': !disabled && !loading,
      },

      // 加载状态
      {
        'cursor-wait': loading,
      },

      className
    );

    // 渲染加载指示器
    const renderLoadingIndicator = (): ReactNode => (
      <svg
        className='animate-spin -ml-1 mr-2 h-4 w-4'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    );

    // 渲染按钮内容
    const renderContent = (): ReactNode => {
      if (loading) {
        return (
          <>
            {renderLoadingIndicator()}
            {loadingText || children}
          </>
        );
      }

      return (
        <>
          {leftIcon && <span className={cn('inline-flex', { 'mr-2': children })}>{leftIcon}</span>}
          {children}
          {rightIcon && (
            <span className={cn('inline-flex', { 'ml-2': children })}>{rightIcon}</span>
          )}
        </>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';
