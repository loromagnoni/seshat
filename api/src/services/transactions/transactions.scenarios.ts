import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        updatedAt: '2022-09-28T17:34:04Z',
        type: 'String',
        amount: 4036044.4191831225,
        description: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-09-28T17:34:04Z',
        type: 'String',
        amount: 9854.310033636793,
        description: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
