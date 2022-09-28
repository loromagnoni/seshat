export const schema = gql`
  type Transaction {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
    transactionDate: DateTime!
    type: String!
    amount: Float!
    description: String!
    TransactionCateogory: TransactionCategory!
    transactionCategoryId: Int!
  }

  type Query {
    transactions: [Transaction!]! @requireAuth
    transaction(id: Int!): Transaction @requireAuth
  }

  input CreateTransactionInput {
    deletedAt: DateTime
    transactionDate: DateTime!
    type: String!
    amount: Float!
    description: String!
    transactionCategoryId: Int!
  }

  input UpdateTransactionInput {
    deletedAt: DateTime
    transactionDate: DateTime
    type: String
    amount: Float
    description: String
    transactionCategoryId: Int
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction!
      @requireAuth
    deleteTransaction(id: Int!): Transaction! @requireAuth
  }
`
