import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export const SignInModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [signInClicked, setSignInClicked] = useState(false)

  return (
    <>
      <Button onClick={onOpen}>Sign in</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4}>
              <Image alt="logo" src="https://via.placeholder.com/150x150" />
              <Text>Welcome to Flowtastic!</Text>
              <Button
                isLoading={signInClicked}
                onClick={() => {
                  setSignInClicked(true)
                  // Non-leaking Arrow Functions
                  void signIn('google')
                }}
                spinner={<BeatLoader size={8} color="white" />}
              >
                Sign in with Google
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
