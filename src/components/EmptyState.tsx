import React from "react";
export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed p-6 text-center text-sm text-gray-500">
      {text}
    </div>
  );
}
