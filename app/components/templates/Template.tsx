import { Link } from "@remix-run/react";
import react from "react";

export default function Template({
  children,
  className,
  eros,
}: {
  children: react.ReactNode;
  eros?: {
    header?: { element: JSX.Element; rootClassName?: string };
    footer?: { element: JSX.Element; rootClassName?: string };
  };
  className?: string;
}) {
  return (
    <div className={className}>
      {eros?.header?.element && (
        <div className={eros.header?.rootClassName}>{eros.header.element}</div>
      )}
      <div className="pt-4">{children}</div>
      {eros?.footer?.element && (
        <div className={eros.footer?.rootClassName}>{eros.footer.element}</div>
      )}
    </div>
  );
}
