import { Box, IconButton } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import { BsMoonStarsFill, BsSun } from 'react-icons/bs'

export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box>
      {colorMode === 'dark' ? (
        <IconButton
          aria-label="dark"
          bg="transparent"
          fontSize="20px"
          icon={<BsSun />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="light"
          bg="transparent"
          icon={<BsMoonStarsFill />}
          onClick={toggleColorMode}
          fontSize="20px"
        />
      )}
    </Box>
  )
}
