import React, { useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ComponentSize, BaseComponentProps } from '@/types';
import { cn } from '@/utils';

// Input组件属性接口
export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    BaseComponentProps {
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
 * Input 组件 - 基础输入框组件
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
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = Boolean(error);
    const hasValue = Boolean(value);

    // 构建输入框CSS类名
    const inputClasses = cn(
      // 基础样式
      'w-full',
      'border',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-1',
      'placeholder:text-neutral-400',
      'dark:placeholder:text-neutral-500',
      
      // 尺寸样式
      {
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-3 text-base': size === 'md',
        'px-5 py-4 text-lg': size === 'lg',
        'px-6 py-5 text-xl': size === 'xl'
      },
      
      // 变体样式
      {
        // default变体
        'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-primary-500 focus:ring-primary-500': 
          variant === 'default',
        
        // filled变体
        'bg-neutral-100 dark:bg-neutral-700 border-transparent focus:bg-white dark:focus:bg-neutral-800 focus:border-primary-500 focus:ring-primary-500': 
          variant === 'filled',
          
        // outlined变体
        'bg-transparent border-2 border-neutral-300 dark:border-neutral-600 focus:border-primary-500 focus:ring-primary-500': 
          variant === 'outlined'
      },
      
      // 状态样式
      {
        'border-red-500 focus:border-red-500 focus:ring-red-500': hasError,
        'opacity-50 cursor-not-allowed': disabled,
        'text-neutral-900 dark:text-neutral-100': !disabled,
        'text-neutral-500 dark:text-neutral-400': disabled
      },
      
      // 图标间距
      {
        'pl-10': leftIcon && size === 'sm',
        'pl-12': leftIcon && size === 'md',
        'pl-14': leftIcon && size === 'lg',
        'pl-16': leftIcon && size === 'xl',
        'pr-10': (rightIcon || clearable) && size === 'sm',
        'pr-12': (rightIcon || clearable) && size === 'md',
        'pr-14': (rightIcon || clearable) && size === 'lg',
        'pr-16': (rightIcon || clearable) && size === 'xl'
      },
      
      className
    );

    // 容器CSS类名
    const containerClasses = cn(
      'relative',
      {
        'w-full': fullWidth,
        'w-auto': !fullWidth
      },
      containerClassName
    );

    // 图标容器样式
    const iconClasses = cn(
      'absolute',
      'top-1/2',
      '-translate-y-1/2',
      'pointer-events-none',
      'text-neutral-400',
      'dark:text-neutral-500',
      {
        'text-red-500': hasError,
        'text-primary-500': isFocused && !hasError
      }
    );

    // 左侧图标样式
    const leftIconClasses = cn(
      iconClasses,
      'left-3',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        'w-7 h-7': size === 'xl'
      }
    );

    // 右侧图标样式
    const rightIconClasses = cn(
      iconClasses,
      'right-3',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        'w-7 h-7': size === 'xl'
      }
    );

    // 清除按钮样式
    const clearButtonClasses = cn(
      'absolute',
      'top-1/2',
      '-translate-y-1/2',
      'right-3',
      'cursor-pointer',
      'text-neutral-400',
      'hover:text-neutral-600',
      'dark:text-neutral-500',
      'dark:hover:text-neutral-300',
      'transition-colors',
      'duration-200',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        'w-7 h-7': size === 'xl'
      }
    );

    // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (onChange) {
        onChange(e);
      }
    };

    // 处理清除
    const handleClear = (): void => {
      if (onClear) {
        onClear();
      }
    };

    // 处理焦点状态
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <div className={containerClasses}>
        {/* 标签 */}
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* 输入框容器 */}
        <div className="relative">
          {/* 左侧图标 */}
          {leftIcon && (
            <div className={leftIconClasses}>
              {leftIcon}
            </div>
          )}

          {/* 输入框 */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* 右侧图标或清除按钮 */}
          {clearable && hasValue && !disabled ? (
            <button
              type="button"
              className={clearButtonClasses}
              onClick={handleClear}
              tabIndex={-1}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          ) : rightIcon ? (
            <div className={rightIconClasses}>
              {rightIcon}
            </div>
          ) : null}
        </div>

        {/* 帮助文本或错误信息 */}
        {(error || helperText) && (
          <p className={cn(
            'mt-2 text-sm',
            {
              'text-red-500': hasError,
              'text-neutral-500 dark:text-neutral-400': !hasError
            }
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';