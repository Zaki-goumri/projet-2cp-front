import React, { FC } from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const ShieldIcon: FC<SvgProps> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

export default ShieldIcon; 