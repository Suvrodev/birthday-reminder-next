import { startTransition } from "react";
import { revalidateAll } from "./revalidateProject";

export const handleLoad = async () => {
  startTransition(async () => {
    await revalidateAll();
  });
};
