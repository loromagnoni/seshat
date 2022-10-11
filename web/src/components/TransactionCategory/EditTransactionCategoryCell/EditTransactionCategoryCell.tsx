import type {
  EditTransactionCategoryById,
  UpdateTransactionCategoryInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TransactionCategoryForm from 'src/components/TransactionCategory/TransactionCategoryForm'

export const QUERY = gql`
  query EditTransactionCategoryById($id: Int!) {
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
const UPDATE_TRANSACTION_CATEGORY_MUTATION = gql`
  mutation UpdateTransactionCategoryMutation(
    $id: Int!
    $input: UpdateTransactionCategoryInput!
  ) {
    updateTransactionCategory(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  transactionCategory,
}: CellSuccessProps<EditTransactionCategoryById>) => {
  const [updateTransactionCategory, { loading, error }] = useMutation(
    UPDATE_TRANSACTION_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('TransactionCategory updated')
        navigate(routes.transactionCategories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTransactionCategoryInput,
    id: EditTransactionCategoryById['transactionCategory']['id']
  ) => {
    updateTransactionCategory({ variables: { id, input } })
  }

  return (
    <TransactionCategoryForm
      transactionCategory={transactionCategory}
      onSave={onSave}
      error={error}
      loading={loading}
      title={'Edit category'}
    />
  )
}
