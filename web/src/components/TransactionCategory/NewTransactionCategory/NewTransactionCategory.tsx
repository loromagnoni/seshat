import type { CreateTransactionCategoryInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TransactionCategoryForm from 'src/components/TransactionCategory/TransactionCategoryForm'

const CREATE_TRANSACTION_CATEGORY_MUTATION = gql`
  mutation CreateTransactionCategoryMutation(
    $input: CreateTransactionCategoryInput!
  ) {
    createTransactionCategory(input: $input) {
      id
    }
  }
`

const NewTransactionCategory = () => {
  const [createTransactionCategory, { loading, error }] = useMutation(
    CREATE_TRANSACTION_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('TransactionCategory created')
        navigate(routes.transactionCategories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTransactionCategoryInput) => {
    createTransactionCategory({ variables: { input } })
  }

  return (
    <TransactionCategoryForm
      onSave={onSave}
      loading={loading}
      error={error}
      title={'Create category'}
    />
  )
}

export default NewTransactionCategory
