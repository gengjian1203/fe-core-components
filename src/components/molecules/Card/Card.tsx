import React from 'react';
import { Card as AntdCard } from 'antd';
import type { CardProps as AntdCardProps } from 'antd';
import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps } from '@/types';
import { Button } from '@/components/atoms';

// Card组件属性接口
export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    Omit<BaseComponentProps, 'className'> {
  /** 自定义CSS类名 */
  className?: string;
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
 * Card 组件 - 基于 Antd Card 的二次封装，用于展示结构化内容
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
      style,
      ...props
    },
    ref
  ) => {
    // 构建自定义样式
    const cardStyle: React.CSSProperties = {
      ...(clickable && {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }),
      ...(variant === 'filled' && {
        backgroundColor: '#f5f5f5',
      }),
      ...style,
    };

    // 获取卡片尺寸
    const getCardSize = (): AntdCardProps['size'] => {
      switch (padding) {
        case 'sm':
        case 'none':
          return 'small';
        case 'lg':
          return 'default';
        default:
          return 'default';
      }
    };

    // 渲染封面图片
    const renderCover = (): ReactNode => {
      if (!coverImage) return null;

      return (
        <img
          alt={coverImageAlt ?? ''}
          src={coverImage}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLImageElement).style.transform = 'scale(1)';
          }}
        />
      );
    };

    // 渲染标题区域
    const renderTitle = (): ReactNode => {
      if (!title && !description && !header) return undefined;

      return (
        <div>
          {header}
          {title && (
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
          )}
          {description && (
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{description}</p>
          )}
        </div>
      );
    };

    // 渲染操作按钮
    const renderActions = (): ReactNode[] | undefined => {
      const actions: ReactNode[] = [];

      if (secondaryAction) {
        actions.push(
          <Button
            key='secondary'
            disabled={secondaryAction.disabled}
            size='sm'
            variant='outline'
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        );
      }

      if (primaryAction) {
        actions.push(
          <Button
            key='primary'
            disabled={primaryAction.disabled ?? false}
            loading={primaryAction.loading ?? false}
            size='sm'
            variant='primary'
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        );
      }

      return actions.length > 0 ? actions : undefined;
    };

    // 渲染底部内容
    const renderFooterContent = (): ReactNode => {
      if (!footer) return undefined;

      return (
        <div>
          {divider && (
            <div
              style={{
                borderTop: '1px solid #f0f0f0',
                marginBottom: '16px',
              }}
            />
          )}
          <div style={{ fontSize: '12px', color: '#888' }}>{footer}</div>
        </div>
      );
    };

    // 处理卡片点击
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      if (clickable && onClick) {
        onClick(event);
      }
    };

    // 处理键盘事件
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (clickable && (event.key === 'Enter' || event.key === ' ') && onClick) {
        event.preventDefault();
        // Create a synthetic mouse event for keyboard activation
        const syntheticEvent = {
          ...event,
          button: 0,
          buttons: 1,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          screenX: 0,
          screenY: 0,
          relatedTarget: null,
        } as React.MouseEvent<HTMLDivElement>;
        onClick(syntheticEvent);
      }
    };

    return (
      <AntdCard
        ref={ref}
        actions={renderActions()}
        bordered={variant === 'outlined'}
        className={className}
        cover={renderCover()}
        hoverable={clickable}
        role={clickable ? 'button' : undefined}
        size={getCardSize()}
        style={cardStyle}
        tabIndex={clickable ? 0 : undefined}
        title={renderTitle()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        {renderFooterContent()}
      </AntdCard>
    );
  }
);

Card.displayName = 'Card';
