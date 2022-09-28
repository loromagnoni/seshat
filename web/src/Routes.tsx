// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import TransactionsLayout from 'src/layouts/TransactionsLayout'

import HomeLayout from './layouts/HomeLayout/HomeLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={TransactionsLayout}>
          <Route path="/transactions/new" page={TransactionNewTransactionPage} name="newTransaction" />
          <Route path="/transactions/{id:Int}/edit" page={TransactionEditTransactionPage} name="editTransaction" />
          <Route path="/transactions/{id:Int}" page={TransactionTransactionPage} name="transaction" />
          <Route path="/transactions" page={TransactionTransactionsPage} name="transactions" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
