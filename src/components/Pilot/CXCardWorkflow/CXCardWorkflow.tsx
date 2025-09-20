import { CXButton, CXIcon } from '@/components';
import React, { useEffect, useRef, useState } from 'react';

export interface CXCardWorkflowProps {
  title?: string;
  pilotStatus?: string;
  isDisabledBtnDownload?: boolean;
  isDisabledBtnStart?: boolean;
  renderActivitiesContent?: () => React.ReactNode;
  onBtnDownloadClick?: () => void;
  onBtnStartClick?: () => void;
  onBtnStopClick?: () => void;
}

export const CXCardWorkflow: React.FC<CXCardWorkflowProps> = (props: CXCardWorkflowProps) => {
  const {
    title = '--',
    pilotStatus = '',
    isDisabledBtnDownload = false,
    isDisabledBtnStart = false,
    renderActivitiesContent,
    onBtnDownloadClick,
    onBtnStartClick,
    onBtnStopClick,
  } = props || {};

  const [isFoldActivities, setFoldActivities] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBtnDownloadClick = () => {
    onBtnDownloadClick?.();
  };

  const handleBtnStartClick = () => {
    onBtnStartClick?.();
  };

  const handleBtnStopClick = () => {
    onBtnStopClick?.();
  };

  const handleBtnActivitiesClick = () => {
    setFoldActivities(prev => {
      return !prev;
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [renderActivitiesContent, isFoldActivities]);

  return (
    <div className='w-full bg-white box-border p-4 flex flex-col border-2 border-solid border-slate-200 rounded-lg gap-5'>
      {/* Operate */}
      <div className='flex flex-row gap-2'>
        <div className='flex-1 w-0 flex flex-row justify-start items-center'>
          <div className='truncate text-[#424242]'>{title}</div>
        </div>
        <CXButton
          className='rounded-xl flex-0'
          disabled={isDisabledBtnDownload}
          renderLeftContent={() => <CXIcon name='IconPilotPDFDownload' />}
          variant='default'
          onClick={handleBtnDownloadClick}
        />
        {pilotStatus === 'HOLD' ? (
          <CXButton
            className='rounded-xl flex-0'
            disabled={isDisabledBtnStart}
            renderLeftContent={() => <CXIcon name='IconExtensionStart' />}
            variant='primary'
            onClick={handleBtnStartClick}
          />
        ) : (
          <CXButton
            className='rounded-xl flex-0'
            renderLeftContent={() => <CXIcon name='IconExtensionStop' />}
            variant='primary'
            onClick={handleBtnStopClick}
          />
        )}
      </div>

      {/* Activities */}
      <div className='flex flex-col'>
        <CXButton
          block
          className='!px-0'
          classNameChildren='flex flex-row justify-between items-center'
          tabIndex={-1}
          variant='text'
          onClick={handleBtnActivitiesClick}
        >
          <div className='text-[#1A1A1AB2] text-left'>Activities</div>
          <CXIcon
            className={`transition-transform duration-300 ${isFoldActivities ? 'rotate-90' : ''}`}
            name='IconArrowRight'
          />
        </CXButton>
        {/* Activities Content */}
        <div
          className='overflow-hidden transition-all duration-300 ease-in-out'
          style={{
            maxHeight: isFoldActivities ? `${contentHeight}px` : '0',
            opacity: isFoldActivities ? 1 : 0,
          }}
        >
          <div ref={contentRef}>{renderActivitiesContent?.()}</div>
        </div>
      </div>
    </div>
  );
};
