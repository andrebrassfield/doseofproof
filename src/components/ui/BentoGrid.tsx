import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Brand Kit v2 (2026-06-26): hard-edged, charcoal-on-black, yellow hover rule
        "row-span-1 rounded-md group/bento hover:shadow-2xl transition duration-200 p-4 bg-surface border border-stone justify-between flex flex-col space-y-4 hover:border-accent",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {icon}
        <div className="font-display font-bold text-white mb-2 mt-2 tracking-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-muted text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
