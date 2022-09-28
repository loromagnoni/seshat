export const schema = gql`
  type TransactionCategory {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deletedAt: DateTime
    name: String!
    icon: String!
    Transaction: [Transaction]!
  }

  type Query {
    transactionCategories: [TransactionCategory!]! @requireAuth
    transactionCategory(id: Int!): TransactionCategory @requireAuth
  }

  input CreateTransactionCategoryInput {
    deletedAt: DateTime
    name: String!
    icon: String!
  }

  input UpdateTransactionCategoryInput {
    deletedAt: DateTime
    name: String
    icon: String
  }

  type Mutation {
    createTransactionCategory(
      input: CreateTransactionCategoryInput!
    ): TransactionCategory! @requireAuth
    updateTransactionCategory(
      id: Int!
      input: UpdateTransactionCategoryInput!
    ): TransactionCategory! @requireAuth
    deleteTransactionCategory(id: Int!): TransactionCategory! @requireAuth
  }
`
