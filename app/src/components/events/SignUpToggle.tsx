'use client'

import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SignUpToggle = ({
  isSignedUp,
  clubId,
  eventId,
  userEmail,
}: {
  isSignedUp: boolean
  clubId: string
  eventId: string
  userEmail: string
}) => {
  const toast = useToast()
  const router = useRouter()

  const toggleSignUp = async () => {
    try {
      const result = await axios.patch(
        `/api/clubs/${clubId}/events/${eventId}/toggle-signup`,
        {
          userEmail: userEmail,
        },
      )

      const data = result.data

      if (data.success) {
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        router.refresh()
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
      {isSignedUp ? (
        <Button colorScheme='red' onClick={toggleSignUp}>
          Unassign
        </Button>
      ) : (
        <Button colorScheme='green' onClick={toggleSignUp}>
          Sign Up
        </Button>
      )}
    </>
  )
}
export default SignUpToggle
