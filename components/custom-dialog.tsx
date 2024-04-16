import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import { Button, ButtonProps } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  className?: string;
  triggerContent: React.ReactNode;
  triggerStyle?: ButtonProps["variant"];
  modalLabel: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  backgroundContentColor?: string;
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
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full">
        <Button
          variant={triggerStyle}
          className={cn(
            className,
            "m-0 flex h-full w-full justify-start p-2 text-left leading-tight whitespace-normal"
          )}
        >
          {triggerContent}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("", backgroundContentColor)}>
        <DialogHeader>
          <DialogTitle className="text-3xl text-center">
            {modalLabel}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
