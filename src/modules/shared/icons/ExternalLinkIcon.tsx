import React, { FC } from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const ExternalLinkIcon: FC<SvgProps> = ({ ...props }) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

export default ExternalLinkIcon; 