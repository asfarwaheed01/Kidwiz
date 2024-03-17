import React from 'react';

const UploadIcon = ({ color = '#A7A7A7', size = 24 }) => {
  return (
    <svg
      width={size * (29 / 24)}
      height={size * (24 / 24)}
      viewBox='0 0 29 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_14590)'>
        <path
          d='M18.125 18.4184H22.4297C25.5449 18.4184 28.0938 16.7413 28.0938 13.6184C28.0938 10.4955 25.0918 8.94071 22.6562 8.81841C22.1527 3.93458 18.6348 0.963867 14.5 0.963867C10.5918 0.963867 8.07469 3.59296 7.25 6.20023C3.85156 6.5275 0.90625 8.71966 0.90625 12.3093C0.90625 15.899 3.96484 18.4184 7.70312 18.4184H10.875'
          stroke={color}
          strokeWidth='1.83732'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.125 11.9878L14.5 8.31311L10.875 11.9878M14.5 23.0358V9.23177'
          stroke={color}
          strokeWidth='1.83732'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_14590'>
          <rect
            width='29'
            height='24'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UploadIcon;
