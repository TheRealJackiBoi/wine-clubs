import { colors } from '@/styles/theme'
import { Flex, Text, Spacer, Button, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { MdTapas } from 'react-icons/md'
import AuthButton from '../common/AuthButton'
import { auth } from '@/auth'

const Navbar = async () => {
  const session = await auth()
  const isUserLoggedIn = !!session?.user

  return (
    <Flex
      bg={colors.brandGray}
      color={colors.brandWhite}
      p={4}
      alignItems='center'
      boxShadow='md'
    >
      <Link href={'/'} passHref>
        <Image
          src='/images/WineClubsLogoGrayBG.png'
          alt='WineClubs Logo'
          boxSize='100px'
          marginLeft='2rem'
        />
      </Link>
      <Spacer />
      <Flex alignItems='center'>
        <AuthButton isUserLoggedIn={isUserLoggedIn} />
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
