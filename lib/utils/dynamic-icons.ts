"use server";

import { LucideProps } from "lucide-react/";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(
    () => import(`lucide-react/dist/esm/icons/${name}`)
  );
  return <LucideIcon {...props} />;
};
