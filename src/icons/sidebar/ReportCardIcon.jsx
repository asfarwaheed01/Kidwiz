import React from 'react';

const ReportCardIcon = ({ color = '#A7A7A7', size = 19 }) => {
  return (
    <svg
      width={size * (20 / 19)}
      height={size * (19 / 19)}
      viewBox='0 0 20 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_10994)'>
        <path
          d='M15.7175 18.9577C15.5774 18.9583 15.4408 18.9139 15.327 18.831L9.97941 14.8942L4.63181 18.831C4.51756 18.9152 4.37992 18.9603 4.23878 18.9597C4.09765 18.9592 3.96033 18.9131 3.84669 18.8281C3.73305 18.7432 3.64897 18.6237 3.6066 18.487C3.56423 18.3503 3.56578 18.2034 3.61102 18.0677L5.69667 11.7947L0.291265 8.03059C0.17418 7.94915 0.0858117 7.83182 0.0390703 7.69575C-0.00767102 7.55968 -0.0103353 7.412 0.0314667 7.27428C0.0732688 7.13656 0.157346 7.01602 0.271415 6.93028C0.385484 6.84454 0.523566 6.79808 0.665486 6.7977H7.33409L9.34657 0.508704C9.38992 0.372927 9.47451 0.254582 9.5882 0.170648C9.7019 0.086714 9.83885 0.0415039 9.97941 0.0415039C10.12 0.0415039 10.2569 0.086714 10.3706 0.170648C10.4843 0.254582 10.5689 0.372927 10.6123 0.508704L12.6247 6.79982H19.2933C19.4354 6.79975 19.5738 6.84588 19.6882 6.93145C19.8026 7.01703 19.8871 7.13756 19.9291 7.27538C19.9712 7.41321 19.9687 7.56109 19.922 7.69736C19.8753 7.83364 19.7869 7.95116 19.6696 8.0327L14.2622 11.7947L16.3466 18.066C16.3803 18.1675 16.3898 18.2757 16.3743 18.3817C16.3587 18.4877 16.3186 18.5885 16.2571 18.6756C16.1956 18.7627 16.1146 18.8337 16.0208 18.8828C15.927 18.9318 15.823 18.9575 15.7175 18.9577Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_10994'>
          <rect
            width='20'
            height='19'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ReportCardIcon;