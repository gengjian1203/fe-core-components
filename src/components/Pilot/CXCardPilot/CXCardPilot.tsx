import { CXButton, CXIcon } from '@/components';
import React, { useState } from 'react';

export interface CXCardPilotProps {
  clientName: string;
  clientEmail: string;
  clientNationality: string;
  clientVisaType: string;
  renderSummaryContent?: () => React.ReactNode;
}

export const CXCardPilot: React.FC<CXCardPilotProps> = (props: CXCardPilotProps) => {
  const {
    clientName = '--',
    clientEmail = '--',
    clientNationality = '--',
    clientVisaType = '--',
    renderSummaryContent,
  } = props;

  const [isFoldSummary, setFoldSummary] = useState<boolean>(false);

  const handleBtnDownloadClick = () => {
    console.debug('handleBtnDownloadClick');
  };

  const handleBtnStartClick = () => {
    console.debug('handleBtnStartClick');
  };

  const handleBtnSummaryClick = () => {
    setFoldSummary(prev => {
      return !prev;
    });
  };

  return (
    <div className='w-full bg-white box-border p-4 flex flex-col border-2 border-solid border-slate-200 rounded-lg gap-5'>
      {/*  */}
      <div className='flex flex-row gap-2'>
        <CXIcon className='flex-[0_0_auto]' height={30} name='IconFormItemClientName' width={26} />
        <div className='flex-1 w-0 flex flex-row justify-start items-center'>
          <div className='truncate text-[#424242]'>{clientName}</div>
        </div>
        <CXButton
          className='rounded-xl flex-1 w-0'
          renderLeftContent={() => <CXIcon name='IconPilotPDFDownload' />}
          variant='default'
          onClick={handleBtnDownloadClick}
        >
          <div className='flex-1 w-0 truncate'>Download form</div>
        </CXButton>
        <CXButton
          className='rounded-xl flex-1 w-0'
          renderLeftContent={() => <CXIcon name='IconExtensionStart' />}
          variant='primary'
          onClick={handleBtnStartClick}
        >
          <div className='flex-1 w-0 truncate'>Start auto-fill</div>
        </CXButton>
      </div>
      {/*  */}
      <div className='flex flex-row items-center h-4'>
        <div className='box-border pr-2 flex-1 w-0 truncate text-left text-[#1A1A1AB2]'>
          {clientEmail}
        </div>
        <div className='box-border px-2 flex-1 w-0 truncate text-center border-r border-l border-solid border-slate-200 text-[#1A1A1AB2]'>
          {clientNationality}
        </div>
        <div className='box-border pl-2 flex-1 w-0 truncate text-right text-[#1A1A1AB2]'>
          {clientVisaType}
        </div>
      </div>
      {/* Summary */}
      <CXButton
        block
        className='!px-0'
        classNameChildren='flex flex-row justify-between items-center'
        variant='text'
        onClick={handleBtnSummaryClick}
      >
        <div className='text-[#1A1A1AB2]'>Summary</div>
        <CXIcon
          className={`transition-transform duration-300 ${isFoldSummary ? 'rotate-90' : ''}`}
          name='IconArrowRight'
        />
      </CXButton>
      {/* Summary Content */}
      {isFoldSummary && renderSummaryContent?.()}
    </div>
  );
};

CXCardPilot.displayName = 'CXCardPilot';
