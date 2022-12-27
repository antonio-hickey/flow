import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const projectRouter = router({
  getProjects: publicProcedure
    .input(
      z.object({
        userId: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      console.log(input)
      return prisma.project.findMany({
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
