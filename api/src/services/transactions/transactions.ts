import type {
  QueryResolvers,
  MutationResolvers,
  TransactionRelationResolvers,
} from 'types/graphql'

import { authFilter, authProxy } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const transactions: QueryResolvers['transactions'] = () => {
  return db.transaction.findMany(authFilter())
}

export const transaction: QueryResolvers['transaction'] = ({ id }) => {
  return authProxy(
    db.transaction.findUnique({
      where: { id },
    })
  )
}

export const createTransaction: MutationResolvers['createTransaction'] = ({
  input,
}) => {
  return db.transaction.create({
    data: { ...input, userId: context.currentUser.user_id },
  })
}

export const updateTransaction: MutationResolvers['updateTransaction'] = ({
  id,
  input,
}) => {
  return db.transaction.update({
    data: input,
    where: { id },
  })
}

export const deleteTransaction: MutationResolvers['deleteTransaction'] = ({
  id,
}) => {
  return db.transaction.delete({
    where: { id },
  })
}

export const Transaction: TransactionRelationResolvers = {
  TransactionCateogory: (_obj, { root }) => {
    return db.transaction
      .findUnique({ where: { id: root?.id } })
      .TransactionCateogory()
  },
}
