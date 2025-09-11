import React from 'react';
import { cn } from '../../../utils';

export interface CXCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

const variantClasses = {
  default: [
    // Light mode
    'bg-white text-gray-900 border border-gray-200 rounded-lg',
    // Dark mode
    'dark:bg-gray-800 dark:text-white dark:border-gray-700',
  ].join(' '),
  bordered: [
    // Light mode
    'bg-white text-gray-900 border-2 border-gray-300 rounded-lg',
    // Dark mode  
    'dark:bg-gray-800 dark:text-white dark:border-gray-600',
  ].join(' '),
  shadow: [
    // Light mode
    'bg-white text-gray-900 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl',
    // Dark mode
    'dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:shadow-gray-900/50',
    'transition-shadow duration-300',
  ].join(' '),
  minimal: [
    // Light mode
    'bg-transparent text-gray-900 border-0 shadow-none rounded-none',
    // Dark mode
    'dark:text-white',
  ].join(' '),
};

const statusColors = {
  default: '',
  success: [
    // Light mode
    'border-l-4 border-l-green-500',
    // Dark mode - brighter green for better visibility
    'dark:border-l-green-400',
  ].join(' '),
  warning: [
    // Light mode
    'border-l-4 border-l-yellow-500',
    // Dark mode - brighter yellow for better visibility
    'dark:border-l-yellow-400',
  ].join(' '),
  error: [
    // Light mode
    'border-l-4 border-l-red-500',
    // Dark mode - brighter red for better visibility
    'dark:border-l-red-400',
  ].join(' '),
  info: [
    // Light mode
    'border-l-4 border-l-blue-500',
    // Dark mode - brighter blue for better visibility
    'dark:border-l-blue-400',
  ].join(' '),
};

const getAvatarSizeClass = (size: number | 'large' | 'small' | 'default'): string => {
  if (typeof size === 'number') {
    return `w-${size} h-${size}`;
  }
  
  const sizeClasses = {
    small: 'w-6 h-6 text-xs',
    default: 'w-8 h-8 text-sm',
    large: 'w-12 h-12 text-base',
  };
  
  return sizeClasses[size];
};

const LoadingSpinner: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>
  </div>
);

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

  const renderHeader = (): React.ReactNode => {
    if (!title && !extra && !headerIcon && !headerActions) return null;

    return (
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {headerIcon && <span className="flex-shrink-0">{headerIcon}</span>}
          {title && <span className="text-lg font-semibold text-gray-900 dark:text-white">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          {extra && <span>{extra}</span>}
          {headerActions && <span>{headerActions}</span>}
        </div>
      </div>
    );
  };

  const renderAvatar = (): React.ReactNode => {
    if (!avatar) return null;

    const sizeClass = getAvatarSizeClass(avatar.size ?? 'default');

    return (
      <div className="mb-4">
        <div className={cn(
          'rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden',
          sizeClass
        )}>
          {avatar.src ? (
            <img alt="avatar" className="w-full h-full object-cover" src={avatar.src} />
          ) : avatar.icon ?? (avatar.text ? (
            <span className="font-medium text-gray-600 dark:text-gray-300">{avatar.text}</span>
          ) : null)}
        </div>
      </div>
    );
  };

  const renderTags = (): React.ReactNode => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                tag.variant === 'outlined'
                  ? [
                      'border border-gray-300 bg-transparent text-gray-700',
                      'dark:border-gray-600 dark:text-gray-300'
                    ].join(' ')
                  : [
                      'bg-blue-100 text-blue-800',
                      'dark:bg-blue-900/30 dark:text-blue-300'
                    ].join(' '),
                tag.color && `bg-${tag.color}-100 text-${tag.color}-800`
              )}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderMetadata = (): React.ReactNode => {
    if (!metadata || metadata.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {metadata.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{item.label}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCover = (): React.ReactNode => {
    if (!cover) return null;

    if (typeof cover === 'string') {
      return (
        <div className="overflow-hidden rounded-t-lg">
          <img alt="card-cover" className="w-full h-48 object-cover" src={cover} />
        </div>
      );
    }

    return <div className="rounded-t-lg overflow-hidden">{cover}</div>;
  };

  const renderFooter = (): React.ReactNode => {
    if (!footer) return null;

    return (
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
        {footer}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn(variantClasses[variant], statusColors[status], className)}>
        <div className="p-6">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...props}
      className={cn(
        'transition-all duration-200',
        variantClasses[variant],
        statusColors[status],
        clickable && [
          'cursor-pointer hover:shadow-md',
          'dark:hover:shadow-gray-900/50'
        ].join(' '),
        className
      )}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? handleCardClick : undefined}
      onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick() : undefined}
    >
      {renderCover()}
      {renderHeader()}
      <div className="p-6">
        {renderAvatar()}
        {renderTags()}
        {renderMetadata()}
        {children}
      </div>
      {renderFooter()}
    </div>
  );
};

CXCard.displayName = 'CXCard';
