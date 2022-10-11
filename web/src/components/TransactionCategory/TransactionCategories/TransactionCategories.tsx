import type { FindTransactionCategories } from 'types/graphql'

import { TransactionCategoryItem } from './TransactionCategoryItem'

const TransactionCategoriesList = ({
  transactionCategories,
}: FindTransactionCategories) => {
  return <>{transactionCategories.map(TransactionCategoryItem)}</>
}

export default TransactionCategoriesList
