import { z } from 'zod';
import { procedure, router } from '../trpc';

export const projectRouter = router({
  getProjects: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type ProjectRouter = typeof projectRouter;

