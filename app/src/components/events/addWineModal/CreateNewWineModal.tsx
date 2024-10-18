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
} from '@chakra-ui/react'
import Input from '@/components/formik/FormikInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const CreateNewWine = ({ refetchWines }: { refetchWines: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        New Wine
      </Button>
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
                name: Yup.string().required('Name is required'),
                year: Yup.string()
                  .max(new Date().getFullYear())
                  .required('Year of the wine is required'),
                image: Yup.string().required('Image is required'),
              })}
              onSubmit={(values) => {
                console.log(values)
                refetchWines()
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
