import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton aria-label="Menu" icon={<HamburgerIcon />} onClick={onOpen} />

      <Drawer placement={'left' as any} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack>
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
