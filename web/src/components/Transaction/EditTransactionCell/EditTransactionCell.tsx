import type { EditTransactionById, UpdateTransactionInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TransactionForm from 'src/components/Transaction/TransactionForm'

export const QUERY = gql`
  query EditTransactionById($id: Int!) {
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

const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransactionMutation(
    $id: Int!
    $input: UpdateTransactionInput!
  ) {
    updateTransaction(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  transaction,
}: CellSuccessProps<EditTransactionById>) => {
  const [updateTransaction, { loading, error }] = useMutation(
    UPDATE_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Transaction updated')
        navigate(routes.transactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTransactionInput,
    id: EditTransactionById['transaction']['id']
  ) => {
    updateTransaction({ variables: { id, input } })
  }

  return (
    <TransactionForm
      transaction={transaction}
      onSave={onSave}
      error={error}
      loading={loading}
      title="Edit transaction"
    />
  )
}
