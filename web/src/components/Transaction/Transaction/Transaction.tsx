import type {
  DeleteTransactionMutationVariables,
  FindTransactionById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransactionMutation($id: Int!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}
interface Props {
  transaction: NonNullable<FindTransactionById['transaction']>
}

const Transaction = ({ transaction }: Props) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Transaction deleted')
      navigate(routes.transactions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTransactionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete transaction ' + id + '?')) {
      deleteTransaction({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Transaction {transaction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{transaction.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(transaction.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(transaction.updatedAt)}</td>
            </tr>
            <tr>
              <th>Deleted at</th>
              <td>{timeTag(transaction.deletedAt)}</td>
            </tr>
            <tr>
              <th>Transaction date</th>
              <td>{timeTag(transaction.transactionDate)}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{transaction.type}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{transaction.amount}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{transaction.description}</td>
            </tr>
            <tr>
              <th>Transaction category id</th>
              <td>{transaction.transactionCategoryId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTransaction({ id: transaction.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(transaction.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Transaction
