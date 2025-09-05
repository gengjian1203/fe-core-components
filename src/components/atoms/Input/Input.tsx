import React from 'react';
import { Input as AntdInput } from 'antd';
import type { InputProps as AntdInputProps, InputRef } from 'antd';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps, ComponentSize } from '@/types';

// 尺寸映射
const getAntdSize = (size: ComponentSize): AntdInputProps['size'] => {
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

// 获取变体样式
const getVariantStyle = (
  variant: 'default' | 'filled' | 'outlined'
): 'outlined' | 'filled' | 'borderless' => {
  switch (variant) {
    case 'filled':
      return 'filled';
    case 'outlined':
      return 'outlined';
    default:
      return 'outlined';
  }
};

// Input组件属性接口
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<BaseComponentProps, 'className' | 'disabled'> {
  /** 自定义CSS类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入框大小 */
  size?: ComponentSize;
  /** 输入框变体 */
  variant?: 'default' | 'filled' | 'outlined';
  /** 标签文本 */
  label?: string;
  /** 帮助文本 */
  helperText?: string;
  /** 错误信息 */
  error?: string;
  /** 是否必填 */
  required?: boolean;
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除按钮点击回调 */
  onClear?: () => void;
  /** 是否全宽 */
  fullWidth?: boolean;
  /** 容器className */
  containerClassName?: string;
}

/**
 * Input 组件 - 基于 Antd Input 的二次封装
 *
 * @example
 * ```tsx
 * <Input
 *   label="用户名"
 *   placeholder="请输入用户名"
 *   required
 *   helperText="用户名长度为3-20个字符"
 * />
 * ```
 */
export const Input = React.forwardRef<InputRef, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      helperText,
      error,
      required = false,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      fullWidth = false,
      disabled = false,
      className,
      containerClassName,
      value,
      onChange,
      style,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    // 构建容器样式
    const containerStyle: React.CSSProperties = {
      ...(fullWidth && { width: '100%' }),
    };

    // 构建输入框样式
    const inputStyle: React.CSSProperties = {
      ...(fullWidth && { width: '100%' }),
      ...style,
    };

    // 处理清除
    const handleClear = (): void => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className={containerClassName} style={containerStyle}>
        {/* 标签 */}
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px',
              color: hasError ? '#ff4d4f' : undefined,
            }}
          >
            {label}
            {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
          </label>
        )}

        {/* Antd 输入框 */}
        <AntdInput
          ref={ref}
          allowClear={
            clearable
              ? {
                  clearIcon: (
                    <span
                      aria-label='Clear input'
                      role='button'
                      style={{ cursor: 'pointer' }}
                      tabIndex={0}
                      onClick={handleClear}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleClear();
                        }
                      }}
                    >
                      ✕
                    </span>
                  ),
                }
              : false
          }
          className={className}
          disabled={disabled}
          prefix={leftIcon}
          size={getAntdSize(size)}
          status={hasError ? 'error' : ''}
          style={inputStyle}
          suffix={rightIcon}
          value={value}
          variant={getVariantStyle(variant)}
          onChange={onChange}
          {...(props as AntdInputProps)}
        />

        {/* 帮助文本或错误信息 */}
        {(error ?? helperText) && (
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              color: hasError ? '#ff4d4f' : '#888',
            }}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
