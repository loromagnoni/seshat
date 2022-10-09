import { BsPlus } from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TransactionLayoutProps = {
  children: React.ReactNode
}

const TransactionsLayout = ({ children }: TransactionLayoutProps) => {
  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <b>
          <Link to={routes.transactions()}>Transactions</Link>
        </b>
        <Link to={routes.newTransaction()}>
          <BsPlus size={28} />
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TransactionsLayout
