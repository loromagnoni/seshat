import type { FindTransactionCategoriesDropdownOptions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTransactionCategoriesDropdownOptions {
    transactionCategories {
      id
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

const TransactionCategoryItem = (category: {
  id: number
  name: string
  icon: string
}) => {
  return (
    <option value={+category.id}>
      {category.icon} {category.name}
    </option>
  )
}

export const Success = ({
  transactionCategories,
}: CellSuccessProps<FindTransactionCategoriesDropdownOptions>) => {
  return <>{transactionCategories.map(TransactionCategoryItem)}</>
}
