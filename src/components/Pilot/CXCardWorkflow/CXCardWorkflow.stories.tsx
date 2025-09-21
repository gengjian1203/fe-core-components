import { CXButton, CXIcon, CXSteps } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useEffect, useState } from 'react';
import type { CXCardWorkflowProps } from './CXCardWorkflow';
import { CXCardWorkflow } from './CXCardWorkflow';

const meta: Meta<CXCardWorkflowProps> = {
  title: 'Pilot/CXCardWorkflow',
  component: CXCardWorkflow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A workflow card component that displays progress, controls, and activities for workflow management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '工作流标题',
      type: { name: 'other', value: 'React.ReactNode', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'React.ReactNode' },
      },
    },
    pilotStatus: {
      control: { type: 'select' },
      options: ['HOLD', 'RUNNING', 'COMPLETED'],
      description: '执行状态，影响按钮显示',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    workflowPercent: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: '工作流进度百分比',
      type: { name: 'number', required: false },
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    isShowBtnDownload: {
      control: 'boolean',
      description: '是否显示下载按钮',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isShowBtnStart: {
      control: 'boolean',
      description: '是否显示开始/停止按钮',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isDisabledBtnDownload: {
      control: 'boolean',
      description: '是否禁用下载按钮',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isDisabledBtnStart: {
      control: 'boolean',
      description: '是否禁用开始按钮',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isInterrupt: {
      control: 'boolean',
      description: '是否中断状态，影响进度条颜色',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    renderMidContent: {
      control: false,
      description: '中间内容渲染函数',
      table: {
        type: { summary: '() => React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    renderActivitiesContent: {
      control: false,
      description: '活动内容渲染函数',
      table: {
        type: { summary: '() => React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onBtnDownloadClick: {
      control: false,
      description: '下载按钮点击事件回调函数',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onBtnStartClick: {
      control: false,
      description: '开始按钮点击事件回调函数',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onBtnStopClick: {
      control: false,
      description: '停止按钮点击事件回调函数',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    title: 'Personal Details - On hold',
    pilotStatus: 'HOLD',
    workflowPercent: 45,
    isShowBtnDownload: true,
    isShowBtnStart: true,
    isDisabledBtnDownload: false,
    isDisabledBtnStart: false,
    isInterrupt: false,
    onBtnDownloadClick: fn(),
    onBtnStartClick: fn(),
    onBtnStopClick: fn(),
  },
};

export default meta;

type Story = StoryObj<CXCardWorkflowProps>;

export const Default: Story = {
  args: {},
};

export const OnHold: Story = {
  args: {
    title: 'Personal Details Processing',
    pilotStatus: 'HOLD',
    workflowPercent: 0,
    isInterrupt: false,
    renderActivitiesContent: () => (
      <div className='space-y-4 py-3'>
        <div className='text-sm text-gray-600 mb-3'>
          Workflow is on hold. Ready to start processing.
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-500'>Waiting for user input</div>
            <div className='text-xs text-gray-400 mt-1'>Click Start to begin processing</div>
          </div>
        </div>
        <div className='bg-blue-50 p-3 rounded-lg'>
          <div className='text-xs font-medium text-blue-800'>Next Steps:</div>
          <ul className='text-xs text-blue-700 mt-1 space-y-1'>
            <li>• Document validation</li>
            <li>• Personal data extraction</li>
            <li>• Compliance verification</li>
          </ul>
        </div>
      </div>
    ),
  },
};

export const Running: Story = {
  args: {
    title: 'Document Analysis in Progress',
    pilotStatus: 'RUNNING',
    workflowPercent: 65,
    isInterrupt: false,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Document Upload</div>
            <div className='text-xs text-green-600 mt-1'>✓ Completed - 2.5MB processed</div>
          </div>
          <div className='text-xs text-gray-500'>10:30 AM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 animate-pulse' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Content Analysis</div>
            <div className='text-xs text-blue-600 mt-1'>🔄 Processing section 4 of 6</div>
            <div className='w-full bg-gray-200 rounded-full h-1 mt-2'>
              <div className='bg-blue-500 h-1 rounded-full w-2/3 transition-all duration-300' />
            </div>
          </div>
          <div className='text-xs text-gray-500'>Current</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-500'>Legal Validation</div>
            <div className='text-xs text-gray-400 mt-1'>⏳ Pending analysis completion</div>
          </div>
        </div>
        <div className='bg-blue-50 p-3 rounded-lg mt-4'>
          <div className='flex justify-between items-center'>
            <span className='text-xs font-medium text-blue-800'>Est. Time Remaining:</span>
            <span className='text-xs text-blue-700'>~3 minutes</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const NoMidNoActivities: Story = {
  args: {
    title: 'Simple Workflow - Minimal Setup',
    pilotStatus: 'HOLD',
    workflowPercent: -1,
    isShowBtnStart: false,
    isInterrupt: false,
  },
};

export const Interrupted: Story = {
  args: {
    title: 'Workflow Interrupted - Requires Attention',
    pilotStatus: 'RUNNING',
    workflowPercent: 40,
    isInterrupt: true,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0' />
            <div className='text-sm font-medium text-yellow-800'>Workflow Interrupted</div>
          </div>
          <div className='text-xs text-yellow-700 mt-1'>
            Action required: Review flagged content before continuing
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Initial Processing</div>
            <div className='text-xs text-green-600 mt-1'>✓ Successfully completed</div>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0 animate-pulse' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-yellow-800'>Content Review</div>
            <div className='text-xs text-yellow-700 mt-1'>⚠️ Manual review required</div>
            <div className='text-xs text-yellow-600 mt-1'>Found: Potential PII data</div>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-500'>Final Validation</div>
            <div className='text-xs text-gray-400 mt-1'>⏸️ Paused until review complete</div>
          </div>
        </div>
        <div className='bg-red-50 p-3 rounded-lg mt-4'>
          <div className='text-xs font-medium text-red-800 mb-1'>Required Actions:</div>
          <ul className='text-xs text-red-700 space-y-1'>
            <li>• Review flagged personal data</li>
            <li>• Confirm data handling compliance</li>
            <li>• Resume or modify workflow</li>
          </ul>
        </div>
      </div>
    ),
  },
};

export const Completed: Story = {
  args: {
    title: 'Legal Document Review Completed',
    pilotStatus: 'COMPLETED',
    workflowPercent: 100,
    isInterrupt: false,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='bg-green-50 border border-green-200 p-3 rounded-lg mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-500 rounded-full flex-shrink-0' />
            <div className='text-sm font-medium text-green-800'>
              Workflow Completed Successfully
            </div>
          </div>
          <div className='text-xs text-green-700 mt-1'>
            All tasks completed in 8 minutes 32 seconds
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Document Processing</div>
            <div className='text-xs text-green-600 mt-1'>✓ 156 pages processed successfully</div>
          </div>
          <div className='text-xs text-gray-500'>10:30 AM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Legal Analysis</div>
            <div className='text-xs text-green-600 mt-1'>
              ✓ 47 clauses analyzed, 3 recommendations generated
            </div>
          </div>
          <div className='text-xs text-gray-500'>10:35 AM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Compliance Check</div>
            <div className='text-xs text-green-600 mt-1'>✓ No compliance issues detected</div>
          </div>
          <div className='text-xs text-gray-500'>10:38 AM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Report Generation</div>
            <div className='text-xs text-green-600 mt-1'>
              ✓ Comprehensive report generated (PDF, 24 pages)
            </div>
          </div>
          <div className='text-xs text-gray-500'>10:38 AM</div>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-4'>
          <div className='bg-blue-50 p-3 rounded-lg'>
            <div className='text-xs font-medium text-blue-800'>Summary</div>
            <div className='text-xs text-blue-700 mt-1'>Risk Level: Low</div>
            <div className='text-xs text-blue-700'>Confidence: 94%</div>
          </div>
          <div className='bg-gray-50 p-3 rounded-lg'>
            <div className='text-xs font-medium text-gray-800'>Output Files</div>
            <div className='text-xs text-gray-700 mt-1'>• Analysis Report</div>
            <div className='text-xs text-gray-700'>• Compliance Summary</div>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithMidContent: Story = {
  args: {
    title: 'Contract Analysis with Details',
    pilotStatus: 'RUNNING',
    workflowPercent: 75,
    renderMidContent: () => (
      <div className='p-4 bg-gray-50 rounded-lg'>
        <h4 className='text-sm font-medium text-gray-900 mb-2'>Processing Status</h4>
        <div className='space-y-1'>
          <div className='flex justify-between text-xs'>
            <span className='text-gray-600'>Pages Analyzed:</span>
            <span className='font-medium'>45/60</span>
          </div>
          <div className='flex justify-between text-xs'>
            <span className='text-gray-600'>Key Terms Found:</span>
            <span className='font-medium'>23</span>
          </div>
          <div className='flex justify-between text-xs'>
            <span className='text-gray-600'>Estimated Time:</span>
            <span className='font-medium'>5 min remaining</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithActivities: Story = {
  args: {
    title: 'Multi-Step Legal Review',
    pilotStatus: 'RUNNING',
    workflowPercent: 60,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='flex items-start space-x-3'>
          <div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0' />
          <div>
            <div className='text-sm font-medium text-gray-900'>Document Upload</div>
            <div className='text-xs text-gray-500'>Completed at 10:30 AM</div>
          </div>
        </div>
        <div className='flex items-start space-x-3'>
          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0' />
          <div>
            <div className='text-sm font-medium text-gray-900'>Content Analysis</div>
            <div className='text-xs text-gray-500'>In progress - 60% complete</div>
          </div>
        </div>
        <div className='flex items-start space-x-3'>
          <div className='w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0' />
          <div>
            <div className='text-sm font-medium text-gray-500'>Compliance Check</div>
            <div className='text-xs text-gray-400'>Waiting...</div>
          </div>
        </div>
      </div>
    ),
  },
};

export const DisabledButtons: Story = {
  args: {
    title: 'Processing with Restrictions',
    pilotStatus: 'RUNNING',
    workflowPercent: 30,
    isShowBtnDownload: true,
    isShowBtnStart: true,
    isDisabledBtnDownload: true,
    isDisabledBtnStart: true,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-orange-500 rounded-full flex-shrink-0' />
            <div className='text-sm font-medium text-orange-800'>Restricted Access Mode</div>
          </div>
          <div className='text-xs text-orange-700 mt-1'>
            Limited permissions - some actions disabled
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Initial Scan</div>
            <div className='text-xs text-green-600 mt-1'>✓ Document structure validated</div>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 animate-pulse' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Content Processing</div>
            <div className='text-xs text-blue-600 mt-1'>🔄 Processing with limited access</div>
            <div className='text-xs text-orange-600 mt-1'>⚠️ Some features restricted</div>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-500'>Advanced Analysis</div>
            <div className='text-xs text-gray-400 mt-1'>🔒 Requires elevated permissions</div>
          </div>
        </div>
        <div className='bg-gray-50 p-3 rounded-lg mt-4'>
          <div className='text-xs font-medium text-gray-800 mb-2'>Access Restrictions:</div>
          <div className='space-y-1'>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-red-400 rounded-full' />
              <span className='text-xs text-gray-600'>Download functionality disabled</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-red-400 rounded-full' />
              <span className='text-xs text-gray-600'>Manual restart disabled</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-yellow-400 rounded-full' />
              <span className='text-xs text-gray-600'>Limited processing scope</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const HiddenButtons: Story = {
  args: {
    title: 'Read-Only Workflow View',
    pilotStatus: 'RUNNING',
    workflowPercent: 75,
    isShowBtnDownload: false,
    isShowBtnStart: false,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-blue-500 rounded-full flex-shrink-0' />
            <div className='text-sm font-medium text-blue-800'>Read-Only Mode</div>
          </div>
          <div className='text-xs text-blue-700 mt-1'>
            View-only access - no control buttons available
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Document Processing</div>
            <div className='text-xs text-green-600 mt-1'>✓ Completed successfully</div>
          </div>
          <div className='text-xs text-gray-500'>12:30 PM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 animate-pulse' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Data Validation</div>
            <div className='text-xs text-blue-600 mt-1'>🔄 In progress - 75% complete</div>
          </div>
          <div className='text-xs text-gray-500'>Current</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-gray-300 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-500'>Report Generation</div>
            <div className='text-xs text-gray-400 mt-1'>⏳ Waiting for validation</div>
          </div>
        </div>
        <div className='bg-gray-50 p-3 rounded-lg mt-4'>
          <div className='text-xs font-medium text-gray-800 mb-2'>View Permissions:</div>
          <div className='space-y-1'>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full' />
              <span className='text-xs text-gray-600'>Progress monitoring enabled</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full' />
              <span className='text-xs text-gray-600'>Activity timeline visible</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-red-400 rounded-full' />
              <span className='text-xs text-gray-600'>Control buttons hidden</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const OnlyDownloadButton: Story = {
  args: {
    title: 'Download Only - Automated Workflow',
    pilotStatus: 'COMPLETED',
    workflowPercent: 100,
    isShowBtnDownload: true,
    isShowBtnStart: false,
    renderActivitiesContent: () => (
      <div className='space-y-3 py-3'>
        <div className='bg-green-50 border border-green-200 p-3 rounded-lg mb-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-500 rounded-full flex-shrink-0' />
            <div className='text-sm font-medium text-green-800'>Automated Workflow Complete</div>
          </div>
          <div className='text-xs text-green-700 mt-1'>
            Process completed automatically - download ready
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Automated Processing</div>
            <div className='text-xs text-green-600 mt-1'>✓ Completed without intervention</div>
          </div>
          <div className='text-xs text-gray-500'>2:15 PM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Quality Assurance</div>
            <div className='text-xs text-green-600 mt-1'>✓ All checks passed</div>
          </div>
          <div className='text-xs text-gray-500'>2:18 PM</div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='w-3 h-3 bg-green-500 rounded-full flex-shrink-0' />
          <div className='flex-1'>
            <div className='text-sm font-medium text-gray-900'>Final Report</div>
            <div className='text-xs text-green-600 mt-1'>✓ Generated and ready for download</div>
          </div>
          <div className='text-xs text-gray-500'>2:20 PM</div>
        </div>
        <div className='bg-blue-50 p-3 rounded-lg mt-4'>
          <div className='text-xs font-medium text-blue-800 mb-2'>Workflow Features:</div>
          <div className='space-y-1'>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full' />
              <span className='text-xs text-gray-600'>Fully automated execution</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full' />
              <span className='text-xs text-gray-600'>Download functionality available</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-gray-400 rounded-full' />
              <span className='text-xs text-gray-600'>Manual controls not needed</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

const AnimatedDemo: React.FC = () => {
  const [currentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [pilotStatus, setPilotStatus] = useState<string>('HOLD');
  const [isInterrupt, setIsInterrupt] = useState(false);
  const [visibleStepsCount, setVisibleStepsCount] = useState(1);

  const steps = [
    {
      title: (
        <div className='flex flex-row justify-between items-center'>
          <div>John Liu</div>
          <div className='text-orange-800'>Sep 4 at 8:22 AM</div>
        </div>
      ),
      description: (
        <div className='text-lg text-red-600'>
          The system has begun extracting data to populate the application form.
        </div>
      ),
      icon: <div className='w-[10px] h-[10px] rounded-full bg-[#FFFFFF]' />,
    },
    {
      title: (
        <div className='flex flex-row justify-between items-center'>
          <div className='text-gray-700'>John Liu</div>
          <div>Sep 5 at 8:22 AM</div>
        </div>
      ),
      description: (
        <div className='text-xs text-green-600'>
          The process has been paused. All progress is saved and can be resumed at any time.
        </div>
      ),
      icon: <div className='w-[10px] h-[10px] rounded-full bg-[#FFFFFF]' />,
    },
    {
      title: (
        <div className='flex flex-row justify-between items-center'>
          <div>John Liu</div>
          <div>Sep 6 at 8:22 AM</div>
        </div>
      ),
      description: (
        <div className='text-sm'>
          <span className='text-orange-400'>The system is continuing </span>
          <span className='text-yellow-400'>to populate the form </span>
          <span className='text-green-700'>from where it </span>
          <span className='text-blue-600'>left </span>
          <span className='text-purple-600'>off</span>
        </div>
      ),
      icon: <div className='w-[10px] h-[10px] rounded-full bg-[#FFFFFF]' />,
    },
    {
      title: (
        <div className='flex flex-row justify-between items-center'>
          <div>John Liu</div>
          <div>Sep 7 at 8:22 AM</div>
        </div>
      ),
      description: (
        <div className='flex flex-row items-center text-2xl'>
          <CXIcon height={32} name='IconRefresh' width={32} />
          <div>A copy of the application form, was downloaded.</div>
          <CXIcon height={32} name='IconRefresh' width={32} />
          <CXIcon height={32} name='IconRefresh' width={32} />
          <CXIcon height={32} name='IconRefresh' width={32} />
        </div>
      ),
      icon: <div className='w-[10px] h-[10px] rounded-full bg-[#FFFFFF]' />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (pilotStatus === 'RUNNING') {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setVisibleStepsCount(steps.length);
            setPilotStatus('COMPLETED');
            return 100;
          }

          const stepProgress = Math.floor(newProgress / (100 / steps.length));
          setVisibleStepsCount(Math.min(stepProgress + 1, steps.length));

          if (newProgress === 40) {
            setIsInterrupt(true);
            setPilotStatus('HOLD');
            return 40;
          }

          return newProgress;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pilotStatus, steps.length]);

  const handleStart = (): void => {
    if (isInterrupt) {
      setIsInterrupt(false);
    }
    setPilotStatus('RUNNING');
  };

  const handleStop = (): void => {
    setPilotStatus('HOLD');
  };

  const handleReset = (): void => {
    setProgress(0);
    setVisibleStepsCount(1);
    setPilotStatus('HOLD');
    setIsInterrupt(false);
  };

  return (
    <div className='space-y-4'>
      <CXCardWorkflow
        isInterrupt={isInterrupt}
        pilotStatus={pilotStatus}
        renderActivitiesContent={() => (
          <div className='py-4'>
            <CXSteps
              current={currentStep}
              direction='vertical'
              status={isInterrupt ? 'error' : 'process'}
              steps={steps.slice(0, visibleStepsCount)}
            />
          </div>
        )}
        renderMidContent={() => (
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3'>
            <div className='text-sm font-medium text-blue-900'>Interactive Demo Instructions</div>
            <div className='text-xs text-blue-800 space-y-2'>
              <div className='flex items-start space-x-2'>
                <span className='font-medium'>▶️ Start:</span>
                <span>
                  Click the Start button (▶️ icon) in the top-right to begin the automated workflow
                  simulation
                </span>
              </div>
              <div className='flex items-start space-x-2'>
                <span className='font-medium'>⏸️ Pause:</span>
                <span>Click the Stop button (⏸️ icon) to pause the workflow at any time</span>
              </div>
              <div className='flex items-start space-x-2'>
                <span className='font-medium'>⚠️ Auto-Interrupt:</span>
                <span>
                  The demo will automatically simulate an interruption at 40% progress to showcase
                  error handling
                </span>
              </div>
              <div className='flex items-start space-x-2'>
                <span className='font-medium'>🔄 Reset:</span>
                <span>
                  Use the button below to reset the demo to initial state (0% progress, HOLD status)
                </span>
              </div>
            </div>
            <div className='flex justify-start pt-2'>
              <CXButton className='!text-xs' variant='outline' onClick={handleReset}>
                🔄 Reset Demo
              </CXButton>
            </div>
          </div>
        )}
        title='Automated Legal Document Analysis'
        workflowPercent={progress}
        onBtnStartClick={handleStart}
        onBtnStopClick={handleStop}
      />
    </div>
  );
};

export const AnimatedWorkflow: Story = {
  render: () => <AnimatedDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'An animated demo showing the workflow progress with synchronized CXProgress and CXSteps components. Click Start to begin the animation, and it will automatically progress through each step. At 40% progress, it will simulate an interruption scenario.',
      },
    },
  },
};
