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
import { useRouter } from 'next/navigation'

const RateWineModal = ({
  userEmail,
  tastingId,
}: {
  userEmail: string
  tastingId: string
}) => {
  const toast = useToast()
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Rate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rate wine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                rating: '',
              }}
              validationSchema={Yup.object({
                rating: Yup.number()
                  .min(0, 'Minimum is 0')
                  .max(5, 'Maximum is 5')
                  .required('Rating is required'),
              })}
              onSubmit={async (values) => {
                try {
                  const result = await axios.post(
                    `/api/tastings/${tastingId}/ratings`,
                    {
                      userEmail: userEmail,
                      rating: values.rating,
                    },
                  )

                  const data = result.data

                  if (data.success) {
                    toast({
                      title: 'Tasting rated',
                      description: `Rating added`,
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    })
                    router.refresh()
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
                    label='rating'
                    placeholder='Enter your rating'
                    name='rating'
                    required
                  />
                  <Button
                    type='submit'
                    colorScheme='green'
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Rate
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

export default RateWineModal
