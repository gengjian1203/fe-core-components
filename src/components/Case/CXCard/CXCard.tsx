import React from 'react';
import { Avatar, Card, type CardProps, Space, Tag } from 'antd';
import { cn } from '../../../utils';

export interface CXCardProps extends Omit<CardProps, 'cover' | 'variant'> {
  variant?: 'default' | 'bordered' | 'shadow' | 'minimal';
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  headerIcon?: React.ReactNode;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  cover?: React.ReactNode | string;
  avatar?: {
    src?: string;
    icon?: React.ReactNode;
    text?: string;
    size?: number | 'large' | 'small' | 'default';
  };
  tags?: Array<{
    text: string;
    color?: string;
    variant?: 'default' | 'outlined';
  }>;
  metadata?: Array<{
    label: string;
    value: React.ReactNode;
  }>;
  loading?: boolean;
  clickable?: boolean;
  onCardClick?: () => void;
  className?: string;
}

const variantClasses = {
  default: '',
  bordered: 'border-2',
  shadow: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
  minimal: 'border-0 shadow-none bg-transparent',
};

const statusColors = {
  default: '',
  success: 'border-l-4 border-l-green-500',
  warning: 'border-l-4 border-l-yellow-500',
  error: 'border-l-4 border-l-red-500',
  info: 'border-l-4 border-l-blue-500',
};

export const CXCard: React.FC<CXCardProps> = ({
  children,
  variant = 'default',
  status = 'default',
  headerIcon,
  headerActions,
  footer,
  cover,
  avatar,
  tags,
  metadata,
  loading = false,
  clickable = false,
  onCardClick,
  className,
  title,
  extra,
  ...props
}) => {
  const handleCardClick = (): void => {
    if (clickable && onCardClick) {
      onCardClick();
    }
  };

  const renderTitle = (): React.ReactNode => {
    if (!title && !headerIcon) return undefined;

    return (
      <div className='flex items-center gap-2'>
        {headerIcon && <span className='flex-shrink-0'>{headerIcon}</span>}
        {title && <span className='flex-1'>{title}</span>}
      </div>
    );
  };

  const renderExtra = (): React.ReactNode => {
    if (!extra && !headerActions) return undefined;

    return (
      <div className='flex items-center gap-2'>
        {extra && <span>{extra}</span>}
        {headerActions && <span>{headerActions}</span>}
      </div>
    );
  };

  const renderAvatar = (): React.ReactNode => {
    if (!avatar) return null;

    return (
      <div className='mb-4'>
        <Avatar icon={avatar.icon} size={avatar.size ?? 'default'} src={avatar.src}>
          {avatar.text}
        </Avatar>
      </div>
    );
  };

  const renderTags = (): React.ReactNode => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className='mb-4'>
        <Space wrap>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              {...(tag.color && { color: tag.color })}
              {...(tag.variant === 'outlined' && {
                style: { borderStyle: 'solid' as const, background: 'transparent' },
              })}
            >
              {tag.text}
            </Tag>
          ))}
        </Space>
      </div>
    );
  };

  const renderMetadata = (): React.ReactNode => {
    if (!metadata || metadata.length === 0) return null;

    return (
      <div className='mb-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {metadata.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row sm:justify-between'>
              <span className='text-gray-500 text-sm'>{item.label}:</span>
              <span className='font-medium'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCover = (): React.ReactNode => {
    if (!cover) return undefined;

    if (typeof cover === 'string') {
      return <img alt='card-cover' className='w-full h-48 object-cover' src={cover} />;
    }

    return cover;
  };

  const renderFooter = (): React.ReactNode => {
    if (!footer) return null;

    return <div className='pt-4 mt-4 border-t border-gray-200'>{footer}</div>;
  };

  const cardProps = {
    ...props,
    title: renderTitle(),
    extra: renderExtra(),
    loading,
    cover: renderCover(),
    className: cn(
      'transition-all duration-200',
      variantClasses[variant],
      statusColors[status],
      clickable && 'cursor-pointer hover:shadow-md',
      className
    ),
    onClick: clickable ? handleCardClick : undefined,
  };

  return (
    <Card {...cardProps}>
      {renderAvatar()}
      {renderTags()}
      {renderMetadata()}
      {children}
      {renderFooter()}
    </Card>
  );
};

CXCard.displayName = 'CXCard';
