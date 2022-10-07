import { ReactText } from 'react'

import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  FiChevronDown,
  FiFolder,
  FiHome,
  FiMenu,
  FiTrendingUp,
} from 'react-icons/fi'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { ThemeSwitcher } from 'src/components/ui/themeSwitch'
import { withDelay } from 'src/helper'

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>{' '}
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <main> {children}</main>
      </Box>
    </Box>
  )
}

export default HomeLayout

interface SidebarProps extends BoxProps {
  onClose: () => void
}

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, route: routes.home() },
    { name: 'Transaction', icon: FiTrendingUp, route: routes.transactions() },
    {
      name: 'Categories',
      icon: FiFolder,
      route: routes.transactionCategories(),
    },
  ]
  return (
    <VStack
      zIndex={10}
      pb={8}
      alignItems={'self-start'}
      justifyContent={'space-between'}
      transition="1s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Box width="full">
        <HStack
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
        >
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </HStack>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            onClick={onClose}
            route={link.route}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box p="4" mx="4">
        <ThemeSwitcher />
      </Box>
    </VStack>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  route: string
  children: ReactText
  onClick: () => void
}
const NavItem = ({ icon, children, route, onClick }: NavItemProps) => {
  return (
    <Link
      to={route}
      style={{ textDecoration: 'none' }}
      onClick={withDelay(300, onClick)}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logOut, currentUser } = useAuth()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={currentUser.picture} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{currentUser.email}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => logOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
