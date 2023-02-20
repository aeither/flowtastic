import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { FC } from 'react'

export const UserDropdown: FC = () => {
  const { data: session } = useSession()
  const { email, image, name } = session?.user || {}
  console.log('🚀 ~ file: user-dropdown.tsx:31 ~ image:', image)
  if (!email) return null

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar size={'sm'} name={name || 'acme'} src={image || ''} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => void signOut({ redirect: false })}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
