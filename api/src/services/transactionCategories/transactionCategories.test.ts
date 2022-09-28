import type { TransactionCategory } from '@prisma/client'

import {
  transactionCategories,
  transactionCategory,
  createTransactionCategory,
  updateTransactionCategory,
  deleteTransactionCategory,
} from './transactionCategories'
import type { StandardScenario } from './transactionCategories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('transactionCategories', () => {
  scenario(
    'returns all transactionCategories',
    async (scenario: StandardScenario) => {
      const result = await transactionCategories()

      expect(result.length).toEqual(
        Object.keys(scenario.transactionCategory).length
      )
    }
  )

  scenario(
    'returns a single transactionCategory',
    async (scenario: StandardScenario) => {
      const result = await transactionCategory({
        id: scenario.transactionCategory.one.id,
      })

      expect(result).toEqual(scenario.transactionCategory.one)
    }
  )

  scenario('creates a transactionCategory', async () => {
    const result = await createTransactionCategory({
      input: {
        updatedAt: '2022-09-28T20:44:38Z',
        name: 'String',
        icon: 'String',
      },
    })

    expect(result.updatedAt).toEqual('2022-09-28T20:44:38Z')
    expect(result.name).toEqual('String')
    expect(result.icon).toEqual('String')
  })

  scenario(
    'updates a transactionCategory',
    async (scenario: StandardScenario) => {
      const original = (await transactionCategory({
        id: scenario.transactionCategory.one.id,
      })) as TransactionCategory
      const result = await updateTransactionCategory({
        id: original.id,
        input: { updatedAt: '2022-09-29T20:44:38Z' },
      })

      expect(result.updatedAt).toEqual('2022-09-29T20:44:38Z')
    }
  )

  scenario(
    'deletes a transactionCategory',
    async (scenario: StandardScenario) => {
      const original = (await deleteTransactionCategory({
        id: scenario.transactionCategory.one.id,
      })) as TransactionCategory
      const result = await transactionCategory({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
