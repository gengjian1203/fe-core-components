import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import type { AccessibilityProps, ColorVariant, ComponentSize, LoadingProps } from '@/types';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Button组件属性接口
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type'>,
    LoadingProps,
    Omit<AccessibilityProps, 'aria-invalid'> {
  /** aria-invalid属性 */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
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
  /** 按钮类型 */
  type?: 'button' | 'submit' | 'reset';
}

// Antd变体映射
const getAntdType = (
  variant: ButtonProps['variant'] = 'primary'
): NonNullable<AntdButtonProps['type']> => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'success':
    case 'warning':
    case 'info':
      return 'primary';
    case 'error':
      return 'primary'; // danger状态通过danger prop处理
    case 'outline':
      return 'default';
    case 'ghost':
      return 'text';
    case 'link':
      return 'link';
    default:
      return 'primary';
  }
};

// 获取危险状态
const getDanger = (variant: ButtonProps['variant']): boolean => {
  return variant === 'error';
};

// 尺寸映射
const getAntdSize = (size: ComponentSize): AntdButtonProps['size'] => {
  switch (size) {
    case 'xs':
    case 'sm':
      return 'small';
    case 'md':
      return 'middle';
    case 'lg':
    case 'xl':
      return 'large';
    default:
      return 'middle';
  }
};

// 形状映射
const getAntdShape = (
  shape: ButtonProps['shape'] = 'rectangle'
): NonNullable<AntdButtonProps['shape']> => {
  switch (shape) {
    case 'circle':
      return 'circle';
    case 'square':
      return 'default';
    default:
      return 'default';
  }
};

/**
 * Button 组件 - 基于 Antd Button 的二次封装
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
      style,
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

    // 构建自定义样式
    const customStyles: React.CSSProperties = {
      ...(fullWidth && { width: '100%' }),
      ...(shadow &&
        !disabled &&
        !loading && {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
      ...(shape === 'square' && {
        aspectRatio: '1',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),
      ...style,
    };

    // 渲染按钮内容
    const renderContent = (): ReactNode => {
      if (loading && loadingText) {
        return loadingText;
      }

      return (
        <>
          {leftIcon && <span style={{ marginRight: children ? 8 : 0 }}>{leftIcon}</span>}
          {children}
          {rightIcon && <span style={{ marginLeft: children ? 8 : 0 }}>{rightIcon}</span>}
        </>
      );
    };

    return (
      <AntdButton
        ref={ref}
        className={className}
        danger={getDanger(variant)}
        disabled={disabled}
        htmlType={type}
        loading={loading}
        shape={getAntdShape(shape)}
        size={getAntdSize(size)}
        style={customStyles}
        type={getAntdType(variant)}
        onClick={handleClick}
        {...(props as AntdButtonProps)}
      >
        {renderContent()}
      </AntdButton>
    );
  }
);

Button.displayName = 'Button';
