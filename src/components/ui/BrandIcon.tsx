import { SVGProps } from "react";

interface BrandIconProps extends SVGProps<SVGSVGElement> {
  id: string;
}

const iconAliases: Record<string, string> = {
  check: "checkmark-shield",
  warning: "warning-triangle",
  filecode: "folder-structure",
  firstaid: "checkmark-shield",
  vagus: "heart-rate-vagal",
  thoracic: "spine-neck",
  capsule: "pill-capsule",
  pill: "pill-capsule",
};

const iconOffsets: Record<string, [number, number]> = {
  "checkmark-shield": [50, 50],
  "scan-line": [150, 50],
  "chart-up": [250, 50],
  "warning-triangle": [350, 50],
  "spine-neck": [50, 150],
  "brain-circuit": [150, 150],
  "inflammation-flame": [250, 150],
  "gut-intestine": [350, 150],
  "mast-cell": [50, 250],
  "heart-rate-vagal": [150, 250],
  "pill-capsule": [250, 250],
  microscope: [350, 250],
  "test-tube": [50, 350],
  "dna-helix": [150, 350],
  "lab-flask": [250, 350],
  "gear-settings": [350, 350],
  "clock-time": [50, 450],
  "calendar-day": [150, 450],
  "folder-structure": [250, 450],
  "target-crosshair": [350, 450],
  "bookmark-save": [50, 550],
  "share-arrow": [150, 550],
  "comment-bubble": [250, 550],
  "fire-hot": [350, 550],
  "trending-up": [50, 550],
};

export function BrandIcon({ id, className = "w-6 h-6", ...props }: BrandIconProps) {
  const iconId = iconAliases[id] ?? id;
  const offset = iconOffsets[iconId];

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      {offset ? (
        <g transform={`translate(${-offset[0]} ${-offset[1]})`}>
          <use href={`/svgs/icons/proof-icons.svg#${iconId}`} />
        </g>
      ) : (
        <use href={`/svgs/icons/proof-icons.svg#${iconId}`} />
      )}
    </svg>
  );
}
