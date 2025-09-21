import { cn } from '@/utils';
import React, { useEffect, useMemo, useState } from 'react';

export interface CXProgressProps {
  type?: 'linear' | 'circle';
  value?: number;
  max?: number;
  color?: string;
  processColor?: string;
  successColor?: string;
  backgroundColor?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  showText?: string;
  animationDuration?: number;
  borderRadius?: string;
  strokeWidth?: string;
}

export const CXProgress: React.FC<CXProgressProps> = (props: CXProgressProps) => {
  const {
    type = 'linear',
    value = 0,
    max = 100,
    color,
    processColor = '#1559EA',
    successColor = '#51AC65',
    backgroundColor = '#DCEBFE',
    className,
    width = (props?.type ?? 'linear') === 'circle' ? 120 : '100%',
    height = (props?.type ?? 'linear') === 'circle' ? 120 : undefined,
    showText,
    animationDuration = 300,
    borderRadius = '4px',
    strokeWidth = '8px',
  } = props || {};

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 50);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = useMemo(() => {
    return Math.min(Math.max((displayValue / max) * 100, 0), 100);
  }, [displayValue, max]);

  const currentColor = useMemo(() => {
    if (color) return color;
    return percentage >= 100 ? successColor : processColor;
  }, [color, percentage, processColor, successColor]);

  const circularSize = useMemo(() => {
    if (type === 'circle') {
      const w = typeof width === 'number' ? width : parseInt(String(width)) || 120;
      const h = typeof height === 'number' ? height : parseInt(String(height)) || 120;
      return Math.max(w, h);
    }
    return 120;
  }, [type, width, height]);

  const radius = useMemo(() => {
    const strokeWidthNum = parseInt(strokeWidth) || 8;
    return (circularSize - strokeWidthNum) / 2;
  }, [circularSize, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const strokeDashoffset = useMemo(
    () => circumference - (percentage / 100) * circumference,
    [circumference, percentage]
  );

  const progressBarStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: strokeWidth.includes('px') ? strokeWidth : `${strokeWidth}px`,
    borderRadius: borderRadius.includes('px') ? borderRadius : `${borderRadius}px`,
  };

  const progressFillStyle: React.CSSProperties = {
    width: `${percentage}%`,
    backgroundColor: currentColor,
    borderRadius: borderRadius.includes('px') ? borderRadius : `${borderRadius}px`,
    transition: `width ${animationDuration}ms ease-out`,
  };

  if (type === 'circle') {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        {showText && (
          <div className='flex justify-center items-center mb-2 text-sm text-gray-700 gap-2'>
            <span>{showText}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className='relative'>
          <svg className='transform -rotate-90' height={circularSize} width={circularSize}>
            {/* Background circle */}
            <circle
              cx={circularSize / 2}
              cy={circularSize / 2}
              fill='transparent'
              r={radius}
              stroke={backgroundColor}
              strokeWidth={parseInt(strokeWidth) || 8}
            />
            {/* Progress circle */}
            <circle
              cx={circularSize / 2}
              cy={circularSize / 2}
              fill='transparent'
              r={radius}
              stroke={currentColor}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap='round'
              strokeWidth={parseInt(strokeWidth) || 8}
              style={{
                transition: `stroke-dashoffset ${animationDuration}ms ease-out, stroke ${animationDuration}ms ease-out`,
              }}
            />
          </svg>
          {!showText && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-sm font-medium text-gray-700'>{Math.round(percentage)}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {showText && (
        <div className='flex justify-start items-center mb-2 text-sm text-gray-700 gap-2'>
          <span>{showText}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className='w-full overflow-hidden'
        style={{
          ...progressBarStyle,
          backgroundColor,
        }}
      >
        <div className='h-full transition-all duration-300 ease-out' style={progressFillStyle} />
      </div>
    </div>
  );
};
