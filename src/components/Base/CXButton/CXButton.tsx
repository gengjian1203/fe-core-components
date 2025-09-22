import { cn } from '@/utils';
import React from 'react';
import { CXIconLoading } from '../../Base/CXIcon';

export interface CXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?:
    | 'primary'
    | 'default'
    | 'dashed'
    | 'link'
    | 'danger'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'text';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  width?: number | string;
  height?: number | string;
  renderLeftContent?: () => React.ReactNode;
  renderRightContent?: () => React.ReactNode;
  className?: string;
  classNameChildren?: string;
  block?: boolean;
  shape?: 'default' | 'circle' | 'round';
}

const getSizeClasses = (
  size: 'small' | 'medium' | 'large',
  shape: 'default' | 'circle' | 'round'
): string => {
  const baseClasses = {
    small: {
      default: 'px-2 py-0 text-sm h-6 min-w-6 leading-[1.5715]',
      circle: 'w-6 h-6 p-0 text-sm',
      round: 'px-2 py-0 text-sm h-6 min-w-6 leading-[1.5715] rounded-full',
    },
    medium: {
      default: 'px-4 py-1 text-sm h-8 min-w-8 leading-[1.5715]',
      circle: 'w-8 h-8 p-0 text-sm',
      round: 'px-4 py-1 text-sm h-8 min-w-8 leading-[1.5715] rounded-full',
    },
    large: {
      default: 'px-4 py-2 text-base h-10 min-w-10 leading-[1.5]',
      circle: 'w-10 h-10 p-0 text-base',
      round: 'px-4 py-2 text-base h-10 min-w-10 leading-[1.5] rounded-full',
    },
  };
  return baseClasses[size][shape];
};

