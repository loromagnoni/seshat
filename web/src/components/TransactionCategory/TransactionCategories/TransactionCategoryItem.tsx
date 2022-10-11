import { HStack, Text } from '@chakra-ui/react'
import { TransactionCategory } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

export const TransactionCategoryItem = (category: TransactionCategory) => {
  return (
    <Link
      to={routes.editTransactionCategory({ id: category.id })}
      title={'Edit cateogry ' + category.id}
    >
      <HStack justifyContent={'center'} spacing={6} key={category.id}>
        <Text fontSize={'3xl'}>{category.icon}</Text>
        <Text fontSize="xl">{category.name}</Text>
      </HStack>
    </Link>
  )
}
