import type { Transaction } from '@prisma/client'

import {
  transactions,
  transaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './transactions'
import type { StandardScenario } from './transactions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('transactions', () => {
  scenario('returns all transactions', async (scenario: StandardScenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })

  scenario(
    'returns a single transaction',
    async (scenario: StandardScenario) => {
      const result = await transaction({ id: scenario.transaction.one.id })

      expect(result).toEqual(scenario.transaction.one)
    }
  )

  scenario('creates a transaction', async (scenario: StandardScenario) => {
    const result = await createTransaction({
      input: {
        updatedAt: '2022-09-28T20:55:15Z',
        type: 'String',
        amount: 3669599.0545665612,
        description: 'String',
        transactionCategoryId: scenario.transaction.two.transactionCategoryId,
      },
    })

    expect(result.updatedAt).toEqual('2022-09-28T20:55:15Z')
    expect(result.type).toEqual('String')
    expect(result.amount).toEqual(3669599.0545665612)
    expect(result.description).toEqual('String')
    expect(result.transactionCategoryId).toEqual(
      scenario.transaction.two.transactionCategoryId
    )
  })

  scenario('updates a transaction', async (scenario: StandardScenario) => {
    const original = (await transaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await updateTransaction({
      id: original.id,
      input: { updatedAt: '2022-09-29T20:55:15Z' },
    })

    expect(result.updatedAt).toEqual('2022-09-29T20:55:15Z')
  })

  scenario('deletes a transaction', async (scenario: StandardScenario) => {
    const original = (await deleteTransaction({
      id: scenario.transaction.one.id,
    })) as Transaction
    const result = await transaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
