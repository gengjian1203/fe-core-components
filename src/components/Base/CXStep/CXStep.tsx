import { CXIcon } from '@/components';
import { cn } from '@/utils';
import React from 'react';

export type CXStepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface CXStepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface CXStepProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean | undefined;
  icon?: React.ReactNode | undefined;
  index: number;
  isLast: boolean;
  size?: 'small' | 'default';
  status?: CXStepStatus;
  onClick?: (() => void) | undefined;
  current?: number;
}

export interface CXStepsProps {
  current?: number;
  status?: CXStepStatus;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'default';
  steps: CXStepItem[];
  onChange?: (current: number) => void;
  className?: string;
}

const StepIcon: React.FC<{
  icon?: React.ReactNode;
  index: number;
  size: 'small' | 'default';
  status: CXStepStatus;
}> = ({ icon, index, size, status }) => {
  const iconSize = size === 'small' ? 14 : 16;
  const containerSize = size === 'small' ? '!w-6 !h-6' : '!w-8 !h-8';

  const getStatusIcon = (): React.ReactNode => {
    switch (status) {
      case 'finish':
        return <CXIcon height={iconSize} name='IconCheckGreen' width={iconSize} />;
      case 'error':
        return (
          <CXIcon className={containerSize} height={iconSize} name='IconFailed' width={iconSize} />
        );
      case 'process':
      case 'wait':
      default:
        return (
          icon ?? (
            <span
              className={cn('text-xs font-medium', size === 'small' ? 'text-[10px]' : 'text-xs')}
            >
              {index + 1}
            </span>
          )
        );
    }
  };

  const getStatusClasses = (): string => {
    switch (status) {
      case 'finish':
        return 'bg-primary border-primary text-white';
      case 'error':
        return 'bg-white border-red-500 text-red-500';
      case 'process':
        return 'bg-primary border-primary text-white';
      case 'wait':
      default:
        return 'bg-[#D0D0D4] border-[#D0D0D4] text-[#FFFFFF] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div
      className={cn(
        'rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
        containerSize,
        getStatusClasses()
      )}
    >
      {getStatusIcon()}
    </div>
  );
};

const StepConnector: React.FC<{
  direction: 'horizontal' | 'vertical';
  size: 'small' | 'default';
  status: CXStepStatus;
}> = ({ direction, size, status }) => {
  const isCompleted = status === 'finish';

  if (direction === 'horizontal') {
    const iconSize = size === 'small' ? 24 : 32; // w-6 = 24px, w-8 = 32px
    const iconCenterOffset = iconSize / 2; // icon中心点的偏移量

    return (
      <div
        className='absolute left-full ml-1 w-6 flex items-center'
        style={{
          top: `${iconCenterOffset}px`, // 对齐到icon中心高度
          transform: 'translateY(-50%)',
        }}
      >
        <div
          className={cn(
            'h-px w-full transition-all duration-300',
            isCompleted ? 'bg-primary' : 'bg-[#D0D0D4] dark:bg-gray-600'
          )}
        />
      </div>
    );
  }

  // For vertical direction
  const iconSize = size === 'small' ? 24 : 32; // w-6 = 24px, w-8 = 32px
  const leftPosition = iconSize / 2 - 0.5; // Center the line exactly on the icon

  // Calculate the height needed to connect to the next step
  // This includes the space between steps (24px margin) plus reaching the next icon center
  const connectHeight = 24 + iconSize / 2; // margin + half of next icon to reach center

  return (
    <div
      className={cn(
        'absolute w-px transition-all duration-300',
        isCompleted ? 'bg-primary' : 'bg-[#D0D0D4] dark:bg-gray-600'
      )}
      style={{
        left: `${leftPosition}px`,
        top: `${iconSize}px`,
        height: `${connectHeight}px`,
      }}
    />
  );
};

const CXStep: React.FC<CXStepProps> = ({
  description,
  direction = 'horizontal',
  disabled = false,
  icon,
  index,
  isLast,
  size = 'default',
  status = 'wait',
  title,
  onClick,
  current = 0,
}) => {
  const isClickable = !disabled && onClick;
  const isHorizontal = direction === 'horizontal';
  const StepContent = 'div';

  const handleClick = (): void => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && onClick) {
      event.preventDefault();
      onClick();
    }
  };

  if (isHorizontal) {
    const iconSize = size === 'small' ? 24 : 32; // w-6 = 24px, w-8 = 32px
    const iconCenterOffset = iconSize / 2; // icon中心点的偏移量

    return (
      <div className='relative flex items-start'>
        {/* Icon positioned at top */}
        <div className='flex items-center'>
          <StepIcon icon={icon} index={index} size={size} status={status} />
        </div>

        {/* Text Content positioned to align title with icon center */}
        <StepContent
          className={cn(
            'ml-3 flex flex-col transition-all duration-200',
            isClickable && 'cursor-pointer hover:opacity-80',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            paddingTop: `${iconCenterOffset - (size === 'small' ? 7 : 8)}px`, // 调整title与icon中心对齐
          }}
          onClick={isClickable ? handleClick : undefined}
          onKeyDown={isClickable ? handleKeyDown : undefined}
        >
          <div
            className={cn(
              'font-medium transition-colors duration-200 text-left leading-none',
              size === 'small' ? 'text-sm' : 'text-base',
              status === 'process' && 'text-primary',
              status === 'finish' && 'text-gray-900 dark:text-gray-100',
              status === 'error' && 'text-red-500',
              status === 'wait' && 'text-gray-500 dark:text-gray-400'
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={cn(
                'transition-colors duration-200 mt-1 text-left',
                size === 'small' ? 'text-xs' : 'text-sm',
                'text-gray-500 dark:text-gray-400'
              )}
            >
              {description}
            </div>
          )}
        </StepContent>

        {/* Connector for horizontal */}
        {!isLast && (
          <StepConnector
            direction={direction}
            size={size}
            status={index < current ? 'finish' : 'wait'}
          />
        )}
      </div>
    );
  }

  // Vertical layout
  return (
    <div className={cn('relative flex w-full transition-all duration-200', !isLast && 'mb-6')}>
      <StepContent
        // {...(isClickable && {
        //   type: 'button',
        //   'aria-label': `Step ${index + 1}: ${title}`,
        //   tabIndex: disabled ? -1 : 0,
        // })}
        className={cn(
          'flex w-full items-start space-x-3 transition-all duration-200',
          isClickable && 'cursor-pointer hover:opacity-80',
          disabled && 'opacity-50 cursor-not-allowed'
          // isClickable &&
          //   'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md'
        )}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
      >
        {/* Icon */}
        <StepIcon icon={icon} index={index} size={size} status={status} />

        {/* Text Content */}
        <div className='flex flex-col flex-1 min-w-0'>
          <div
            className={cn(
              'font-medium transition-colors duration-200 text-left',
              size === 'small' ? 'text-sm' : 'text-base',
              status === 'process' && 'text-primary',
              status === 'finish' && 'text-gray-900 dark:text-gray-100',
              status === 'error' && 'text-red-500',
              status === 'wait' && 'text-gray-500 dark:text-gray-400'
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={cn(
                'transition-colors duration-200 mt-1 text-left',
                size === 'small' ? 'text-xs' : 'text-sm',
                'text-gray-500 dark:text-gray-400'
              )}
            >
              {description}
            </div>
          )}
        </div>
      </StepContent>

      {/* Connector for vertical */}
      {!isLast && (
        <StepConnector
          direction={direction}
          size={size}
          status={index < current ? 'finish' : 'wait'}
        />
      )}
    </div>
  );
};

export const CXSteps: React.FC<CXStepsProps> = ({
  className,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  status = 'process',
  steps,
  onChange,
}) => {
  const getStepStatus = (index: number, current: number, status?: CXStepStatus): CXStepStatus => {
    if (index < current) return 'finish';
    if (index === current) return status ?? 'process';
    return 'wait';
  };

  const handleStepClick = (index: number): void => {
    if (onChange && !steps[index]?.disabled) {
      onChange(index);
    }
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'horizontal' ? 'items-start gap-8' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => (
        <CXStep
          key={index}
          current={current}
          description={step.description}
          direction={direction}
          disabled={step.disabled}
          icon={step.icon}
          index={index}
          isLast={index === steps.length - 1}
          size={size}
          status={getStepStatus(index, current, index === current ? status : undefined)}
          title={step.title}
          onClick={onChange ? () => handleStepClick(index) : undefined}
        />
      ))}
    </div>
  );
};
