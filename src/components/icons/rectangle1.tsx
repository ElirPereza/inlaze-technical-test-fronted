import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const Rectangle1: React.FC<IconSvgProps> = ({
  size = 60,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 35 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_1901_3612)">
        <path d="M0 0.5H35V4.5H4.5L0 0.5Z" fill="#F0B90B" />
      </g>
      <defs>
        <filter
          id="filter0_i_1901_3612"
          x="0"
          y="0.5"
          width="35"
          height="5"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1901_3612"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Rectangle1;
