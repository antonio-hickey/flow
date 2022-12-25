import { router } from '../trpc';

import { projectRouter } from "./project";

export const appRouter = router({
  projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
