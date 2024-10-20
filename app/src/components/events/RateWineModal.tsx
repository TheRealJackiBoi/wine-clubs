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
import Input from '@/components/formik/FormikInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const CreateNewWine = ({
  refetchTastings,
}: {
  refetchTastings: () => void
}) => {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Rate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Wine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: '',
                year: new Date().getFullYear(),
                image: '',
              }}
              validationSchema={Yup.object({
                rating: Yup.number()
                  .min(0, 'Minimum is 0')
                  .max(5, 'Maximum is 5')
                  .required('Rating is required'),
              })}
              onSubmit={async (values) => {
                try {
                  const result = await axios.post('/api/wines', { values })

                  const data = result.data

                  if (data.success) {
                    toast({
                      title: 'Wine Created',
                      description: `${values.name} created`,
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    })

                    refetchTastings()
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
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input
                    label='Name'
                    placeholder='Enter wine name'
                    name='name'
                    required
                  />
                  <Input
                    label='Year'
                    placeholder='Enter the year of the wine'
                    name='year'
                    type='number'
                    required
                  />
                  <Input
                    label='Image url'
                    placeholder='Enter the url for the wine image'
                    name='image'
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

export default CreateNewWine
