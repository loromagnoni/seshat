// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import TransactionCategoriesLayout from 'src/layouts/TransactionCategoriesLayout'
import TransactionsLayout from 'src/layouts/TransactionsLayout'

import HomeLayout from './layouts/HomeLayout/HomeLayout'
import AuthPage from './pages/AuthPage/AuthPage'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="auth">
        <Set wrap={HomeLayout}>
          <Set wrap={TransactionCategoriesLayout}>
            <Route path="/transaction-categories/new" page={TransactionCategoryNewTransactionCategoryPage} name="newTransactionCategory" />
            <Route path="/transaction-categories/{id:Int}/edit" page={TransactionCategoryEditTransactionCategoryPage} name="editTransactionCategory" />
            <Route path="/transaction-categories/{id:Int}" page={TransactionCategoryTransactionCategoryPage} name="transactionCategory" />
            <Route path="/transaction-categories" page={TransactionCategoryTransactionCategoriesPage} name="transactionCategories" />
          </Set>
          <Route path="/" page={HomePage} name="home" />
          <Set wrap={TransactionsLayout}>
            <Route path="/transactions/new" page={TransactionNewTransactionPage} name="newTransaction" />
            <Route path="/transactions/{id:Int}/edit" page={TransactionEditTransactionPage} name="editTransaction" />
            <Route path="/transactions/{id:Int}" page={TransactionTransactionPage} name="transaction" />
            <Route path="/transactions" page={TransactionTransactionsPage} name="transactions" />
          </Set>
          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
      <Route path="/auth" page={AuthPage} name="auth" />
    </Router>
  )
}

export default Routes
