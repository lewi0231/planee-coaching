import { ProjectDeep } from "@/lib/types/models";
import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  children: React.ReactNode;
  selectedProject: ProjectDeep;
  cardTitle: string;
};

const DisplayCard = ({ children, selectedProject, cardTitle }: Props) => {
  const background = selectedProject.appearance?.background;
  console.log(background);
  return (
    <Card className={cn("h-fit px-2", background)}>
      <CardHeader>
        <CardTitle className="m-auto ">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          " bg-white m-auto rounded-md p-0 mb-4 outline-2 outline-offset-2 hover:outline",
          `outline-gray-600`
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
