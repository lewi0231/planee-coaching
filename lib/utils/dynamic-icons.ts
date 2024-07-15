"use server";

import { LucideProps } from "lucide-react/";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import React from "react";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(
    () => import(`lucide-react/dist/esm/icons/${name}`)
  );
  return React.createElement(LucideIcon, props);
};
