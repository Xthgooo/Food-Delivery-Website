import { FC } from "react";

export const TugrikIcon: FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    width={size}
    height={size}
    fill={color}
  >
    <text x="50%" y="50%" fontSize="35" textAnchor="middle" dy=".3em">
      ₮
    </text>
  </svg>
);
