import { colors } from '@/styles/theme'
import {
  Flex,
  Text,
  Spacer,
  Button,
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import Link from 'next/link'
import { MdLogout, MdPerson, MdSettings, MdTapas } from 'react-icons/md'
import { auth, signOut } from '@/auth'
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
      <Text
        fontSize='xl'
        fontWeight='bold'
        display={{ base: 'none', md: 'block' }}
      >
        WineClubs
      </Text>
      <Spacer />
      <Flex alignItems='center'>
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
        <Menu>
          <MenuButton>
            <Avatar
              name={user?.email}
              src={user?.avatar}
              mr='2rem'
              _hover={{ outline: `${colors.brandRed} 2px solid` }}
              cursor='pointer'
            />
          </MenuButton>
          <MenuList bg={colors.brandRed} color={colors.brandWhite}>
            <Link href={`/profile/${user?.id}`} passHref>
              <MenuItem
                icon={<MdPerson />}
                bg={colors.brandRed}
                _hover={{ bg: colors.brandRedDark }}
              >
                Profile
              </MenuItem>
            </Link>
            <Link href='/settings' passHref>
              <MenuItem
                icon={<MdSettings />}
                bg={colors.brandRed}
                _hover={{ bg: colors.brandRedDark }}
              >
                Settings
              </MenuItem>
            </Link>
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <MenuItem
                bg={colors.brandRed}
                _hover={{ bg: colors.brandRedDark }}
                icon={<MdLogout />}
                type='submit'
              >
                Log out
              </MenuItem>
            </form>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navbar
