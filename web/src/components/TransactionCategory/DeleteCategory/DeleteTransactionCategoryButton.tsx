import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { DeleteButton } from 'src/components/ui/deleteButton'

interface DeleteCategoryButtonProps {
  name: string
  id: number
}

const DELETE_TRANSACTION_CATEGORY_MUTATION = gql`
  mutation DeleteTransactionCategoryMutation($id: Int!) {
    deleteTransactionCategory(id: $id) {
      id
    }
  }
`

export const DeleteTransactionCategoryButton = ({
  id,
  name,
}: DeleteCategoryButtonProps) => {
  const [deleteTransactionCategory] = useMutation(
    DELETE_TRANSACTION_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('TransactionCategory deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = () => {
    if (confirm(`Are you sure you want to delete ${name} category?`)) {
      deleteTransactionCategory({ variables: { id } })
    }
  }

  return <DeleteButton onClick={onDeleteClick} />
}
