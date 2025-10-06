import React from "react";
export default function ErrorAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-md border border-red-300 bg-red-50 text-red-800 p-3 text-sm"
    >
      {message}
    </div>
  );
}
