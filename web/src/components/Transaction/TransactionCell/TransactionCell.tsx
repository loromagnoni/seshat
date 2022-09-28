import type { FindTransactionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Transaction from 'src/components/Transaction/Transaction'

export const QUERY = gql`
  query FindTransactionById($id: Int!) {
    transaction: transaction(id: $id) {
      id
      createdAt
      updatedAt
      deletedAt
      transactionDate
      type
      amount
      description
      transactionCategoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Transaction not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  transaction,
}: CellSuccessProps<FindTransactionById>) => {
  return <Transaction transaction={transaction} />
}
