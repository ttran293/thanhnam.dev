import { useSoundDesign } from "../hooks/useSoundDesign";

type ItemAction = {
  href: string;
  label: string;
};

type ItemActionsProps = {
  primary?: ItemAction;
  secondary?: ItemAction[];
};

export default function ItemActions({
  primary,
  secondary = [],
}: ItemActionsProps) {
  const { playSound } = useSoundDesign();

  if (!primary && secondary.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8">
      {primary && (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("external")}
          className="btn-pill-primary"
        >
          {primary.label}
        </a>
      )}
      {secondary.map((action) => (
        <a
          key={action.href}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound("external")}
          className="btn-pill-secondary"
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}
