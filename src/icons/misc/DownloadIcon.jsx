import React from 'react';

const DownloadIcon = ({ color = '#FAFAFA', size = 22 }) => {
  return (
    <svg
      width={size * (24 / 22)}
      height={size * (22 / 22)}
      viewBox='0 0 24 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_4278_10214)'>
        <path
          d='M22.1578 7.88281C21.5363 7.48766 20.7595 7.20031 19.9041 7.04234C19.7599 7.01474 19.627 6.94544 19.5219 6.84304C19.4167 6.74063 19.3439 6.60963 19.3125 6.46625C18.9441 4.84859 18.1594 3.46016 17.0086 2.40781C15.6633 1.17734 13.8848 0.5 12 0.5C10.343 0.5 8.8125 1.01937 7.57641 2C6.74156 2.66561 6.06912 3.51245 5.61 4.47641C5.55893 4.5851 5.48257 4.67999 5.38732 4.75314C5.29207 4.82629 5.18069 4.87558 5.0625 4.89687C3.79078 5.12656 2.69391 5.585 1.85578 6.24219C0.642188 7.19516 0 8.54187 0 10.1375C0 13.2969 2.62172 15.5 6.375 15.5H11.25V9.52109C11.25 9.1175 11.5603 8.77109 11.9639 8.75094C12.0653 8.74605 12.1667 8.7618 12.2618 8.79724C12.3569 8.83268 12.4439 8.88707 12.5174 8.9571C12.5909 9.02714 12.6494 9.11137 12.6894 9.20469C12.7294 9.29801 12.75 9.39847 12.75 9.5V15.5H18.5625C21.9675 15.5 24 13.895 24 11.2062C24 9.79766 23.363 8.64828 22.1578 7.88281ZM11.25 18.9416L9.52969 17.2241C9.38821 17.0869 9.19846 17.011 9.00144 17.0127C8.80443 17.0143 8.61598 17.0934 8.47682 17.2329C8.33766 17.3724 8.25897 17.561 8.25775 17.758C8.25653 17.955 8.33289 18.1446 8.47031 18.2858L11.4703 21.2806C11.6109 21.4209 11.8014 21.4997 12 21.4997C12.1986 21.4997 12.3891 21.4209 12.5297 21.2806L15.5297 18.2858C15.6671 18.1446 15.7435 17.955 15.7422 17.758C15.741 17.561 15.6623 17.3724 15.5232 17.2329C15.384 17.0934 15.1956 17.0143 14.9986 17.0127C14.8015 17.011 14.6118 17.0869 14.4703 17.2241L12.75 18.9416V15.5H11.25V18.9416Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_4278_10214'>
          <rect
            width='24'
            height='21'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownloadIcon;