import React from 'react';

const SearchIcon = ({ color = '#FAFAFA', size = 16 }) => {
  return (
    <svg
      width={size * (16 / 16)}
      height={size * (16 / 16)}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.25 11.25L14.25 14.25'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 12.25C10.1234 12.25 12.25 10.1234 12.25 7.5C12.25 4.87665 10.1234 2.75 7.5 2.75C4.87665 2.75 2.75 4.87665 2.75 7.5C2.75 10.1234 4.87665 12.25 7.5 12.25Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SearchIcon;