const getVariantClasses = (
  variant:
    | 'primary'
    | 'default'
    | 'dashed'
    | 'link'
    | 'danger'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'text'
): string => {
  const variants = {
    primary: [
      // Use bg-primary with no border
      'bg-primary text-white border-transparent',
      'hover:bg-primary hover:opacity-90',
      'active:bg-primary active:opacity-80 active:duration-75',
      'disabled:bg-neutral-200 disabled:text-neutral-400',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    default: [
      // Use theme colors
      'bg-white text-neutral-900 border-neutral-300',
      'hover:text-primary hover:border-primary',
      'active:text-primary/80 active:border-primary/80',
      'disabled:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-400',
      'disabled:hover:bg-neutral-50 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400',
      // Dark mode
      'dark_cx:bg-neutral-800 dark_cx:text-white dark_cx:border-neutral-600',
      'dark_cx:hover:text-primary dark_cx:hover:border-primary dark_cx:hover:bg-neutral-700',
      'dark_cx:active:bg-neutral-900 dark_cx:active:border-primary/80',
      'dark_cx:disabled:bg-neutral-800 dark_cx:disabled:border-neutral-700 dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    dashed: [
      // Use theme colors
      'bg-white text-neutral-900 border-neutral-300 border-dashed',
      'hover:text-primary hover:border-primary',
      'active:text-primary/80 active:border-primary/80',
      'disabled:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-400',
      'disabled:hover:bg-neutral-50 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400',
      // Dark mode
      'dark_cx:bg-neutral-800 dark_cx:text-white dark_cx:border-neutral-600 dark_cx:border-dashed',
      'dark_cx:hover:text-primary dark_cx:hover:border-primary dark_cx:hover:bg-neutral-700',
      'dark_cx:active:bg-neutral-900 dark_cx:active:border-primary/80',
      'dark_cx:disabled:bg-neutral-800 dark_cx:disabled:border-neutral-700 dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    link: [
      // Use theme colors
      'bg-transparent text-primary border-transparent',
      'hover:text-primary/80',
      'active:text-primary/60',
      'disabled:text-neutral-400',
      'disabled:hover:text-neutral-400',
      'dark_cx:text-primary dark_cx:hover:text-primary/80 dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    danger: [
      // No border for background color variant
      'bg-red-500 text-white border-transparent',
      'hover:bg-red-400',
      'active:bg-red-600',
      'disabled:bg-neutral-200 disabled:text-neutral-400',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    destructive: [
      'bg-red-500 text-white border-transparent',
      'hover:bg-red-400',
      'active:bg-red-600',
      'disabled:bg-neutral-200 disabled:text-neutral-400',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    outline: [
      'bg-transparent text-neutral-900 border-neutral-300',
      'hover:bg-neutral-50 hover:text-neutral-900',
      'active:bg-neutral-100',
      'disabled:bg-transparent disabled:border-neutral-200 disabled:text-neutral-400',
      'disabled:hover:bg-transparent',
      // Dark mode - follow default pattern
      'dark_cx:bg-transparent dark_cx:text-white dark_cx:border-neutral-600',
      'dark_cx:hover:bg-neutral-700 dark_cx:hover:text-white dark_cx:hover:border-neutral-600',
      'dark_cx:active:bg-neutral-900 dark_cx:active:border-neutral-600',
      'dark_cx:disabled:bg-transparent dark_cx:disabled:border-neutral-700 dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    secondary: [
      'bg-neutral-100 text-neutral-900 border-transparent',
      'hover:bg-neutral-200',
      'active:bg-neutral-300',
      'disabled:bg-neutral-50 disabled:text-neutral-400',
      'disabled:hover:bg-neutral-50',
      'dark_cx:bg-neutral-700 dark_cx:text-white',
      'dark_cx:hover:bg-neutral-600',
      'dark_cx:active:bg-neutral-800',
      'dark_cx:disabled:bg-neutral-800 dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    ghost: [
      'bg-transparent text-neutral-900 border-transparent',
      'hover:bg-neutral-100 hover:text-neutral-900',
      'active:bg-neutral-200',
      'disabled:bg-transparent disabled:text-neutral-400',
      'disabled:hover:bg-transparent disabled:hover:text-neutral-400',
      // Dark mode - follow default pattern
      'dark_cx:bg-transparent dark_cx:text-white',
      'dark_cx:hover:bg-neutral-700 dark_cx:hover:text-white',
      'dark_cx:active:bg-neutral-900',
      'dark_cx:disabled:bg-transparent dark_cx:disabled:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
    text: [
      'bg-transparent text-neutral-900 border-transparent',
      'hover:text-neutral-700',
      'active:text-neutral-800',
      'disabled:bg-transparent disabled:text-neutral-400',
      'disabled:hover:text-neutral-400',
      // Dark mode
      'dark_cx:bg-transparent dark_cx:text-white',
      'dark_cx:hover:text-neutral-300',
      'dark_cx:active:text-neutral-400',
      'dark_cx:disabled:bg-transparent dark_cx:disabled:text-neutral-500',
      'dark_cx:disabled:hover:text-neutral-500',
      'disabled:hover:opacity-100 disabled:active:opacity-100',
    ].join(' '),
  };
  return variants[variant];
};

const getShapeClasses = (shape: 'default' | 'circle' | 'round'): string => {
  const shapes = {
    default: 'rounded-md',
    circle: 'rounded-full',
    round: 'rounded-full',
  };
  return shapes[shape];
};

const loadingClasses = 'pointer-events-none';

const LoadingSpinner: React.FC<{ size: 'small' | 'medium' | 'large' }> = ({ size }) => {
  const spinnerSize = {
    small: 12,
    medium: 16,
    large: 20,
  }[size];

  return <CXIconLoading className='animate-spin' height={spinnerSize} width={spinnerSize} />;
};

export const CXButton: React.FC<CXButtonProps> = ({
  children,
  loading = false,
  loadingText,
  variant = 'default',
  size = 'medium',
  width,
  height,
  renderLeftContent,
  renderRightContent,
  className,
  classNameChildren = '',
  disabled,
  type = 'button',
  block = false,
  shape = 'default',
  ...props
}) => {
  const isDisabled = disabled ?? loading;

  // Custom size styles when width or height are specified
  const customSizeStyles: React.CSSProperties = {};
  if (width !== undefined) {
    customSizeStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    customSizeStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  const buttonClasses = cn(
    // Base classes
    'inline-flex items-center justify-center font-medium border transition-all duration-200',
    'relative select-none touch-manipulation whitespace-nowrap',
    // Cursor classes
    isDisabled ? '!cursor-not-allowed' : '!cursor-pointer',
    // Size and shape classes (only if no custom width/height)
    !(width ?? height) && getSizeClasses(size, shape),
    getShapeClasses(shape),
    // Variant classes
    getVariantClasses(variant),
    // Block class
    block && 'w-full',
    // Loading classes
    loading && loadingClasses,
    // Gap classes (only when not circle)
    shape !== 'circle' && (renderLeftContent || renderRightContent || loading) && children
      ? 'gap-1'
      : '',
    className
  );

  const renderContent = (): React.ReactNode => {
    if (loading && loadingText) {
      return (
        <>
          <LoadingSpinner size={size} />
          {loadingText}
        </>
      );
    }

    return (
      <>
        {loading && <LoadingSpinner size={size} />}
        {!loading && renderLeftContent && <div className='shrink-0'>{renderLeftContent?.()}</div>}
        {children && (
          <div className={cn('flex-1 flex flex-row', classNameChildren)}>{children}</div>
        )}
        {!loading && renderRightContent && <div className='shrink-0'>{renderRightContent?.()}</div>}
      </>
    );
  };

  return (
    <button
      {...props}
      aria-disabled={isDisabled}
      className={buttonClasses}
      disabled={isDisabled}
      style={{ ...customSizeStyles, ...props.style }}
      type={type}
    >
      {renderContent()}
    </button>
  );
};

CXButton.displayName = 'CXButton';
