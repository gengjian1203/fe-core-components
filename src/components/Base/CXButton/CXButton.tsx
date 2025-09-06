import React from 'react';
import { cn } from '../../../utils';

export interface CXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  small: 'px-2 py-1 text-sm h-7 min-w-16',
  medium: 'px-4 py-2 text-base h-8 min-w-20',
  large: 'px-6 py-3 text-lg h-10 min-w-24',
} as const;

const variantClasses = {
  primary:
    'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500',
  secondary:
    'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 hover:border-gray-400 focus:ring-gray-500',
  outline:
    'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:border-blue-700 focus:ring-blue-500',
  ghost: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100 focus:ring-gray-500',
  danger:
    'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-500',
} as const;

const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
const loadingClasses = 'cursor-wait';

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
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled ?? loading;

  const buttonClasses = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-md border transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeClasses[size],
    variantClasses[variant],
    isDisabled && disabledClasses,
    loading && loadingClasses,
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
