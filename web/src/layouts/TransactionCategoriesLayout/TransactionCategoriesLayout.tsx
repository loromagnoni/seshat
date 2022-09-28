import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TransactionCategoryLayoutProps = {
  children: React.ReactNode
}

const TransactionCategoriesLayout = ({ children }: TransactionCategoryLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.transactionCategories()}
            className="rw-link"
          >
            TransactionCategories
          </Link>
        </h1>
        <Link
          to={routes.newTransactionCategory()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New TransactionCategory
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TransactionCategoriesLayout
