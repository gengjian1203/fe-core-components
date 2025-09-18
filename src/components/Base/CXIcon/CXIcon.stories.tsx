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
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
      description: 'Icon size in pixels',
      defaultValue: 16,
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      defaultValue: '',
    },
    color: {
      control: 'color',
      description: 'Icon color (CSS color value)',
      defaultValue: '',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Get all icon components (excluding CXIcon which has different props and IconName type)
const iconComponents = Object.entries(Icons);

export const AllIcons: Story = {
  render: args => {
    const copyToClipboard = async (name: string) => {
      const jsx = `<${name} size={${args['size']}} ${args['className'] ? `className="${args['className']}" ` : ''}${args['color'] ? `color="${args['color']}" ` : ''}/>`;
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
      <div className='grid grid-cols-8 gap-4 p-4 w-full'>
        {iconComponents.map(([name, IconComponent]) => (
          <button
            key={name}
            aria-label={`Copy ${name} component`}
            className='flex flex-col items-center p-2 border rounded hover:bg-gray-300 active:bg-gray-200 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            type='button'
            onClick={() => void copyToClipboard(name)}
            onKeyDown={e => handleKeyDown(e, name)}
          >
            <IconComponent {...(args as any)} />
            <span
              className='text-xs mt-1 text-center truncate w-full'
              title={name.replace('Icon', '')}
            >
              {name.replace('Icon', '')}
            </span>
          </button>
        ))}
      </div>
    );
  },
  args: {
    size: 20,
    className: '',
    color: '',
  },
};
