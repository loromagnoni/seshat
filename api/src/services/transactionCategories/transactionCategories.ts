import type {
  QueryResolvers,
  MutationResolvers,
  TransactionCategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const transactionCategories: QueryResolvers['transactionCategories'] =
  () => {
    return db.transactionCategory.findMany()
  }

export const transactionCategory: QueryResolvers['transactionCategory'] = ({
  id,
}) => {
  return db.transactionCategory.findUnique({
    where: { id },
  })
}

export const createTransactionCategory: MutationResolvers['createTransactionCategory'] =
  ({ input }) => {
    return db.transactionCategory.create({
      data: input,
    })
  }

export const updateTransactionCategory: MutationResolvers['updateTransactionCategory'] =
  ({ id, input }) => {
    return db.transactionCategory.update({
      data: input,
      where: { id },
    })
  }

export const deleteTransactionCategory: MutationResolvers['deleteTransactionCategory'] =
  ({ id }) => {
    return db.transactionCategory.delete({
      where: { id },
    })
  }

export const TransactionCategory: TransactionCategoryRelationResolvers = {
  Transaction: (_obj, { root }) => {
    return db.transactionCategory
      .findUnique({ where: { id: root?.id } })
      .Transaction()
  },
}
