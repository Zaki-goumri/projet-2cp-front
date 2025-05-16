import React, { FC } from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const BookmarkCheckIcon: FC<SvgProps> = ({ ...props }) => (
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
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    <polyline points="9 11 12 14 15 11" />
  </svg>
);

export default BookmarkCheckIcon; 