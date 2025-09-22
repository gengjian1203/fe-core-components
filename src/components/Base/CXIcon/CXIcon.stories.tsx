import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as Icons from './icons';

const meta: Meta = {
  title: 'Base/CXIcon',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive collection of SVG icons with consistent sizing, styling, and color options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      description: '图标名称，从可用的图标库中选择对应的图标组件',
      options: Object.keys(Icons),
      table: {
        defaultValue: { summary: 'IconExtension' },
      },
    },
    width: {
      control: { type: 'range', min: 12, max: 128, step: 1 },
      description: '图标宽度（像素），会覆盖 size 设置',
      table: {
        defaultValue: { summary: '14~28' },
      },
    },
    height: {
      control: { type: 'range', min: 12, max: 128, step: 1 },
      description: '图标高度（像素），会覆盖 size 设置',
      table: {
        defaultValue: { summary: '14~28' },
      },
    },
    className: {
      control: 'text',
      description: '附加的 CSS 类名，用于自定义样式',
      table: {
        defaultValue: { summary: '' },
      },
    },
    color: {
      control: 'color',
      description: '图标颜色（CSS 颜色值），支持十六进制、RGB、颜色名等格式',
      table: {
        defaultValue: { summary: 'currentColor' },
      },
    },
  },
  args: {
    width: 20,
    height: 20,
    className: '',
    color: '#0000ff',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Get all icon components (excluding CXIcon which has different props and IconName type)
const iconComponents = Object.entries(Icons);

export const AllIcons: Story = {
  render: args => {
    const copyToClipboard = async (name: string) => {
      const propsArray = [];
      if (args['width']) propsArray.push(`width={${args['width']}}`);
      if (args['height']) propsArray.push(`height={${args['height']}}`);
      if (args['className']) propsArray.push(`className="${args['className']}"`);
      if (args['color']) propsArray.push(`color="${args['color']}"`);

      const jsx = `<${name}${propsArray.length > 0 ? ` ${propsArray.join(' ')}` : ''} />`;

      try {
        await navigator.clipboard.writeText(jsx);
        // eslint-disable-next-line no-alert
        alert(`Copied ${name}!`);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent, name: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        void copyToClipboard(name);
      }
    };

    return (
      <div className='grid grid-cols-6 gap-4 p-4 w-full'>
        {iconComponents.map(([name, IconComponent]) => (
          <button
            key={name}
            aria-label={`Copy ${name} component`}
            className='flex flex-col justify-between items-center p-2 border rounded-sm hover:bg-neutral-300 active:bg-neutral-200 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='button'
            onClick={() => void copyToClipboard(name)}
            onKeyDown={e => handleKeyDown(e, name)}
          >
            <IconComponent {...(args as any)} />
            <span
              className='text-xs mt-1 text-center truncate w-full'
              title={name.replace('CXIcon', '')}
            >
              {name.replace('CXIcon', '')}
            </span>
          </button>
        ))}
      </div>
    );
  },
};
