'use client'

import { signOut } from 'next-auth/react'
import { Flex, Text } from '@chakra-ui/react'
import { MdExitToApp, MdAccountCircle } from 'react-icons/md'
import Link from 'next/link'

interface AuthButtonProps {
  session: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({ session }) => {
  return session ? (
    <Flex
      as='button'
      alignItems='center'
      mx={4}
      _hover={{ textDecoration: 'underline' }}
      onClick={() => signOut({ callbackUrl: '/' })} // Optional: Redirect after sign out
    >
      <MdExitToApp style={{ marginRight: '5px' }} />
      <Text>Log out</Text>
    </Flex>
  ) : (
    <Link href='/login' passHref>
      <Flex alignItems='center' mx={4} _hover={{ textDecoration: 'underline' }}>
        <MdAccountCircle style={{ marginRight: '5px' }} />
        <Text>Login</Text>
      </Flex>
    </Link>
  )
}

export default AuthButton
