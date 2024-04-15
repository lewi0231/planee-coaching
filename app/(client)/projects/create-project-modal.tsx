"use client";

import MultiStepForm from "@/components/multi-step-form/multi-step-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CreateProjectType } from "@/lib/types/form-fields";
import { useRef, useState } from "react";

type Props = {
  handleOptimisticCreate: (project: CreateProjectType) => void;
};
const CreateProjectModal = ({ handleOptimisticCreate }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //     const currentElement = refs.current[currentStep]
  //     if (!currentElement) return;

  //     currentElement?.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'center',
  //     })

  //     const inputElement = currentElement?.querySelector(
  //         'button, textarea, input',
  //     ) as HTMLInputElement
  //     inputElement?.focus()

  //     console.debug('The current step is ', currentStep)
  // }, [currentStep])

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create A New Project</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] min-h-[95vh] sm:max-w-[600px] m-0">
        <div>
          <Progress value={progress} className=" h-1 w-[90%] m-auto" />
        </div>

        <MultiStepForm
          handleCloseModal={() => setIsDialogOpen(false)}
          updateProgressBar={updateProgress}
          handleOptimisticCreate={handleOptimisticCreate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
