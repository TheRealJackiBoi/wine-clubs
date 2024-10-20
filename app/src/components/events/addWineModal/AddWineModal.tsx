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
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Wine } from '@prisma/client'
import CreateNewWine from './CreateNewWineModal'
import { useRef, useState } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'

const AddWineModal = ({
  clubId,
  eventId,
  userEmail,
  wines: firstWines,
}: {
  clubId: string
  eventId: string
  userEmail: string
  wines: Wine[]
}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const selectRef = useRef<HTMLSelectElement | null>(null)
  const [wines, setWines] = useState(firstWines)

  const refetchWines = async () => {
    const result = await axios.get('/api/wines')

    const data = result.data

    if (data.success) {
      setWines(data.wines)
    }
  }
  const handleSelect = async () => {
    if (selectRef.current) {
      const selectedValue = selectRef.current.value

      try {
        const result = await axios.post(
          `/api/clubs/${clubId}/events/${eventId}/tasting`,
          { wineId: selectedValue, userEmail: userEmail },
        )

        const data = result.data

        if (data.success) {
          toast({
            title: 'Tasting added',
            description: data.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })

          refetchWines()
          onClose()
        } else {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.error(error)

        const errorMessage =
          axios.isAxiosError(error) && error.response
            ? error.response.data.message
            : 'An unexpected error occurred.'

        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
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
            <Select ref={selectRef}>
              {wines.length &&
                wines.map((wine) => (
                  <option key={wine.id} value={wine.id}>
                    <Avatar src={wine.image} />
                    {wine.name} - {DateTime.fromJSDate(wine.year).get('year')}
                  </option>
                ))}
            </Select>
            <HStack my={4} w='100%'>
              <CreateNewWine refetchWines={refetchWines} />
              <Spacer />
              <Button onClick={handleSelect} colorScheme='green'>
                Add Tasting
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddWineModal
