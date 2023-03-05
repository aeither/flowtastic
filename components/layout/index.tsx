import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { type ReactNode } from 'react'
import MobileDrawer from './mobile-drawer'
import { SignInModal } from './sign-in-modal'
import { UserDropdown } from './user-dropdown'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false })
  const navbarBgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Flowtastic</title>
        <meta
          name="description"
          content="Find, compare and choose the right Moment with user reviews."
        />

        {/* Open Graph */}
        <meta property="og:image" content="/hero.png" />
        <meta property="og:site_name" content="flowtastic.vercel.app" />
        <meta property="og:title" content="Flowtastic" />
        <meta
          property="og:description"
          content="Find, compare and choose the right Moment with user reviews."
        />

        {/* Twitter */}
        <meta name="twitter:image" content="/hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flowtastic" />
        <meta
          name="twitter:description"
          content="Find, compare and choose the right Moment with user reviews."
        />
      </Head>

      {/* Navbar */}
      <Flex
        zIndex={50}
        blur="md"
        bg={navbarBgColor}
        pos={'fixed'}
        w="full"
        p={4}
        minWidth="max-content"
        alignItems="center"
        gap="2"
      >
        {isMobile ? (
          <>
            <MobileDrawer />
            <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/golazos">
              <Box p="2">
                <Heading size="md">Flowtastic</Heading>
              </Box>
            </Link>
          </>
        ) : (
          <>
            <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/golazos">
              <Box p="2">
                <Heading size="md">Flowtastic</Heading>
              </Box>
            </Link>
            <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/golazos">
              <Button variant={'ghost'}>Golazos</Button>
            </Link>
            <Button variant={'ghost'} color="gray.400" disabled>
              Top Shot
            </Button>
            <Button variant={'ghost'} color="gray.400" disabled>
              All Day
            </Button>
            <Button variant={'ghost'} color="gray.400" disabled>
              Strike
            </Button>
          </>
        )}

        <Spacer />
        <ButtonGroup gap="2">
          <IconButton
            aria-label="toggleColorMode"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />
          {!session && status !== 'loading' ? <SignInModal /> : <UserDropdown />}
        </ButtonGroup>
      </Flex>
      <Box h="72px"></Box>
      <main>{children}</main>

      {/* Footer */}
      <Flex justify={'center'} p={4}>
        Flowtastic © 2023.{' '}
        <Link href="https://twitter.com/flowtastic_find" textColor={'blue.500'}>
          Twitter
        </Link>
      </Flex>
    </div>
  )
}
