import React from "react";
import type { Permission } from "../../types";
export default function PermissionsBadges({ value }: { value: Permission[] }) {
  if (!value?.length) return <span className="text-xs text-gray-500">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {value.map((p) => (
        <span
          key={p}
          className="rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-white"
        >
          {p}
        </span>
      ))}
    </div>
  );
}
