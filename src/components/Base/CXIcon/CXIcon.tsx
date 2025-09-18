import React from 'react';
import type { IconProps } from './icons';
import * as Icons from './icons';

export interface CXIconProps extends IconProps {
  name: keyof typeof Icons;
}

export const CXIcon: React.FC<CXIconProps> = (props: CXIconProps) => {
  const { name, ...otherProps } = props || {};

  const IconComponent = Icons[name] as React.ComponentType<IconProps>;

  if (!IconComponent || typeof IconComponent !== 'function') {
    console.warn(`Icon "${String(name)}" not found`);
    return <span>?</span>;
  }

  return <IconComponent {...otherProps} />;
};
