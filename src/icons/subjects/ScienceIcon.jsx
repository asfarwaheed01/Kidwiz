import React from 'react';

const ScienceIcon = ({ color = '#A7A7A7', size = 14 }) => {
  return (
    <svg
      width={size * (12 / 12)}
      height={size * (12 / 12)}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.7036 0.428711H8.2969M2.03853 7.28585H9.96197M4.62226 0.428711V2.93264C4.62222 3.25668 4.52388 3.57409 4.33862 3.84818L0.75269 9.14719C0.0404414 10.1996 0.850872 11.5716 2.18436 11.5716H9.81613C11.1496 11.5716 11.9601 10.1996 11.2478 9.14719L7.66159 3.84818C7.47643 3.57406 7.3782 3.25665 7.37824 2.93264V0.428711'
        stroke={color}
        strokeWidth='1.06151'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ScienceIcon;
