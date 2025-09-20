import React from 'react';

export interface CXDemoProps {
  name: string;
}

export const CXDemo: React.FC<CXDemoProps> = (props: CXDemoProps) => {
  const { name } = props || {};

  return (
    <div className='w-full bg-white box-border p-4 flex flex-col border-2 border-solid border-slate-200 rounded-lg gap-5'>
      {name}
    </div>
  );
};
