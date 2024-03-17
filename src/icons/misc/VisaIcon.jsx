import React from 'react';

const VisaIcon = ({
  bgColor = '#FAFAFA',
  textColor = '#0E4595',
  size = 58,
}) => {
  return (
    <svg
      width={size * (90 / 58)}
      height={size * (58 / 58)}
      viewBox='0 0 90 58'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_10194)'>
        <path
          d='M0 0H90V58H0V0Z'
          fill={bgColor}
          stroke={bgColor}
          strokeWidth='2.10975'
        />
        <path
          d='M33.8312 40.4532L37.6803 17.745H43.837L39.985 40.4532H33.8312ZM62.2285 18.2345C61.009 17.7745 59.0975 17.2808 56.7107 17.2808C50.6269 17.2808 46.3419 20.3607 46.3052 24.7748C46.2709 28.0378 49.3646 29.8582 51.6999 30.9443C54.0965 32.0577 54.902 32.7673 54.8905 33.7611C54.8751 35.2834 52.9767 35.9785 51.2069 35.9785C48.7429 35.9785 47.4337 35.6343 45.4117 34.7868L44.6181 34.4259L43.7542 39.5093C45.1923 40.1434 47.8513 40.6923 50.6125 40.7209C57.0844 40.7209 61.2858 37.6761 61.3336 32.9622C61.3565 30.3789 59.7163 28.4133 56.1642 26.7924C54.0123 25.7419 52.6944 25.0409 52.7083 23.9772C52.7083 23.0333 53.8239 22.024 56.2345 22.024C58.2475 21.9926 59.7062 22.4339 60.8425 22.894L61.3941 23.156L62.2285 18.2345ZM78.0719 17.7446H73.3146C71.8409 17.7446 70.7379 18.149 70.0908 19.6278L60.9471 40.4382H67.4122C67.4122 40.4382 68.469 37.6402 68.7081 37.0257C69.4146 37.0257 75.6952 37.0354 76.593 37.0354C76.7772 37.8305 77.3421 40.4382 77.3421 40.4382H83.0551L78.0719 17.7439V17.7446ZM70.5238 32.4082C71.0331 31.0998 72.9769 26.0602 72.9769 26.0602C72.9407 26.1207 73.4824 24.7455 73.7931 23.8929L74.2092 25.8507C74.2092 25.8507 75.3881 31.2713 75.6345 32.4079H70.5238V32.4082ZM28.6046 17.7446L22.577 33.2306L21.9349 30.0837C20.8127 26.4559 17.3166 22.5255 13.4082 20.5578L18.9198 40.417L25.4338 40.4097L35.1266 17.7444L28.6046 17.7443'
          fill={textColor}
        />
        <path
          d='M16.9518 17.7437H7.02401L6.94531 18.2161C14.669 20.0958 19.7795 24.6382 21.9015 30.0968L19.7427 19.6615C19.3702 18.2235 18.2892 17.7943 16.952 17.7442'
          fill={textColor}
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_10194'>
          <rect
            width='90'
            height='58'
            rx='4.524'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default VisaIcon;
