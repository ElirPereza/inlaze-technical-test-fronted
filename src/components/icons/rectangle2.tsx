import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const Rectangle2: React.FC<IconSvgProps> = ({
  size = 60,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      {...props}
      viewBox="0 0 35 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_1901_3613)">
        <path d="M35 0.5H0V4.5H30.5L35 0.5Z" fill="#F0B90B" />
      </g>
      <defs>
        <filter
          id="filter0_i_1901_3613"
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
            result="effect1_innerShadow_1901_3613"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Rectangle2;
