import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const UserIconLogin: React.FC<IconSvgProps> = ({
  size = 80,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      {...props}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16.5" r="16" fill="#AD5F00" />
      <mask
        id="mask0_1940_7800"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="33"
      >
        <circle cx="16" cy="16.5" r="16" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_1940_7800)">
        <ellipse cx="15.9998" cy="28.66" rx="12.16" ry="7.04" fill="#FFF394" />
      </g>
      <circle cx="16" cy="14.1" r="5.76" fill="#FFF394" />
    </svg>
  );
};

export default UserIconLogin;
