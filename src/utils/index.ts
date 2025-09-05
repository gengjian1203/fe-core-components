import type { ColorVariant, ComponentSize } from '@/types';

/**
 * 合并CSS类名
 * @param classes - CSS类名数组或对象
 * @returns 合并后的类名字符串
 */
export const cn = (
  ...classes: (string | undefined | null | boolean | Record<string, any>)[]
): string => {
  return classes
    .map(cls => {
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return cls;
    })
    .filter(Boolean)
    .join(' ')
    .trim();
};

/**
 * 根据组件大小获取对应的CSS类
 * @param size - 组件大小
 * @returns 对应的CSS类名
 */
export const getSizeClasses = (size: ComponentSize = 'md'): string => {
  const sizeMap: Record<ComponentSize, string> = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
    xl: 'text-xl px-8 py-4',
  };

  return sizeMap[size] || sizeMap.md;
};

/**
 * 根据颜色变体获取对应的CSS类
 * @param variant - 颜色变体
 * @param type - 类型（背景色、文字色、边框色）
 * @returns 对应的CSS类名
 */
export const getVariantClasses = (
  variant: ColorVariant = 'primary',
  type: 'bg' | 'text' | 'border' = 'bg'
): string => {
  const variantMap: Record<ColorVariant, Record<typeof type, string>> = {
    primary: {
      bg: 'bg-primary-500 hover:bg-primary-600',
      text: 'text-primary-600',
      border: 'border-primary-500',
    },
    secondary: {
      bg: 'bg-secondary-500 hover:bg-secondary-600',
      text: 'text-secondary-600',
      border: 'border-secondary-500',
    },
    neutral: {
      bg: 'bg-neutral-500 hover:bg-neutral-600',
      text: 'text-neutral-600',
      border: 'border-neutral-500',
    },
    success: {
      bg: 'bg-success-500 hover:bg-success-600',
      text: 'text-success-600',
      border: 'border-success-500',
    },
    warning: {
      bg: 'bg-warning-500 hover:bg-warning-600',
      text: 'text-warning-600',
      border: 'border-warning-500',
    },
    error: {
      bg: 'bg-error-500 hover:bg-error-600',
      text: 'text-error-600',
      border: 'border-error-500',
    },
    info: {
      bg: 'bg-info-500 hover:bg-info-600',
      text: 'text-info-600',
      border: 'border-info-500',
    },
  };

  return variantMap[variant]?.[type] || variantMap.primary[type];
};

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param limit - 限制时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * 生成唯一ID
 * @param prefix - ID前缀
 * @returns 唯一ID字符串
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @param decimals - 小数位数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * 检查是否为有效的URL
 * @param string - 要检查的字符串
 * @returns 是否为有效URL
 */
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * 首字母大写
 * @param str - 字符串
 * @returns 首字母大写的字符串
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * 截断文本
 * @param text - 文本
 * @param maxLength - 最大长度
 * @param suffix - 后缀
 * @returns 截断后的文本
 */
export const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param sources - 源对象数组
 * @returns 合并后的对象
 */
export const deepMerge = <T>(target: T, ...sources: Partial<T>[]): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key as keyof T];
      const targetValue = target[key as keyof T];

      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        if (!targetValue || typeof targetValue !== 'object') {
          (target as any)[key] = {};
        }
        deepMerge((target as any)[key], sourceValue as any);
      } else {
        (target as any)[key] = sourceValue;
      }
    });
  }

  return deepMerge(target, ...sources);
};
