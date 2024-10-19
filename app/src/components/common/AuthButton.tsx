import { signOut } from '@/auth'
import { Button, Flex, Text } from '@chakra-ui/react'
import { MdAccountCircle } from 'react-icons/md'
import Link from 'next/link'
import { TbLogout2 } from 'react-icons/tb'
import { colors } from '@/styles/theme'

interface AuthButtonProps {
  session: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({ session }) => {
  return session ? (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        bg={colors.brandRed}
        textColor={colors.brandWhite}
        _hover={{ bg: colors.brandRedDark }}
        type='submit'
      >
        <TbLogout2 />
        <Text marginLeft='5px'>Log out</Text>
      </Button>
    </form>
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
