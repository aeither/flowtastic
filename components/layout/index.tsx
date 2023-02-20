import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { BeatLoader } from 'react-spinners'
import { SignInModal } from './sign-in-modal'
import { UserDropdown } from './user-dropdown'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()

  // sign in modal with signIn("google");

  return (
    <div>
      <Flex p={4} minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Flowtastic</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <IconButton
            aria-label="toggleColorMode"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />
          {!session && status !== 'loading' ? (
            <SignInModal />
          ) : (
            <UserDropdown />
          )}
        </ButtonGroup>
      </Flex>
      <main className="flex w-full flex-col items-center justify-center pt-16">
        {children}
      </main>
      {/* Footer */}
    </div>
  )
}
