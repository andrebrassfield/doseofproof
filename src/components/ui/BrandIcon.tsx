import { SVGProps } from "react";

interface BrandIconProps extends SVGProps<SVGSVGElement> {
  id: string;
}

export function BrandIcon({ id, className = "w-6 h-6", ...props }: BrandIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <use href={`/svgs/icons/proof-icons.svg#${id}`} />
    </svg>
  );
}
