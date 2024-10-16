'use client'

import { Button } from '@chakra-ui/react'
import axios from 'axios'

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
  const toggleSignUp = async () => {
    const result = await axios.patch(`/clubs/${clubId}/events/${eventId}`, {
      userEmail: userEmail,
    })

    console.log(result)
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
