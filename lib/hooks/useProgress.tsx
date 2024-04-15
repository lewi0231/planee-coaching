import { useEffect } from "react";

export const useProgress = (updateProgress: () => void, dep: unknown) => {
  useEffect(() => {
    updateProgress();
  }, [dep, updateProgress]);
};
