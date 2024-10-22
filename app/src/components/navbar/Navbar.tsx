import { colors } from '@/styles/theme'
import { Flex, Text, Spacer, Button, Image, Avatar } from '@chakra-ui/react'
import Link from 'next/link'
import { MdTapas } from 'react-icons/md'
import AuthButton from '../common/AuthButton'
import { auth } from '@/auth'
import { getUser } from '@/lib/actions'

const Navbar = async () => {
  const session = await auth()
  const isUserLoggedIn = !!session?.user
  if (!isUserLoggedIn) return null
  const user = await getUser(session!.user!.email!)

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
          boxSize='50px'
          ml='2rem'
          mr='1rem'
        />
      </Link>
      <Text fontSize='xl' fontWeight='bold'>
        WineClubs
      </Text>
      <Spacer />
      <Flex alignItems='center'>
        <AuthButton isUserLoggedIn={isUserLoggedIn} />
        <Link href='/clubs' passHref replace={false}>
          <Button
            alignItems='center'
            mr={5}
            bg={colors.brandRed}
            textColor={colors.brandWhite}
            _hover={{ bg: colors.brandRedDark }}
          >
            <MdTapas style={{ marginRight: '5px' }} />
            <Text>Clubs</Text>
          </Button>
        </Link>
        <Link href={`/profile/${user?.id}`} passHref>
          <Avatar
            name={user?.email}
            src={user?.avatar}
            style={{ marginRight: '5px' }}
          />
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
