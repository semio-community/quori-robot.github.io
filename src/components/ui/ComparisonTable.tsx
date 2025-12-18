import React from "react";
import { clsx } from "clsx";

export interface ComparisonColumn {
  key: string;
  label: string;
  accentClassName?: string;
}

export interface ComparisonRow {
  label: string;
  description?: string;
  cells: Record<string, React.ReactNode>;
}

export interface ComparisonTableProps {
  title?: string;
  caption?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
}

export default function ComparisonTable({
  title,
  caption,
  columns,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <div className={clsx("w-full space-y-4", className)}>
      {title ? (
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
          {caption ? (
            <p className="text-sm text-color-600 dark:text-color-400">
              {caption}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="hidden md:block overflow-hidden rounded-xl border border-border-subtle shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-special-lighter">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Feature
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    "text-left px-4 py-3 text-sm font-semibold",
                    col.accentClassName || "text-foreground",
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.label}
                className={idx % 2 === 0 ? "bg-surface" : "bg-surface/70"}
              >
                <th className="text-left px-4 py-3 align-top text-sm font-semibold text-foreground">
                  <div>{row.label}</div>
                  {row.description ? (
                    <div className="text-xs font-normal text-color-600 dark:text-color-400">
                      {row.description}
                    </div>
                  ) : null}
                </th>
                {columns.map((col) => (
                  <td
                    key={`${row.label}-${col.key}`}
                    className="px-4 py-3 align-top text-sm text-foreground"
                  >
                    {row.cells[col.key] ?? "\u2014"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-lg border border-border-subtle bg-surface p-4 shadow-sm"
          >
            <div className="mb-3">
              <p className="text-base font-semibold text-foreground">
                {row.label}
              </p>
              {row.description ? (
                <p className="text-xs text-color-600 dark:text-color-400">
                  {row.description}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              {columns.map((col) => (
                <div
                  key={`${row.label}-${col.key}-mobile`}
                  className="flex items-start gap-2"
                >
                  <span
                    className={clsx(
                      "text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-special-lighter",
                      col.accentClassName,
                    )}
                  >
                    {col.label}
                  </span>
                  <div className="text-sm text-color-700 dark:text-color-200">
                    {row.cells[col.key] ?? "\u2014"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
