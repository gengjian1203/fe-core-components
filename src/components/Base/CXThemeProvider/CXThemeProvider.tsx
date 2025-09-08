import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { AliasToken } from 'antd/es/theme/internal';

export type ThemeMode = 'light' | 'dark';

export interface CXThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  forcedMode?: ThemeMode;
  storageKey?: string;
}

export interface CXThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}

const CXThemeContext = createContext<CXThemeContextValue | undefined>(undefined);

const getInitialMode = (defaultMode: ThemeMode, storageKey: string): ThemeMode => {
  if (typeof window === 'undefined') {
    return defaultMode;
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  // 检查系统主题偏好
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return defaultMode;
};

// Ant Design 主题配置
const getAntdTheme = (
  mode: ThemeMode
): { algorithm: typeof antdTheme.defaultAlgorithm; token: Partial<AliasToken> } => {
  const isLight = mode === 'light';

  return {
    algorithm: isLight ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
    token: {
      // 使用CSS变量定义的颜色
      colorPrimary: isLight ? 'rgb(59 130 246)' : 'rgb(59 130 246)',
      colorSuccess: isLight ? 'rgb(34 197 94)' : 'rgb(34 197 94)',
      colorWarning: isLight ? 'rgb(245 158 11)' : 'rgb(245 158 11)',
      colorError: isLight ? 'rgb(239 68 68)' : 'rgb(239 68 68)',
      colorInfo: isLight ? 'rgb(59 130 246)' : 'rgb(59 130 246)',

      // 背景色
      colorBgContainer: isLight ? 'rgb(255 255 255)' : 'rgb(23 23 23)',
      colorBgElevated: isLight ? 'rgb(255 255 255)' : 'rgb(38 38 38)',
      colorBgLayout: isLight ? 'rgb(245 245 245)' : 'rgb(10 10 10)',

      // 文本颜色
      colorText: isLight ? 'rgb(23 23 23)' : 'rgb(245 245 245)',
      colorTextSecondary: isLight ? 'rgb(115 115 115)' : 'rgb(163 163 163)',
      colorTextTertiary: isLight ? 'rgb(163 163 163)' : 'rgb(115 115 115)',
      colorTextQuaternary: isLight ? 'rgb(212 212 212)' : 'rgb(82 82 82)',

      // 边框颜色
      colorBorder: isLight ? 'rgb(229 229 229)' : 'rgb(64 64 64)',
      colorBorderSecondary: isLight ? 'rgb(245 245 245)' : 'rgb(38 38 38)',

      // 填充颜色
      colorFill: isLight ? 'rgb(245 245 245)' : 'rgb(38 38 38)',
      colorFillSecondary: isLight ? 'rgb(250 250 250)' : 'rgb(23 23 23)',
      colorFillTertiary: isLight ? 'rgb(250 250 250)' : 'rgb(23 23 23)',
      colorFillQuaternary: isLight ? 'rgb(255 255 255)' : 'rgb(10 10 10)',

      // 字体
      fontFamily: 'var(--font-family-sans)',

      // 圆角
      borderRadius: 6,
      borderRadiusLG: 8,
      borderRadiusOuter: 4,
      borderRadiusSM: 4,
      borderRadiusXS: 2,

      // 控件高度
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      controlHeightXS: 16,
    },
  };
};

export const CXThemeProvider: React.FC<CXThemeProviderProps> = ({
  children,
  defaultMode = 'light',
  forcedMode,
  storageKey = 'cx-theme-mode',
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (forcedMode) return forcedMode;
    return getInitialMode(defaultMode, storageKey);
  });

  const setMode = (newMode: ThemeMode): void => {
    if (forcedMode) return;

    setModeState(newMode);

    try {
      localStorage.setItem(storageKey, newMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  const toggleMode = (): void => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // 同步DOM class和CSS变量
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 设置CSS变量给Ant Design组件使用
    root.style.setProperty(
      '--ant-primary-color',
      mode === 'light' ? 'rgb(59 130 246)' : 'rgb(59 130 246)'
    );
  }, [mode]);

  // 监听系统主题变化
  useEffect(() => {
    if (forcedMode || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent): void => {
      // 只在没有用户设置时跟随系统
      try {
        const stored = localStorage.getItem(storageKey);
        if (!stored) {
          setModeState(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.warn('Failed to read theme preference:', error);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [forcedMode, storageKey]);

  const contextValue: CXThemeContextValue = {
    mode: forcedMode ?? mode,
    setMode,
    toggleMode,
    isDark: (forcedMode ?? mode) === 'dark',
  };

  const antdThemeConfig = getAntdTheme(forcedMode ?? mode);

  return (
    <CXThemeContext.Provider value={contextValue}>
      <ConfigProvider componentSize='middle' theme={antdThemeConfig}>
        {children}
      </ConfigProvider>
    </CXThemeContext.Provider>
  );
};

export const useCXTheme = (): CXThemeContextValue => {
  const context = useContext(CXThemeContext);
  if (context === undefined) {
    throw new Error('useCXTheme must be used within a CXThemeProvider');
  }
  return context;
};

CXThemeProvider.displayName = 'CXThemeProvider';
