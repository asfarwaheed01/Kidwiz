import React from 'react';

const TickIcon = ({ color = '#FAFAFA', size = 13 }) => {
  return (
    <svg
      width={size * (16 / 13)}
      height={size * (13 / 13)}
      viewBox='0 0 16 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.273 0.72168L5.09118 12.2772L0.727539 7.9439'
        stroke={color}
        strokeWidth='1.45455'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default TickIcon;
