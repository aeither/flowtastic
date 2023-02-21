import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const dbRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  reviewAverage: publicProcedure
    .input(
      z.object({
        playId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
        where: {
          playId: {
            equals: input.playId,
          },
        },
        orderBy: {
          rating: 'asc',
        },
      })
    }),

  reviewsByPlayId: publicProcedure
    .input(
      z.object({
        playId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findMany({
        where: {
          playId: input.playId,
        },
      })
    }),

  createReview: protectedProcedure
    .input(
      z.object({
        playId: z.number(),
        rating: z.number(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { playId, rating, title, description } = input
      /**
       * Prisma DB check and update usage
       */
      const userId = ctx.session.user.id
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found in database.',
        })
      }

      return await ctx.prisma.review.create({
        data: { playId, rating, title, description, userId },
      })
    }),
})
