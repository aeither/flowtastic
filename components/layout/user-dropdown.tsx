import { Avatar, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { FC } from 'react'

export const UserDropdown: FC = () => {
  const { data: session } = useSession()
  const { email, image, name } = session?.user || {}
  if (!email) return null

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar size={'sm'} name={name || 'acme'} src={image || ''} />
        </MenuButton>
        <MenuList zIndex={50}>
          <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/compare">
            <MenuItem>Compare</MenuItem>
          </Link>
          <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/collection">
            <MenuItem>Collection</MenuItem>
          </Link>
          <Link _hover={{ textDecoration: 'none' }} as={NextLink} href="/my-reviews">
            <MenuItem>My Reviews</MenuItem>
          </Link>
          <MenuItem onClick={() => void signOut({ redirect: false })}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
