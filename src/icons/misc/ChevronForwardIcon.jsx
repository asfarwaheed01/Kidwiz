import React from 'react';

const ChevronForwardIcon = ({ color = '#757575', size = 14 }) => {
  return (
    <svg
      width={size * (8 / 14)}
      height={size * (14 / 14)}
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_6952)'>
        <path
          d='M1 1L7 7L1 13'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_6952'>
          <rect
            width='8'
            height='14'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronForwardIcon;
