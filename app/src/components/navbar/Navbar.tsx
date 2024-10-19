'use client'
import { colors } from '@/styles/theme'
import { Flex, Text, Heading, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { MdTapas } from 'react-icons/md'
import AuthButton from '../common/AuthButton'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const session = useSession()

  return (
    <Flex
      bg={colors.brandGray}
      color={colors.brandWhite}
      p={4}
      alignItems='center'
      boxShadow='md'
    >
      <Link href={'/'} passHref>
        <Heading as='h1' fontSize='xl'>
          WineClubs
        </Heading>
      </Link>
      <Spacer />
      <Flex alignItems='center'>
        <AuthButton session={session} />
        <Link href='/clubs' passHref replace={false}>
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
