import type { HTMLAttributes, ReactNode } from 'react';

// 组件尺寸枚举
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 组件变体枚举
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// 基础组件属性
export interface BaseComponentProps {
  /** 额外的CSS类名 */
  className?: string;
  /** 组件大小 */
  size?: ComponentSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 测试ID */
  'data-testid'?: string;
}

// 带有子元素的组件属性
export interface ComponentWithChildrenProps extends BaseComponentProps {
  /** 子组件 */
  children?: ReactNode;
}

// 加载状态接口
export interface LoadingProps {
  /** 是否加载中 */
  loading?: boolean;
  /** 加载文本 */
  loadingText?: string;
}

// 主题相关类型
export type ThemeMode = 'light' | 'dark';

// 颜色类型
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// 动画类型
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'none';

// 位置类型
export type Position = 'top' | 'right' | 'bottom' | 'left' | 'center';

// A11y相关类型
export interface AccessibilityProps {
  /** ARIA标签 */
  'aria-label'?: string;
  /** ARIA描述 */
  'aria-describedby'?: string;
  /** ARIA标签引用 */
  'aria-labelledby'?: string;
  /** 是否必需 */
  'aria-required'?: boolean;
  /** 是否无效 */
  'aria-invalid'?: boolean;
  /** 角色 */
  role?: string;
}

// 通用HTML元素属性类型
export type DivProps = HTMLAttributes<HTMLDivElement>;
export type HTMLButtonProps = HTMLAttributes<HTMLButtonElement>;
export type HTMLInputProps = HTMLAttributes<HTMLInputElement>;
export type FormProps = HTMLAttributes<HTMLFormElement>;

// 事件处理器类型
export interface EventHandlers {
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
}

// 表单相关类型
export interface FormFieldProps extends BaseComponentProps, AccessibilityProps {
  /** 字段名 */
  name?: string;
  /** 字段值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  helperText?: string;
  /** 标签 */
  label?: string;
  /** 是否必需 */
  required?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 值变化处理 */
  onChange?: (value: string) => void;
}

// 通用组件工厂类型
export interface ComponentFactory<T = Record<string, unknown>> {
  (props: T): ReactNode;
  displayName?: string;
}
