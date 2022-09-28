import type { FindTransactionCategoryById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TransactionCategory from 'src/components/TransactionCategory/TransactionCategory'

export const QUERY = gql`
  query FindTransactionCategoryById($id: Int!) {
    transactionCategory: transactionCategory(id: $id) {
      id
      createdAt
      updatedAt
      deletedAt
      name
      icon
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TransactionCategory not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ transactionCategory }: CellSuccessProps<FindTransactionCategoryById>) => {
  return <TransactionCategory transactionCategory={transactionCategory} />
}
