import downloadPhoto from '@/libs/utils/downloadPhoto'
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
  useDisclosure,
} from '@chakra-ui/react'

export function MediaModal({
  playId,
  srcUrl,
}: {
  playId: string
  srcUrl: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Image src={srcUrl} alt={playId} borderRadius="lg" onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={srcUrl} alt={playId} borderRadius="lg" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => downloadPhoto(srcUrl, playId)}>
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
