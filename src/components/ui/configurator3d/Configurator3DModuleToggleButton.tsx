import React from "react";
import { clsx } from "clsx";
import type { ModuleSpecification } from "./types";

export function Configurator3DModuleToggleButton({
  module,
  variant,
  sizeClassName,
  paddingClassName,
  compact = false,
  isOn,
  disabled,
  locked,
  showOverlay,
  actionBadgeClassName,
  preview,
  actionGlyph,
  infoGlyph,
  onToggle,
  onHoverStart,
  onHoverEnd,
}: {
  module: ModuleSpecification;
  variant: "square" | "desktopRow";
  sizeClassName?: string;
  paddingClassName?: string;
  compact?: boolean;
  isOn: boolean;
  disabled: boolean;
  locked: boolean;
  showOverlay: boolean;
  actionBadgeClassName: string;
  preview: React.ReactNode;
  actionGlyph: React.ReactNode;
  infoGlyph?: React.ReactNode;
  onToggle: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const overlayLayerClassName =
    "absolute inset-0 flex items-center justify-center transition-opacity duration-150 transform-[translateZ(0)]";
  const overlayLayerStyle = { willChange: "opacity" } as const;

  const body = (
    <>
      <div className="relative h-10 w-10 shrink-0 flex items-center justify-center text-foreground transform-[translateZ(0)]">
        <div
          className={clsx(
            overlayLayerClassName,
            showOverlay ? "opacity-0" : "opacity-100",
          )}
          style={overlayLayerStyle}
        >
          {preview}
        </div>
        <div
          className={clsx(
            overlayLayerClassName,
            showOverlay ? "opacity-100" : "opacity-0",
          )}
          style={overlayLayerStyle}
        >
          <div
            className={clsx(
              "h-10 w-10 rounded-full border shadow-sm flex items-center justify-center",
              actionBadgeClassName,
            )}
          >
            {actionGlyph}
          </div>
        </div>
      </div>

      {variant === "desktopRow" ? (
        compact ? null : (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {module.name}
              </p>
            </div>

            <a
              href={`#module-${module.id}`}
              title={`Learn about the ${module.name}`}
              aria-label={`Learn about the ${module.name}`}
              onClick={(event) => event.stopPropagation()}
              className={clsx(
                "h-10 w-10 inline-flex items-center justify-center rounded-lg border px-2 transition-colors duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
                "border-border-subtle bg-surface/40 hover:bg-surface/70 text-color-600 dark:text-color-400 hover:text-foreground",
              )}
            >
              {infoGlyph}
            </a>
          </>
        )
      ) : (
        <span className="text-[11px] font-medium leading-tight text-foreground text-center line-clamp-2">
          {module.name}
        </span>
      )}
    </>
  );

  if (variant === "square") {
    return (
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        disabled={disabled}
        aria-pressed={isOn}
        title={module.name}
        className={clsx(
          "group relative overflow-hidden flex-none rounded-none transition-colors duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
          sizeClassName,
          disabled
            ? "bg-surface/30 text-foreground/50 cursor-not-allowed"
            : isOn
              ? clsx(
                  "bg-accent-three/20 hover:bg-accent-three/30",
                  locked ? "cursor-not-allowed" : "hover:bg-accent-three/15",
                )
              : "bg-transparent hover:bg-foreground/20",
        )}
      >
        <div className="h-full w-full flex flex-col items-center justify-center gap-2 px-2">
          {body}
        </div>
      </button>
    );
  }

  const isFixedSize = Boolean(sizeClassName);
  const buttonPadding = paddingClassName ?? "px-3 py-2";

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        disabled={disabled}
        aria-pressed={isOn}
        title={module.name}
        className={clsx(
          "group flex items-center gap-3 text-left transition-colors duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-three/70",
          isFixedSize ? "flex-none" : "flex-1",
          buttonPadding,
          compact ? "justify-center" : null,
          sizeClassName,
          disabled
            ? "bg-surface/30 text-foreground/50 cursor-not-allowed"
            : isOn
              ? clsx(
                  "bg-accent-three/20 hover:bg-accent-three/30",
                  locked ? "cursor-not-allowed" : "hover:bg-accent-three/15",
                )
              : "bg-transparent hover:bg-foreground/20",
        )}
      >
        {body}
      </button>
    </div>
  );
}
