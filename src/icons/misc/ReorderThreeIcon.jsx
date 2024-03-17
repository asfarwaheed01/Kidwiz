import React from 'react';

const ReorderThreeIcon = ({ color = '#A7A7A7', size = 15 }) => {
  return (
    <svg
      width={size * (20 / 15)}
      height={size * (15 / 15)}
      viewBox='0 0 20 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.5 7.49996H18.5M1.5 2.00977H18.5M1.5 12.9902H18.5'
        stroke={color}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ReorderThreeIcon;
