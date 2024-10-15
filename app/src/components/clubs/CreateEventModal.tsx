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

type Props = {
  clubId: string
  hostId: string
}

const CreateEventModal = ({ clubId, hostId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleCreateEvent = async (values: {
    eventName: string
    eventDate: string
    description: string
  }) => {
    try {
      const result = await axios.post<{ success: boolean; message: string }>(
        `/api/clubs/${clubId}/events`,
        { hostId, values },
      ) // Replace with actual API call to create event
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
                eventName: '',
                eventDate: '',
                description: '',
                location: '',
              }}
              validationSchema={Yup.object({
                eventName: Yup.string().required('Event name is required'),
                eventDate: Yup.date().required('Event date is required'),
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
                    name='eventName'
                    required
                  />
                  <Input
                    type='date'
                    label='Event Date'
                    name='eventDate'
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
