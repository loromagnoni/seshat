import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import type { DeleteTransactionCategoryMutationVariables, FindTransactionCategoryById } from 'types/graphql'

const DELETE_TRANSACTION_CATEGORY_MUTATION = gql`
  mutation DeleteTransactionCategoryMutation($id: Int!) {
    deleteTransactionCategory(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  transactionCategory: NonNullable<FindTransactionCategoryById['transactionCategory']>
}

const TransactionCategory = ({ transactionCategory }: Props) => {
  const [deleteTransactionCategory] = useMutation(DELETE_TRANSACTION_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('TransactionCategory deleted')
      navigate(routes.transactionCategories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTransactionCategoryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete transactionCategory ' + id + '?')) {
      deleteTransactionCategory({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TransactionCategory {transactionCategory.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{transactionCategory.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(transactionCategory.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(transactionCategory.updatedAt)}</td>
            </tr><tr>
              <th>Deleted at</th>
              <td>{timeTag(transactionCategory.deletedAt)}</td>
            </tr><tr>
              <th>Name</th>
              <td>{transactionCategory.name}</td>
            </tr><tr>
              <th>Icon</th>
              <td>{transactionCategory.icon}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTransactionCategory({ id: transactionCategory.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(transactionCategory.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TransactionCategory
