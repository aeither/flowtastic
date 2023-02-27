import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { FC } from 'react'
import { ReviewForm } from './review-form'

export const ReviewFormModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boxBgColor = useColorModeValue('white', 'gray.800')
  return (
    <>
      <Box
        position={{ base: 'fixed', md: 'relative' }}
        boxShadow={{ base: 'dark-lg', md: 'none' }}
        bgColor={boxBgColor}
        zIndex={20}
        bottom={0}
        height="60px"
        w="full"
      >
        <VStack mx={2} h={'full'} justify={'center'}>
          <Button w={{ base: 'full', md: 'sm' }} colorScheme="teal" onClick={onOpen}>
            Write a Review
          </Button>
        </VStack>
      </Box>

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
