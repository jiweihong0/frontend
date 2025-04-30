declare module '@radix-ui/react-icons' {
  import * as React from 'react';

  export interface IconProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    color?: string;
    size?: string | number;
  }

  export const ReloadIcon: React.FC<IconProps>;
  // 其他你可能需要的圖標也可以在這裡添加
} 