import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CXButton, CXProgress } from '../../Base';
import {
  CXIconArrowRight,
  CXIconExtensionStart,
  CXIconExtensionStop,
  CXIconPilotPDFDownload,
} from '../../Base/CXIcon';

export interface CXCardWorkflowProps {
  title?: React.ReactNode;
  pilotStatus?: string;
  workflowPercent?: number;
  isShowBtnDownload?: boolean;
  isShowBtnStart?: boolean;
  isDisabledBtnDownload?: boolean;
  isDisabledBtnStart?: boolean;
  isInterrupt?: boolean;
  renderMidContent?: () => React.ReactNode;
  renderActivitiesContent?: () => React.ReactNode;
  onBtnDownloadClick?: () => void;
  onBtnStartClick?: () => void;
  onBtnStopClick?: () => void;
}

export const CXCardWorkflow: React.FC<CXCardWorkflowProps> = (props: CXCardWorkflowProps) => {
  const {
    title = '--',
    pilotStatus = '',
    workflowPercent = 0,
    isShowBtnDownload = true,
    isShowBtnStart = true,
    isDisabledBtnDownload = false,
    isDisabledBtnStart = false,
    isInterrupt = false,
    renderMidContent,
    renderActivitiesContent,
    onBtnDownloadClick,
    onBtnStartClick,
    onBtnStopClick,
  } = props || {};

  const contentRef = useRef<HTMLDivElement>(null);

  const [isFoldActivities, setFoldActivities] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const processColor = useMemo(() => {
    return isInterrupt ? '#FAC905' : '#1559EA';
  }, [isInterrupt]);
  const backgroundColor = useMemo(() => {
    return isInterrupt ? '#FEF9C3' : '#DCEBFE';
  }, [isInterrupt]);

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
    <div className='w-full bg-white box-border p-4 flex flex-col border-2 border-solid border-neutral-200 rounded-lg gap-5'>
      {/* Operate */}
      <div className='flex flex-row gap-2'>
        <div className='flex-1 w-0 flex flex-row justify-start items-center'>
          <div className='truncate text-[#424242] font-bold'>{title}</div>
        </div>
        {isShowBtnDownload && (
          <CXButton
            className='rounded-xl flex-0'
            disabled={isDisabledBtnDownload}
            renderLeftContent={() => <CXIconPilotPDFDownload />}
            variant='default'
            onClick={handleBtnDownloadClick}
          />
        )}
        {isShowBtnStart &&
          (pilotStatus === 'HOLD' ? (
            <CXButton
              className='rounded-xl flex-0'
              disabled={isDisabledBtnStart}
              renderLeftContent={() => <CXIconExtensionStart />}
              variant='default'
              onClick={handleBtnStartClick}
            />
          ) : (
            <CXButton
              className='rounded-xl flex-0'
              renderLeftContent={() => <CXIconExtensionStop />}
              variant='default'
              onClick={handleBtnStopClick}
            />
          ))}
      </div>

      {/* Progress */}
      {workflowPercent !== -1 && (
        <CXProgress
          backgroundColor={backgroundColor}
          processColor={processColor}
          successColor='#51AC65'
          value={workflowPercent}
        />
      )}

      {/* Mid Content */}
      {renderMidContent?.()}

      {/* Activities */}
      {renderActivitiesContent && (
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
            <CXIconArrowRight
              className={`transition-transform duration-300 ${isFoldActivities ? 'rotate-90' : ''}`}
              color='#1A1A1AB2'
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
      )}
    </div>
  );
};
