type StarIconProps = {
  className?: string;
  "aria-label"?: string;
};

export default function StarIcon({
  className = "status-star",
  "aria-label": ariaLabel,
}: StarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <path d="M8 1.2l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.67l-3.52 1.85.67-3.92L2.3 5.34l3.94-.57L8 1.2z" />
    </svg>
  );
}
