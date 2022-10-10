import { HStack, Text } from '@chakra-ui/react'
import { Transaction } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

export const TransactionItem = (transaction: Transaction) => {
  return (
    <Link
      to={routes.editTransaction({ id: transaction.id })}
      title={'Edit transaction ' + transaction.id}
    >
      <HStack justifyContent={'space-between'} key={transaction.id}>
        <HStack spacing={6}>
          <Text fontSize={32}>{transaction.TransactionCateogory.icon}</Text>
          <Text fontSize="xl">{transaction.description}</Text>
        </HStack>
        <Text fontSize="xl">{transaction.amount}</Text>
      </HStack>
    </Link>
  )
}
