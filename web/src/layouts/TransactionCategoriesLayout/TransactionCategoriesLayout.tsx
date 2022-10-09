import { BsPlus } from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TransactionCategoryLayoutProps = {
  children: React.ReactNode
}

const TransactionCategoriesLayout = ({
  children,
}: TransactionCategoryLayoutProps) => {
  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <b>
          <Link to={routes.transactionCategories()}>
            Transaction Categories
          </Link>
        </b>
        <Link to={routes.newTransactionCategory()}>
          <BsPlus size={28} />
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TransactionCategoriesLayout
