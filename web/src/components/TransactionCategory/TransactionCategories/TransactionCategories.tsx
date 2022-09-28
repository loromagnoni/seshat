import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TransactionCategory/TransactionCategoriesCell'

import type { DeleteTransactionCategoryMutationVariables, FindTransactionCategories } from 'types/graphql'

const DELETE_TRANSACTION_CATEGORY_MUTATION = gql`
  mutation DeleteTransactionCategoryMutation($id: Int!) {
    deleteTransactionCategory(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (value: string | number) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}


const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const TransactionCategoriesList = ({ transactionCategories }: FindTransactionCategories) => {
  const [deleteTransactionCategory] = useMutation(DELETE_TRANSACTION_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('TransactionCategory deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTransactionCategoryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete transactionCategory ' + id + '?')) {
      deleteTransactionCategory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Deleted at</th>
            <th>Name</th>
            <th>Icon</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {transactionCategories.map((transactionCategory) => (
            <tr key={transactionCategory.id}>
              <td>{truncate(transactionCategory.id)}</td>
              <td>{timeTag(transactionCategory.createdAt)}</td>
              <td>{timeTag(transactionCategory.updatedAt)}</td>
              <td>{timeTag(transactionCategory.deletedAt)}</td>
              <td>{truncate(transactionCategory.name)}</td>
              <td>{truncate(transactionCategory.icon)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.transactionCategory({ id: transactionCategory.id })}
                    title={'Show transactionCategory ' + transactionCategory.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTransactionCategory({ id: transactionCategory.id })}
                    title={'Edit transactionCategory ' + transactionCategory.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete transactionCategory ' + transactionCategory.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(transactionCategory.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionCategoriesList
