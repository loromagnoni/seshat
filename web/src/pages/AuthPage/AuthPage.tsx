import {
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const AuthPage = () => {
  const { logIn } = useAuth()

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy Seshat cool features ✌️
          </Text>
        </Stack>

        <IconButton
          aria-label="google-auth"
          shadow={'lg'}
          color={'white'}
          onClick={() => logIn().then(() => navigate(routes.home()))}
        >
          <FcGoogle size={20} />
        </IconButton>
      </Stack>
    </Flex>
  )
}

export default AuthPage
