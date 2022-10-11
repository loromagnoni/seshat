import { FaTrash } from 'react-icons/fa'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransactionMutation($id: Int!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

interface DeleteTransactionButtonProps {
  id: number
}

export const DeleteTransactionButton = ({
  id,
}: DeleteTransactionButtonProps) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Transaction deleted')
      navigate(routes.transactions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = () => {
    if (confirm('Are you sure you want to delete transaction?')) {
      deleteTransaction({ variables: { id } })
    }
  }

  return <FaTrash onClick={onDeleteClick} />
}
