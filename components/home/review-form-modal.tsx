import {
  Button,
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
import { ReviewForm } from './review-form'

export const ReviewFormModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button mt={4} colorScheme="teal" onClick={onOpen}>
        Write a Review
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReviewForm onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="teal" mr={3}>
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
