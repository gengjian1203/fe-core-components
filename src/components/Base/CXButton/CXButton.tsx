import React from 'react';
import { cn } from '../../../utils';

export interface CXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'default' | 'dashed' | 'link' | 'danger';
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
  variant: 'primary' | 'default' | 'dashed' | 'link' | 'danger'
): string => {
  const variants = {
    primary: [
      // Fallback colors (without theme provider)
      'bg-blue-600 text-white border-blue-600 shadow-sm',
      'hover:bg-blue-500 hover:border-blue-500',
      'active:bg-blue-700 active:border-blue-700',
      'focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600',
      'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
      'disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:border-gray-200',
    ].join(' '),
    default: [
      // Fallback colors (without theme provider)
      'bg-white text-gray-900 border-gray-300 shadow-sm',
      'hover:text-blue-600 hover:border-blue-600',
      'active:text-blue-700 active:border-blue-700',
      'focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600',
      'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
      'disabled:cursor-not-allowed disabled:hover:bg-gray-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400',
      // Dark mode (without theme provider)
      'dark:bg-gray-800 dark:text-white dark:border-gray-600',
      'dark:hover:text-blue-400 dark:hover:border-blue-400 dark:hover:bg-gray-700',
      'dark:active:bg-gray-900 dark:active:border-blue-500',
      'dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-500',
    ].join(' '),
    dashed: [
      // Fallback colors (without theme provider)
      'bg-white text-gray-900 border-gray-300 border-dashed shadow-sm',
      'hover:text-blue-600 hover:border-blue-600',
      'active:text-blue-700 active:border-blue-700',
      'focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600',
      'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
      'disabled:cursor-not-allowed disabled:hover:bg-gray-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400',
      // Dark mode (without theme provider)
      'dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:border-dashed',
      'dark:hover:text-blue-400 dark:hover:border-blue-400 dark:hover:bg-gray-700',
      'dark:active:bg-gray-900 dark:active:border-blue-500',
      'dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-500',
    ].join(' '),
    link: [
      // Fallback colors (without theme provider)
      'bg-transparent text-blue-600 border-transparent shadow-none',
      'hover:text-blue-500',
      'active:text-blue-700',
      'focus:outline-none focus:ring-2 focus:ring-blue-600/20',
      'disabled:text-gray-400',
      'disabled:cursor-not-allowed disabled:hover:text-gray-400',
      'dark:text-blue-400 dark:hover:text-blue-300 dark:disabled:text-gray-500',
    ].join(' '),
    danger: [
      // Fallback colors (without theme provider)
      'bg-red-500 text-white border-red-500 shadow-sm',
      'hover:bg-red-400 hover:border-red-400',
      'active:bg-red-600 active:border-red-600',
      'focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500',
      'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
      'disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:border-gray-200',
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
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  }[size];

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        spinnerSize
      )}
    />
  );
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
