import React from 'react';

const ChevronSlimDownIcon = ({ color = '#A7A7A7', size = 8 }) => {
  return (
    <svg
      width={size * (12 / 8)}
      height={size * (8 / 8)}
      viewBox='0 0 12 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.856445 1.42871L5.9993 6.57157L11.1422 1.42871'
        stroke={color}
        strokeWidth='1.71429'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ChevronSlimDownIcon;
