import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as Icons from './CXIcon';

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

// Get all icon components
const iconComponents = Object.entries(Icons).filter(([name]) => name.startsWith('Icon'));

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
            <IconComponent {...args} />
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

export const SizeVariations: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle size={12} />
        <span className='text-xs mt-1'>12px</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle size={16} />
        <span className='text-xs mt-1'>16px</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle size={20} />
        <span className='text-xs mt-1'>20px</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle size={24} />
        <span className='text-xs mt-1'>24px</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle size={32} />
        <span className='text-xs mt-1'>32px</span>
      </div>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle color='#ef4444' size={24} />
        <span className='text-xs mt-1'>Red</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconFile color='#f59e0b' size={24} />
        <span className='text-xs mt-1'>Orange</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconCheckGreen color='#10b981' size={24} />
        <span className='text-xs mt-1'>Green</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconInfo color='#3b82f6' size={24} />
        <span className='text-xs mt-1'>Blue</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconEdit color='#8b5cf6' size={24} />
        <span className='text-xs mt-1'>Purple</span>
      </div>
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {[
        'IconArrowRightTop',
        'IconFoldLeft',
        'IconFoldRight',
        'IconDashboard',
        'IconList',
        'IconView',
        'IconFullscreen',
        'IconPlus',
        'IconEdit',
        'IconTrash',
        'IconRefresh',
        'IconUpload',
      ].map(iconName => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
        return IconComponent ? (
          <div key={iconName} className='flex flex-col items-center p-2'>
            <IconComponent size={20} />
            <span className='text-xs mt-1'>{iconName.replace('Icon', '')}</span>
          </div>
        ) : null;
      })}
    </div>
  ),
};

export const FileTypeIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {[
        'IconFileTypePDF',
        'IconFileTypeDoc',
        'IconFileTypeExcel',
        'IconFileTypePPT',
        'IconFileTypeTXT',
        'IconFileTypeImage',
        'IconFile',
        'IconImage',
        'IconFileUpload',
        'IconFileStatusSuccess',
        'IconFileStatusError',
        'IconFileStatusLoading',
      ].map(iconName => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
        return IconComponent ? (
          <div key={iconName} className='flex flex-col items-center p-2'>
            <IconComponent size={20} />
            <span className='text-xs mt-1'>
              {iconName
                .replace('IconFileType', '')
                .replace('IconFileStatus', '')
                .replace('Icon', '')}
            </span>
          </div>
        ) : null;
      })}
    </div>
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {[
        'IconCheckGreen',
        'IconCompleted',
        'IconIncompleted',
        'IconInfo',
        'IconFailed',
        'IconSuccess',
        'IconLoading',
        'IconLoader',
        'IconLoader2',
        'IconQuestionCircle',
        'IconMarkCircle',
        'IconIssueCheck',
      ].map(iconName => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
        return IconComponent ? (
          <div key={iconName} className='flex flex-col items-center p-2'>
            <IconComponent size={20} />
            <span className='text-xs mt-1'>{iconName.replace('Icon', '')}</span>
          </div>
        ) : null;
      })}
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {[
        'IconPlus',
        'IconTrash',
        'IconTrash2',
        'IconEdit',
        'IconCopy',
        'IconUpload',
        'IconUpload2',
        'IconReupload',
        'IconRefresh',
        'IconBroadcast',
        'IconPause',
        'IconStop',
      ].map(iconName => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
        return IconComponent ? (
          <div key={iconName} className='flex flex-col items-center p-2'>
            <IconComponent size={20} />
            <span className='text-xs mt-1'>{iconName.replace('Icon', '')}</span>
          </div>
        ) : null;
      })}
    </div>
  ),
};

export const BrandIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {['IconGoogle', 'IconGinkgooLogo', 'IconLogo', 'IconLogoDark', 'IconAvatar', 'IconFace'].map(
        iconName => {
          const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
          return IconComponent ? (
            <div key={iconName} className='flex flex-col items-center p-2'>
              <IconComponent size={20} />
              <span className='text-xs mt-1'>{iconName.replace('Icon', '')}</span>
            </div>
          ) : null;
        }
      )}
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col items-center'>
        <Icons.IconGoogle
          className='text-yellow-500 hover:text-yellow-600 transition-colors'
          size={24}
        />
        <span className='text-xs mt-1'>Hover Effect</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconLoader className='text-red-500 animate-pulse' size={24} />
        <span className='text-xs mt-1'>Animated</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconSuccess className='text-green-500 drop-shadow-lg' size={24} />
        <span className='text-xs mt-1'>Drop Shadow</span>
      </div>
      <div className='flex flex-col items-center'>
        <Icons.IconPlus className='text-purple-500 transform rotate-12' size={24} />
        <span className='text-xs mt-1'>Rotated</span>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: args => (
    <div className='flex flex-col items-center gap-4'>
      <Icons.IconEdit {...args} />
      <p className='text-sm text-gray-600'>Use the controls below to customize the icon</p>
    </div>
  ),
  args: {
    size: 32,
    className: 'text-blue-500 hover:text-blue-600 transition-colors cursor-pointer',
    color: '',
  },
};
