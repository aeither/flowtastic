import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const dbRouter = createTRPCRouter({
  reviewAverage: publicProcedure
    .input(
      z.object({
        playId: z.number(),
      }),
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
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findMany({
        where: {
          playId: input.playId,
        },
        include: { user: { select: { address: true } } },
      })
    }),

  userAddress: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id

    return await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        address: true,
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
        fundraising: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
        data: { userId, ...input },
      })
    }),

  updateReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.number(),
        onChain: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { reviewId, onChain } = input
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

      return await ctx.prisma.review.update({
        where: { id: reviewId },
        data: { onChain: onChain },
      })
    }),

  addAddress: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { address } = input
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

      return await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          address,
        },
      })
    }),
})
