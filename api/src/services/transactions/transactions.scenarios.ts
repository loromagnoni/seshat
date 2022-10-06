import type { Prisma, Transaction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TransactionCreateArgs>({
  transaction: {
    one: {
      data: {
        updatedAt: '2022-09-28T20:55:15Z',
        type: 'String',
        amount: 5687791.937945894,
        description: 'String',
        TransactionCateogory: {
          create: {
            updatedAt: '2022-09-28T20:55:15Z',
            name: 'String',
            icon: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-09-28T20:55:15Z',
        type: 'String',
        amount: 6026925.788943427,
        description: 'String',
        TransactionCateogory: {
          create: {
            updatedAt: '2022-09-28T20:55:15Z',
            name: 'String',
            icon: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Transaction, 'transaction'>
