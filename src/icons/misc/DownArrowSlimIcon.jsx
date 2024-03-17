import React from 'react';

const DownArrowSlimIcon = ({ color = '#A7A7A7', size = 16 }) => {
  return (
    <svg
      width={size * (17 / 16)}
      height={size * (16 / 16)}
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_8909)'>
        <path
          d='M1.90674 8.51298L8.50014 14.6668L15.0936 8.51298M8.50014 13.8121V1.3335'
          stroke={color}
          strokeWidth='2.1978'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_8909'>
          <rect
            width='16'
            height='16'
            fill='white'
            transform='translate(0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownArrowSlimIcon;
