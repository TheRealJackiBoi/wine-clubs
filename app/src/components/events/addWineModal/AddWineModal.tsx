'use client'
import {
  Avatar,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Wine } from '@prisma/client'
import CreateNewWine from './CreateNewWineModal'
import { useState } from 'react'

const AddWineModal = ({
  eventId,
  wines: firstWines,
}: {
  eventId: string
  wines: Wine[]
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [wines, setWines] = useState(firstWines)

  console.log(eventId)

  const refetchWines = () => {
    // TODO: fetch wines
    setWines(firstWines)
  }

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        Add Wine
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Wine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Select a wine or add a new, it it doesn{"'"}t exist</Text>
            <HStack>
              <Select>
                {wines.length &&
                  wines.map((wine) => (
                    <option key={wine.id} value={wine.id}>
                      <Avatar src={wine.image} />
                      {wine.name} - {wine.year.getFullYear()}
                    </option>
                  ))}
              </Select>
              <CreateNewWine refetchWines={refetchWines} />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddWineModal
