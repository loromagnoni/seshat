import type { CreateTransactionInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TransactionForm from 'src/components/Transaction/TransactionForm'

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransactionMutation($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`

const NewTransaction = () => {
  const [createTransaction, { loading, error }] = useMutation(
    CREATE_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Transaction created')
        navigate(routes.transactions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTransactionInput) => {
    createTransaction({ variables: { input } })
  }

  return (
    <TransactionForm
      title="New transaction"
      onSave={onSave}
      loading={loading}
      error={error}
    />
  )
}

export default NewTransaction
