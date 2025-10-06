import React from "react";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto  p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4 text-line">
        Role Management
      </h1>
      {children}
    </main>
  );
}
