import { z } from 'zod';
import { procedure, router } from '../trpc';

export const projectRouter = router({
  getProjects: procedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input }) => {
      return prisma?.project.findMany({
        where: {
          userId: input.userId
        },
        include: {
          tasks: {
            include: {
              tags: {
                include: {
                  tag: true
                }
              }
            }
          }
        }
      })
    }),
});

// export type definition of API
export type ProjectRouter = typeof projectRouter;

