import type { Prisma, TransactionCategory } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCategoryCreateArgs>({
  transactionCategory: {
    one: {
      data: {
        updatedAt: '2022-09-28T20:44:38Z',
        name: 'String',
        icon: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-09-28T20:44:38Z',
        name: 'String',
        icon: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  TransactionCategory,
  'transactionCategory'
>
