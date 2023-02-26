import {
  Button,
  Heading,
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
import Google from '../shared/icons/google'

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
              <Image alt="logo" src="/dark_logo.png" boxSize={'16'} />
              <Heading fontSize={'xl'}>Welcome to Flowtastic!</Heading>
              <Button
                isLoading={signInClicked}
                onClick={() => {
                  setSignInClicked(true)
                  // Non-leaking Arrow Functions
                  void signIn('google')
                }}
                spinner={<BeatLoader size={8} color="white" />}
                leftIcon={<Google className=''/>}
              >
                Sign in with Google
              </Button>
              {/* <Button
                isLoading={signInClicked}
                onClick={() => {
                  setSignInClicked(true)
                  void signIn('email', {
                    email: '',
                    redirect: false,
                    callbackUrl: '/welcome',
                  })
                }}
                spinner={<BeatLoader size={8} color="white" />}
              >
                Sign in with Email
              </Button> */}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
