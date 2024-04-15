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
  className: string;
  triggerContent: string;
  triggerStyle: ButtonProps["variant"];
  modalLabel: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CustomDialog = ({
  className,
  triggerStyle,
  triggerContent,
  modalLabel,
  children,
  isOpen,
  setIsOpen,
}: Props) => {
  // const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={triggerStyle}
          className={cn(
            "m-0 flex h-full w-full justify-start p-0 text-left leading-tight",
            className
          )}
        >
          {triggerContent}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">{modalLabel}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
