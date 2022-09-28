import TransactionCategoryCell from 'src/components/TransactionCategory/TransactionCategoryCell'

type TransactionCategoryPageProps = {
  id: number
}

const TransactionCategoryPage = ({ id }: TransactionCategoryPageProps) => {
  return <TransactionCategoryCell id={id} />
}

export default TransactionCategoryPage
