import { colors } from '@/styles/theme'
import { Flex, Text, Heading, Spacer, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { MdTapas } from 'react-icons/md'
import AuthButton from '../common/AuthButton'
import { auth } from '@/auth'

const Navbar = () => {
  const session = auth()

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
        <AuthButton session={!!session} />
        <Link href='/clubs' passHref replace={false}>
          <Button
            alignItems='center'
            mx={4}
            bg={colors.brandRed}
            textColor={colors.brandWhite}
            _hover={{ bg: colors.brandRedDark }}
          >
            <MdTapas style={{ marginRight: '5px' }} />
            <Text>Clubs</Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
