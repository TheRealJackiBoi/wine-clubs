import React, { FC } from 'react'
import {
  Box,
  Flex,
  Divider,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { Metadata } from 'next'
import Link from 'next/link'
import { MdLogin, MdLockPerson } from 'react-icons/md'
import ClubCard from '@/components/common/club/ClubCard'
import { colors } from '@/styles/theme'

const brandRed = '#4c1c24'
const brandGray = '#1a1a1a'
const brandWhite = '#E0E0E0'

export const metadata: Metadata = {
  title: 'WineClubs',
}

const HomePage: FC = () => {
  return (
    <Box>
      {/* Navigation Bar */}
      <Flex
        bg={brandGray}
        color={brandWhite}
        p={4}
        alignItems='center'
        boxShadow='md'
      >
        <Heading as='h1' fontSize='xl'>
          WineClubs
        </Heading>
        <Spacer />
        <Flex alignItems='center'>
          <Link href='/login' passHref>
            <Flex
              alignItems='center'
              mx={4}
              _hover={{ textDecoration: 'underline' }}
            >
              <MdLogin style={{ marginRight: '5px' }} />
              <Text>Login</Text>
            </Flex>
          </Link>
          <Link href='/protected-page' passHref>
            <Flex
              alignItems='center'
              mx={4}
              _hover={{ textDecoration: 'underline' }}
            >
              <MdLockPerson style={{ marginRight: '5px' }} />
              <Text>Protected Page</Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Divider />

      {/* Hero Section */}
      <Box
        bg={brandGray}
        color={brandWhite}
        minH='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        p={6}
      >
        <VStack spacing={8}>
          <Heading as='h1' fontSize='4xl'>
            Welcome to WineClubs
          </Heading>
          <Text fontSize='lg'>
            Discover, create, and join wine tasting events with your friends and
            fellow enthusiasts.
          </Text>
          <Button
            bg={brandRed}
            color={brandWhite}
            _hover={{ bg: colors.brandRedDark }}
            size='lg'
            rounded='full'
          >
            Explore Events
          </Button>
        </VStack>
      </Box>

      {/* Featured Section */}
      <Box bg={brandGray} p={8}>
        <Heading as='h2' textAlign='center' color={brandWhite} mb={6}>
          Featured Clubs
        </Heading>
        <HStack spacing={6} justify='center' wrap='wrap'>
          <ClubCard
            imageSrc='/images/winePlaceholder.png'
            altText='Club 1'
            heading='Wine Lovers Club'
            description='Join this club for weekly wine tastings and social gatherings.'
          />
          <ClubCard
            imageSrc='/images/winePlaceholder.png'
            altText='Club 2'
            heading='Vintage Wine Club'
            description='Explore the world of vintage wines with this exclusive club.'
          />
        </HStack>
      </Box>

      {/* Call-to-Action Section */}
      <Box bg={brandRed} color={brandWhite} py={12} textAlign='center'>
        <Heading as='h2' mb={4}>
          Ready to Join the Fun?
        </Heading>
        <Text fontSize='lg' mb={6}>
          Create your own wine tasting event or browse exciting clubs today.
        </Text>
        <Button size='lg' bg={brandWhite} color={brandRed} rounded='full'>
          Get Started
        </Button>
      </Box>

      {/* Footer */}
      <Box bg={brandGray} color={brandWhite} py={8} textAlign='center'>
        <Text>
          &copy; {new Date().getFullYear()} WineClubs. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default HomePage
