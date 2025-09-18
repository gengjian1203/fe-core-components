import { CXIcon } from '@/components/Base/CXIcon';
import { cn } from '@/utils';
import React from 'react';

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
    | 'ghost';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
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
): string => {
  const variants = {
    primary: [
      // Use bg-primary with no border
      'bg-primary text-white border-transparent',
      'hover:bg-primary hover:opacity-90 hover:scale-[1.02]',
      'active:bg-primary active:opacity-80 active:scale-[0.98] active:duration-75',
      'focus:outline-none focus:ring-2 focus:ring-primary ring-opacity-20',
      'disabled:bg-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-gray-100 disabled:hover:scale-100',
    ].join(' '),
    default: [
      // Use theme colors
      'bg-white text-gray-900 border-gray-300',
      'hover:text-primary hover:border-primary',
      'active:text-primary text-opacity-80 active:border-primary border-opacity-80',
      'focus:outline-none focus:ring-2 focus:ring-primary ring-opacity-20 focus:border-primary',
      'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-gray-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400',
      // Dark mode
      'dark:bg-gray-800 dark:text-white dark:border-gray-600',
      'dark:hover:text-primary dark:hover:border-primary dark:hover:bg-gray-700',
      'dark:active:bg-gray-900 dark:active:border-primary border-opacity-80',
      'dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-500',
    ].join(' '),
    dashed: [
      // Use theme colors
      'bg-white text-gray-900 border-gray-300 border-dashed',
      'hover:text-primary hover:border-primary',
      'active:text-primary text-opacity-80 active:border-primary border-opacity-80',
      'focus:outline-none focus:ring-2 focus:ring-primary ring-opacity-20 focus:border-primary',
      'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-gray-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400',
      // Dark mode
      'dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:border-dashed',
      'dark:hover:text-primary dark:hover:border-primary dark:hover:bg-gray-700',
      'dark:active:bg-gray-900 dark:active:border-primary border-opacity-80',
      'dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-500',
    ].join(' '),
    link: [
      // Use theme colors
      'bg-transparent text-primary border-transparent',
      'hover:text-primary text-opacity-80',
      'active:text-primary text-opacity-60',
      'focus:outline-none focus:ring-2 focus:ring-primary ring-opacity-20',
      'disabled:text-gray-400',
      'disabled:hover:text-gray-400',
      'dark:text-primary dark:hover:text-primary text-opacity-80 dark:disabled:text-gray-500',
    ].join(' '),
    danger: [
      // No border for background color variant
      'bg-red-500 text-white border-transparent',
      'hover:bg-red-400',
      'active:bg-red-600',
      'focus:outline-none focus:ring-2 focus:ring-red-500/20',
      'disabled:bg-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-gray-100',
    ].join(' '),
    destructive: [
      'bg-red-500 text-white border-transparent',
      'hover:bg-red-400',
      'active:bg-red-600',
      'focus:outline-none focus:ring-2 focus:ring-red-500/20',
      'disabled:bg-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-gray-100',
    ].join(' '),
    outline: [
      'bg-transparent text-gray-900 border-gray-300',
      'hover:bg-gray-50 hover:text-gray-900',
      'active:bg-gray-100',
      'focus:outline-none focus:ring-2 focus:ring-primary ring-opacity-20 focus:border-primary',
      'disabled:bg-transparent disabled:border-gray-200 disabled:text-gray-400',
      'disabled:hover:bg-transparent',
      // Dark mode - follow default pattern
      'dark:bg-transparent dark:text-white dark:border-gray-600',
      'dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-gray-600',
      'dark:active:bg-gray-900 dark:active:border-gray-600',
      'dark:disabled:bg-transparent dark:disabled:border-gray-700 dark:disabled:text-gray-500',
    ].join(' '),
    secondary: [
      'bg-gray-100 text-gray-900 border-transparent',
      'hover:bg-gray-200',
      'active:bg-gray-300',
      'focus:outline-none focus:ring-2 focus:ring-gray-500/20',
      'disabled:bg-gray-50 disabled:text-gray-400',
      'disabled:hover:bg-gray-50',
      'dark:bg-gray-700 dark:text-white',
      'dark:hover:bg-gray-600',
      'dark:active:bg-gray-800',
      'dark:disabled:bg-gray-800 dark:disabled:text-gray-500',
    ].join(' '),
    ghost: [
      'bg-transparent text-gray-900 border-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'active:bg-gray-200',
      'focus:outline-none focus:ring-2 focus:ring-gray-500/20',
      'disabled:bg-transparent disabled:text-gray-400',
      'disabled:hover:bg-transparent disabled:hover:text-gray-400',
      // Dark mode - follow default pattern
      'dark:bg-transparent dark:text-white',
      'dark:hover:bg-gray-700 dark:hover:text-white',
      'dark:active:bg-gray-900',
      'dark:disabled:bg-transparent dark:disabled:text-gray-500',
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

  return <CXIcon className='animate-spin' name='IconLoading' size={spinnerSize} />;
};

export const CXButton: React.FC<CXButtonProps> = ({
  children,
  loading = false,
  loadingText,
  variant = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
  disabled,
  type = 'button',
  block = false,
  shape = 'default',
  ...props
}) => {
  const isDisabled = disabled ?? loading;

  const buttonClasses = cn(
    // Base classes
    'inline-flex items-center justify-center font-medium border transition-all duration-200',
    'relative select-none touch-manipulation whitespace-nowrap',
    // Cursor classes
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    // Size and shape classes
    getSizeClasses(size, shape),
    getShapeClasses(shape),
    // Variant classes
    getVariantClasses(variant),
    // Block class
    block && 'w-full',
    // Loading classes
    loading && loadingClasses,
    // Gap classes (only when not circle)
    shape !== 'circle' && (leftIcon || rightIcon || loading) && children ? 'gap-1' : '',
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
        {!loading && leftIcon && <span className='flex-shrink-0'>{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className='flex-shrink-0'>{rightIcon}</span>}
      </>
    );
  };

  return (
    <button
      {...props}
      aria-disabled={isDisabled}
      className={buttonClasses}
      disabled={isDisabled}
      type={type}
    >
      {renderContent()}
    </button>
  );
};

CXButton.displayName = 'CXButton';
