import React from 'react';

const RefreshIcon = ({ color = '#FAFAFA', size = 26 }) => {
  return (
    <svg
      width={size * (24 / 26)}
      height={size * (26 / 26)}
      viewBox='0 0 24 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_9180)'>
        <path
          d='M16.0276 6.59429C16.0276 6.59429 17.5607 5.89551 11.9996 5.89551C10.008 5.89551 8.06106 6.44194 6.40507 7.46571C4.74908 8.48948 3.45839 9.9446 2.69622 11.6471C1.93405 13.3495 1.73463 15.2229 2.12318 17.0302C2.51173 18.8375 3.4708 20.4977 4.87911 21.8007C6.28741 23.1037 8.0817 23.9911 10.0351 24.3506C11.9885 24.7101 14.0132 24.5255 15.8532 23.8204C17.6933 23.1152 19.266 21.921 20.3725 20.3888C21.479 18.8566 22.0696 17.0553 22.0696 15.2125'
          stroke={color}
          strokeWidth='2.04889'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
        <path
          d='M12 1.46973L17.035 6.12824L12 10.7868'
          stroke={color}
          strokeWidth='2.04889'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_9180'>
          <rect
            width='24'
            height='25.8462'
            fill='white'
            transform='translate(0 0.0766602)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RefreshIcon;
