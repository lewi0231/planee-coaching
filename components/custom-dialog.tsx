import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { Dispatch, SetStateAction } from "react";
import { Button, ButtonProps } from "./ui/button";

const Dialog = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.Dialog),
  {
    ssr: false,
  }
);

const DialogTrigger = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
  {
    ssr: false,
  }
);

const DialogContent = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogContent),
  {
    ssr: false,
  }
);

const DialogHeader = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogHeader),
  {
    ssr: false,
  }
);

const DialogTitle = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
  {
    ssr: false,
  }
);

type Props = {
  className?: string;
  triggerContent: React.ReactNode;
  triggerStyle?: ButtonProps["variant"];
  modalLabel?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  backgroundContentColor?: string;
  modalClassName?: string;
};

const CustomDialog = ({
  className,
  triggerStyle,
  triggerContent,
  modalLabel,
  children,
  isOpen,
  setIsOpen,
  backgroundContentColor,
  modalClassName,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="">
        <Button
          variant={triggerStyle}
          className={cn(
            "m-0 flex h-full w-fit justify-start p-2 text-left leading-tight whitespace-normal",
            className
          )}
        >
          {triggerContent}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("px-24 space-y-2 ", backgroundContentColor)}>
        {modalLabel ? (
          <DialogHeader>
            <DialogTitle className="text-3xl text-left">
              {modalLabel}
            </DialogTitle>
          </DialogHeader>
        ) : (
          ""
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
