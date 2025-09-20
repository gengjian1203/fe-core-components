import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { CXCardWorkflowProps } from './CXCardWorkflow';
import { CXCardWorkflow } from './CXCardWorkflow';

const meta: Meta<CXCardWorkflowProps> = {
  title: 'Pilot/CXCardWorkflow',
  component: CXCardWorkflow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple demo component that displays a name.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '--' },
        type: { summary: 'string' },
      },
    },
    pilotStatus: {
      control: 'text',
      description: '',
      type: { name: 'string', required: false },
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    isDisabledBtnDownload: {
      control: 'boolean',
      description: '是否禁用下载按钮，禁用后按钮将无法点击',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isDisabledBtnStart: {
      control: 'boolean',
      description: '是否禁用开始按钮，禁用后按钮将无法点击',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    isDisabledBtnDownload: false,
    isDisabledBtnStart: false,
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
