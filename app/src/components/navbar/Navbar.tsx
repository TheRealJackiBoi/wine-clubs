import { colors } from '@/styles/theme'
import { Flex, Text, Heading, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { MdAccountCircle, MdExitToApp, MdTapas } from 'react-icons/md'

const Navbar = () => {
  // const router = useRouter()

  // const handleLogout = async () => {
  //   await signOut()
  //   router.push('/')
  // }
  const session = true

  return (
    <Flex
      bg={colors.brandGray}
      color={colors.brandWhite}
      p={4}
      alignItems='center'
      boxShadow='md'
    >
      <Heading as='h1' fontSize='xl'>
        WineClubs
      </Heading>
      <Spacer />
      <Flex alignItems='center'>
        {session ? (
          <Flex
            as='button'
            alignItems='center'
            mx={4}
            _hover={{ textDecoration: 'underline' }}
          >
            <MdExitToApp style={{ marginRight: '5px' }} />
            <Text>Log out</Text>
          </Flex>
        ) : (
          <Link href='/login' passHref>
            <Flex
              alignItems='center'
              mx={4}
              _hover={{ textDecoration: 'underline' }}
            >
              <MdAccountCircle style={{ marginRight: '5px' }} />
              <Text>Login</Text>
            </Flex>
          </Link>
        )}
        <Link href='/clubs' passHref>
          <Flex
            alignItems='center'
            mx={4}
            _hover={{ textDecoration: 'underline' }}
          >
            <MdTapas style={{ marginRight: '5px' }} />
            <Text>Clubs</Text>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
