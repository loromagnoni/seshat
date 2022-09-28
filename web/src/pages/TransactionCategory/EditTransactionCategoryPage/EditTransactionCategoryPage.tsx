import EditTransactionCategoryCell from 'src/components/TransactionCategory/EditTransactionCategoryCell'

type TransactionCategoryPageProps = {
  id: number
}

const EditTransactionCategoryPage = ({ id }: TransactionCategoryPageProps) => {
  return <EditTransactionCategoryCell id={id} />
}

export default EditTransactionCategoryPage
