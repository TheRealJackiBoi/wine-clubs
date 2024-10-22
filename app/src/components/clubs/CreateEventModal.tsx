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
import { MdAdd } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/formik/FormikInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
  clubId: string
  hostId: string
}

const CreateEventModal = ({ clubId, hostId }: Props) => {
  const router = useRouter()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCreateEvent = async (values: {
    name: string
    date: string
    description: string
    location: string
  }) => {
    try {
      console.log('before')
      const result = await axios.post<{ success: boolean; message: string }>(
        `/api/clubs/${clubId}/events`,
        { hostId, values },
      ) // Replace with actual API call to create event
      console.log(result)
      const data = result.data
      if (data.success) {
        toast({
          title: 'Event Created',
          description: 'Your event has been successfully created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        onClose() // Close the modal after success
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to create event',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred when creating event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button leftIcon={<MdAdd />} colorScheme='green' onClick={onOpen}>
        Create Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: '',
                date: new Date().toISOString().slice(0, 16),
                description: '',
                location: '',
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Event name is required'),
                date: Yup.date().required('Event date is required'),
                description: Yup.string(),
                location: Yup.string().min(4),
              })}
              onSubmit={handleCreateEvent}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input
                    label='Event Name'
                    placeholder='Enter event name'
                    name='name'
                    required
                  />
                  <Input
                    type='datetime-local'
                    label='Event Date'
                    name='date'
                    required
                  />
                  <Input
                    label='Description'
                    placeholder='Enter description (optional)'
                    name='description'
                    type='textarea'
                  />
                  <Input
                    label='Location'
                    placeholder='Enter the location of the event'
                    name='location'
                    required
                  />
                  <Button
                    type='submit'
                    colorScheme='green'
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Create Event
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

export default CreateEventModal
