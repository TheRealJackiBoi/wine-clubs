'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { MdInfo } from 'react-icons/md'
import axios from 'axios'
import { colors } from '@/styles/theme'

type Props = {
  userId: string
  clubId: string
}

const LeaveClubModal = ({ clubId, userId }: Props) => {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLeaveClub = async () => {
    try {
      const result = await axios.patch<{ success: boolean; message: string }>(
        `/api/clubs/${clubId}/remove-member`,
        {
          userId: userId,
        },
      )

      const data = result.data

      if (data.success) {
        toast({
          title: 'Club left',
          description: 'You have left the club.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

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
  return (
    <>
      <Button
        bg={colors.brandRed}
        leftIcon={<MdInfo />}
        onClick={onOpen}
        textColor={colors.brandWhite}
        _hover={{ bg: colors.brandRedDark }}
      >
        Club Options
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Club Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme='red' onClick={handleLeaveClub}>
              Leave Club
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LeaveClubModal
