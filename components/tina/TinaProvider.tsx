"use client";

import { TinaEditProvider } from "tinacms/dist/edit-state";

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  return <TinaEditProvider>{children}</TinaEditProvider>;
}