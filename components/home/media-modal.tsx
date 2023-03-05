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
import ReactPlayer from 'react-player'

export function MediaModal({
  playId,
  srcUrl,
  videolUrl,
}: {
  playId: string
  srcUrl: string
  videolUrl?: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Image src={srcUrl} alt={playId} borderRadius="lg" onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {videolUrl ? (
              <video controls>
                <source src={videolUrl} type="video/mp4" />
                Sorry, your browser does not support videos.
              </video>
            ) : (
              <Image src={srcUrl} alt={playId} borderRadius="lg" />
            )}
          </ModalBody>
          <ModalFooter>
            {!videolUrl && (
              <Button onClick={() => downloadPhoto(srcUrl, playId)}>Download</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
