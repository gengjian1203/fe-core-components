import type { Meta, StoryObj } from '@storybook/react';
import { CXCardPilot } from './CXCardPilot';

const meta: Meta<typeof CXCardPilot> = {
  title: 'Pilot/CXCardPilot',
  component: CXCardPilot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    clientName: {
      control: 'text',
      description: '客户名称，显示在卡片主要位置的用户姓名',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '--' },
      },
    },
    clientEmail: {
      control: 'text',
      description: '客户邮箱地址，用于联系和通信的邮箱信息',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '--' },
      },
    },
    clientNationality: {
      control: 'text',
      description: '客户国籍，表示申请人的国籍或来源国家',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '--' },
      },
    },
    clientVisaType: {
      control: 'text',
      description: '签证类型，表示申请的签证种类和具体类别',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '--' },
      },
    },
  },
  args: {
    clientName: 'Ahmed Hassan',
    clientEmail: 'john@gmail.com',
    clientNationality: 'Iraq',
    clientVisaType: 'Skilled Worker Visa',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // render: (args) => {
  //   const { widthWrap, ...otherArgs} = args || {}
  //   return <div style={{
  //     width: widthWrap
  //   }}>

  //     <CXCardPilot {...otherArgs} />
  //   </div>

  // }
  args: {},
};
