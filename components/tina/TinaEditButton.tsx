"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";

interface TinaEditButtonProps {
  data: any;
  query: string;
  variables: any;
  children: React.ReactNode;
}

export default function TinaEditButton({ data, query, variables, children }: TinaEditButtonProps) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  return <>{children}</>;
}