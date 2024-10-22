import React, { FC } from 'react'
import {
  Box,
  Divider,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { Metadata } from 'next'
import ClubCard from '@/components/clubs/ClubCard'
import { colors } from '@/styles/theme'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'WineClubs',
}

const HomePage: FC = async () => {
  return (
    <Box>
      <Divider />
      <Box
        bg={colors.brandGray}
        color={colors.brandWhite}
        minH='100vh'
        maxW='1200px'
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
          <Link href='/clubs' passHref>
            <Button
              bg={colors.brandRed}
              color={colors.brandWhite}
              _hover={{ bg: colors.brandRedDark }}
              size='lg'
              rounded='full'
            >
              Explore Events
            </Button>
          </Link>
        </VStack>
      </Box>
      {/* Featured Section */}
      <Box bg={colors.brandGray} p={8}>
        <Heading as='h2' textAlign='center' color={colors.brandWhite} mb={6}>
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
      <Box
        bg={colors.brandRed}
        color={colors.brandWhite}
        py={12}
        textAlign='center'
      >
        <Heading as='h2' mb={4}>
          Ready to Join the Fun?
        </Heading>
        <Text fontSize='lg' mb={6}>
          Create your own wine tasting event or browse exciting clubs today.
        </Text>
        <Button
          size='lg'
          bg={colors.brandWhite}
          color={colors.brandRed}
          rounded='full'
        >
          Get Started
        </Button>
      </Box>
      {/* Footer */}
      <Box
        bg={colors.brandGray}
        color={colors.brandWhite}
        py={8}
        textAlign='center'
      >
        <Text>
          &copy; {new Date().getFullYear()} WineClubs. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default HomePage
