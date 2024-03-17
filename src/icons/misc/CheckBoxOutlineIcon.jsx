import React from 'react';

const CheckBoxCheckedIcon = ({ color = '#A7A7A7', size = 32 }) => {
  return (
    <svg
      width={size * (32 / 32)}
      height={size * (32 / 32)}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_10298)'>
        <path
          d='M27.0756 1.23047H4.9218C2.88259 1.23047 1.22949 2.88357 1.22949 4.92278V27.0766C1.22949 29.1158 2.88259 30.7689 4.9218 30.7689H27.0756C29.1149 30.7689 30.768 29.1158 30.768 27.0766V4.92278C30.768 2.88357 29.1149 1.23047 27.0756 1.23047Z'
          stroke={color}
          strokeWidth='2'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_10298'>
          <rect
            width='32'
            height='32'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckBoxCheckedIcon;
