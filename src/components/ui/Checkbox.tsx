import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { clsx } from "clsx";

export interface RadixCheckboxProps {
  id?: string;
  label: React.ReactNode;
  helper?: React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  canTurnOn?: boolean;
  onToggle: () => void;
}

export default function Checkbox({
  id,
  label,
  helper,
  checked,
  disabled = false,
  canTurnOn = true,
  onToggle,
}: RadixCheckboxProps) {
  return (
    <RadixCheckbox.Root
      id={id}
      checked={checked}
      disabled={disabled}
      onCheckedChange={() => onToggle()}
      className={clsx(
        "group w-full rounded-lg border px-4 py-3 text-left transition-all duration-150 focus:outline-none focus-visible:ring focus-visible:ring-accent-two/70",
        disabled
          ? "border-border-subtle bg-surface/30 text-foreground/50 cursor-not-allowed"
          : checked
            ? "border-accent-two/60 bg-accent-two/10 hover:bg-accent-two/15"
            : "border-border-subtle bg-surface/50 hover:bg-surface/80",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-150",
            disabled
              ? "bg-surface/30 border-border-subtle text-foreground"
              : checked
                ? "bg-accent-two group-hover:bg-accent-two/50 text-surface border-accent-two transition-colors duration-150"
                : "bg-transparent group-hover:bg-foreground/50 border-foreground text-foreground/0 group-hover:text-foreground transition-colors duration-150",
          )}
        >
          {/* base icon layer (always centered) */}
          <span className="absolute inset-0 flex items-center justify-center">
            <RadixCheckbox.Indicator forceMount>
              {checked ? (
                <svg
                  className="h-5 w-5 transition-opacity duration-150 group-hover:opacity-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 12.5l4 4 8-9" />
                </svg>
              ) : null}
            </RadixCheckbox.Indicator>
            {!checked && disabled ? (
              <svg
                className="h-5 w-5 transition-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : null}
          </span>
          {/* hover icon overlay */}
          {!disabled ? (
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {checked ? (
                  <path d="M6 12h12" />
                ) : canTurnOn ? (
                  <>
                    <path d="M12 6v12" />
                    <path d="M6 12h12" />
                  </>
                ) : (
                  <path d="M6 12h12" />
                )}
              </svg>
            </span>
          ) : null}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{label}</p>
          {helper ? (
            <p className="text-xs text-color-600 dark:text-color-400">
              {helper}
            </p>
          ) : null}
        </div>
      </div>
    </RadixCheckbox.Root>
  );
}
