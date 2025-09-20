import type { Meta, StoryObj } from '@storybook/react';
import type { CXDemoProps } from './CXDemo';
import { CXDemo } from './CXDemo';

const meta: Meta<CXDemoProps> = {
  title: 'Base/CXDemo',
  component: CXDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple demo component that displays a name.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name to display in the demo component',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<CXDemoProps>;

export const Default: Story = {
  args: {
    name: 'Hello World',
  },
};
