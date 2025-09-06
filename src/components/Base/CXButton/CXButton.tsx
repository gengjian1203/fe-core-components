import Button, { type ButtonProps } from 'antd/es/button';
import React from 'react';
import { cn } from '../../../utils';

export interface CXButtonProps extends Omit<ButtonProps, 'loading' | 'variant' | 'size'> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const sizeMap = {
  small: 'small',
  medium: 'middle',
  large: 'large',
} as const;

const variantMap = {
  primary: { type: 'primary' as const },
  secondary: { type: 'default' as const },
  outline: { type: 'default' as const, variant: 'outlined' as const },
  ghost: { type: 'default' as const, ghost: true },
  danger: { type: 'primary' as const, danger: true },
} as const;

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
  ...props
}) => {
  const variantProps = variantMap[variant];
  const antdSize = sizeMap[size];

  const buttonProps = {
    ...props,
    ...variantProps,
    size: antdSize,
    loading,
    disabled: disabled ?? loading,
    className: cn('transition-all duration-200', variant === 'outline' && 'border-2', className),
  };

  const renderContent = (): React.ReactNode => {
    if (loading && loadingText) {
      return loadingText;
    }

    return (
      <span
        className={cn('flex items-center justify-center gap-2')}
        style={{ pointerEvents: 'none' }}
      >
        {leftIcon && <span className='flex-shrink-0'>{leftIcon}</span>}
        {children && <span>{children}</span>}
        {rightIcon && <span className='flex-shrink-0'>{rightIcon}</span>}
      </span>
    );
  };

  return <Button {...buttonProps}>{renderContent()}</Button>;
};

CXButton.displayName = 'CXButton';
