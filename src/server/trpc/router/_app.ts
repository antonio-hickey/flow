import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { projectRouter } from "./project";
import { tasksRouter } from "./tasks";


export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  project: projectRouter,
  task: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
