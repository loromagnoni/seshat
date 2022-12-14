import type { FindTransactionCategories } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TransactionCategories from 'src/components/TransactionCategory/TransactionCategories'

export const QUERY = gql`
  query FindTransactionCategories {
    transactionCategories {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No transactionCategories yet. '}
      <Link to={routes.newTransactionCategory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  transactionCategories,
}: CellSuccessProps<FindTransactionCategories>) => {
  return <TransactionCategories transactionCategories={transactionCategories} />
}
