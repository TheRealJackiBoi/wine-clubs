'use client'

import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/formik/FormikInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
  clubId: string
  userId: string
}

const AddMemberModal = ({ clubId, userId }: Props) => {
  const router = useRouter()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCreateEvent = async (values: { email: string }) => {
    try {
      console.log('before')
      const result = await axios.post<{ success: boolean; message: string }>(
        `/api/clubs/${clubId}/invite`,
        { userId, values },
      ) // Replace with actual API call to create event
      console.log(result)
      const data = result.data
      if (data.success) {
        toast({
          title: 'Sent Invitation',
          description: `An invitaion was send to ${values.email}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        onClose() // Close the modal after success
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description:
            data.message || `Failed to send an invitation to ${values.email}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred when sending invitation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <IconButton
        aria-label='Add member'
        colorScheme='blue'
        icon={<MdAdd />}
        onClick={onOpen}
        borderRadius='full'
        size='md'
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Not a valid email')
                  .required('Email is required'),
              })}
              onSubmit={handleCreateEvent}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input
                    label="Comming member's email"
                    placeholder='Enter the email'
                    name='email'
                    required
                  />
                  <Button
                    type='submit'
                    colorScheme='green'
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Send Invitation
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMemberModal
