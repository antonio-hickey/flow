import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const tasksRouter = router({
  addTask: publicProcedure
    .input(z.object({
      userId: z.string(),
			projectId: z.number(),
			name: z.string(),
			description: z.string().nullish(),
			finished: z.boolean().default(false),
			minutesWorked: z.number().default(0),
    }))
		.mutation(async ({ ctx, input }) => {
			await prisma.task.create({
				data: {
					name: input.name,
					description: input.description,
					projectId: input.projectId,
					finished: input.finished,
					minutesWorked: input.minutesWorked,
				}
			});
		}),
});

export type ProjectRouter = typeof tasksRouter;


