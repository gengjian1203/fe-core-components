import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps } from '@/types';
import { cn } from '@/utils';
import { Button } from '@/components/atoms';

// Card组件属性接口
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseComponentProps {
  /** 卡片标题 */
  title?: ReactNode;
  /** 卡片描述 */
  description?: ReactNode;
  /** 卡片内容 */
  children?: ReactNode;
  /** 卡片变体 */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** 是否可点击 */
  clickable?: boolean;
  /** 卡片头部内容 */
  header?: ReactNode;
  /** 卡片底部内容 */
  footer?: ReactNode;
  /** 封面图片URL */
  coverImage?: string;
  /** 封面图片alt文本 */
  coverImageAlt?: string;
  /** 主要操作按钮 */
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  /** 次要操作按钮 */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  /** 是否显示分隔线 */
  divider?: boolean;
  /** 内边距大小 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card 组件 - 卡片容器组件，用于展示结构化内容
 * 
 * @example
 * ```tsx
 * <Card
 *   title="卡片标题"
 *   description="卡片描述"
 *   primaryAction={{ label: '查看详情', onClick: handleView }}
 * >
 *   卡片内容
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      children,
      variant = 'elevated',
      clickable = false,
      header,
      footer,
      coverImage,
      coverImageAlt,
      primaryAction,
      secondaryAction,
      divider = false,
      padding = 'md',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // 构建CSS类名
    const cardClasses = cn(
      // 基础样式
      'relative',
      'bg-white',
      'dark:bg-neutral-800',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'overflow-hidden',
      
      // 变体样式
      {
        // elevated变体 - 带阴影
        'shadow-soft hover:shadow-medium': variant === 'elevated',
        
        // outlined变体 - 带边框
        'border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600': 
          variant === 'outlined',
          
        // filled变体 - 填充背景
        'bg-neutral-50 dark:bg-neutral-900': variant === 'filled'
      },
      
      // 可点击样式
      {
        'cursor-pointer hover:scale-[1.02] active:scale-[0.98]': clickable,
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2': clickable
      },
      
      className
    );

    // 内容区域的内边距
    const paddingClasses = cn({
      'p-0': padding === 'none',
      'p-4': padding === 'sm',
      'p-6': padding === 'md',
      'p-8': padding === 'lg'
    });

    // 渲染封面图片
    const renderCoverImage = (): ReactNode => {
      if (!coverImage) return null;

      return (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={coverImage}
            alt={coverImageAlt || ''}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      );
    };

    // 渲染头部
    const renderHeader = (): ReactNode => {
      if (!header && !title && !description) return null;

      return (
        <div className={cn('space-y-2', paddingClasses, { 'pb-0': children || footer })}>
          {header}
          {title && (
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      );
    };

    // 渲染内容
    const renderContent = (): ReactNode => {
      if (!children) return null;

      return (
        <div className={cn('text-neutral-700 dark:text-neutral-300', paddingClasses, {
          'pt-0': header || title || description,
          'pb-0': footer || primaryAction || secondaryAction
        })}>
          {children}
        </div>
      );
    };

    // 渲染操作按钮区域
    const renderActions = (): ReactNode => {
      if (!primaryAction && !secondaryAction) return null;

      return (
        <div className={cn('flex gap-3', paddingClasses, 'pt-0')}>
          {secondaryAction && (
            <Button
              variant="outline"
              size="sm"
              disabled={secondaryAction.disabled}
              onClick={secondaryAction.onClick}
              className="flex-1"
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant="primary"
              size="sm"
              loading={primaryAction.loading}
              disabled={primaryAction.disabled}
              onClick={primaryAction.onClick}
              className={cn({ 'flex-1': !secondaryAction })}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      );
    };

    // 渲染底部
    const renderFooter = (): ReactNode => {
      if (!footer) return null;

      return (
        <div className={cn(paddingClasses, 'pt-0')}>
          {divider && (
            <div className="mb-4 border-t border-neutral-200 dark:border-neutral-700" />
          )}
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {footer}
          </div>
        </div>
      );
    };

    // 处理卡片点击
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      if (clickable && onClick) {
        onClick(event);
      }
    };

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? (e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault();
            onClick(e as any);
          }
        } : undefined}
        {...props}
      >
        {renderCoverImage()}
        {renderHeader()}
        {renderContent()}
        {renderActions()}
        {renderFooter()}
      </div>
    );
  }
);

Card.displayName = 'Card';