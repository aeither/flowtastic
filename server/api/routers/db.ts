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

  user: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    return await ctx.prisma.user.findUnique({ where: { id: userId } })
  }),

  incrementUsage: protectedProcedure.mutation(async ({ ctx }) => {
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
      where: { id: userId },
      data: { name: 'name name' },
    })
  }),
})
