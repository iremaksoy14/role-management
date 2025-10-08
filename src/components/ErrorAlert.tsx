import React from "react";

type ErrorAlertProps = {
  message?: string | null;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-md mt-3 mb-3  border border-red-300 bg-red-50 text-red-800 p-3 text-sm"
    >
      {message}
    </div>
  );
}
