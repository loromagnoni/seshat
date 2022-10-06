import type {
  MutationResolvers,
  QueryResolvers,
  TransactionCategoryRelationResolvers,
} from 'types/graphql'

import { authFilter, authProxy } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const transactionCategories: QueryResolvers['transactionCategories'] =
  () => {
    return db.transactionCategory.findMany(authFilter())
  }

export const transactionCategory: QueryResolvers['transactionCategory'] = ({
  id,
}) => {
  return authProxy(
    db.transactionCategory.findUnique({
      where: { id },
    })
  )
}

export const createTransactionCategory: MutationResolvers['createTransactionCategory'] =
  ({ input }) => {
    return db.transactionCategory.create({
      data: { ...input, userId: context.currentUser.user_id },
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
