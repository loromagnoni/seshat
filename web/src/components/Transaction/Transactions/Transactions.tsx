import type { FindTransactions } from 'types/graphql'

import { TransactionItem } from './TransactionItem'

const TransactionsList = ({ transactions }: FindTransactions) => {
  return <>{transactions.map(TransactionItem)}</>
}

export default TransactionsList
