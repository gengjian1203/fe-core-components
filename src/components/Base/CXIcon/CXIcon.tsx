import React from 'react';
import type { IconProps } from './icons';
import * as Icons from './icons';

export interface CXIconProps extends IconProps {
  name: string;
}

export const CXIcon: React.FC<CXIconProps> = (props: CXIconProps) => {
  const { name, size, width, height, ...otherProps } = props || {};

  const IconComponent = (Icons as Record<string, React.ComponentType<IconProps>>)[name];

  if (!IconComponent || typeof IconComponent !== 'function') {
    console.warn(`Icon "${name}" not found`);
    return <span>?</span>;
  }

  // If size is provided, use it for both width and height (unless they're explicitly set)
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  const iconProps: IconProps = { ...otherProps };
  if (finalWidth !== undefined) iconProps.width = finalWidth;
  if (finalHeight !== undefined) iconProps.height = finalHeight;

  return <IconComponent {...iconProps} />;
};
