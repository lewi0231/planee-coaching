import { ProjectModel } from "@/lib/types/models";
import { cn } from "@/lib/utils";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { LucideIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  children: React.ReactNode;
  selectedProject: ProjectModel;
  cardTitle: string;
  Icon?:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | LucideIcon;
  description?: string;
  className?: string;
};

const DisplayCard = ({
  children,
  selectedProject,
  cardTitle,
  Icon,
  description,
  className,
}: Props) => {
  const background = selectedProject.appearance?.background;

  return (
    <Card className={cn("h-fit px-2", background)}>
      <CardHeader className="px-2 pb-2 pt-2">
        <CardTitle className="flex justify-start gap-2 text-lg items-center">
          {Icon ? <Icon width={18} height={18} strokeWidth={1} /> : ""}
          {cardTitle}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn(className)}>{children}</CardContent>
    </Card>
  );
};

export default DisplayCard;
