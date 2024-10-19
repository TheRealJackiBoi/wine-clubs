// app/clubs/page.tsx
import { getAllClubs } from '@/lib/actions'
import { WineClub } from '@prisma/client'
import ClubsGrid from '../../components/clubs/ClubsGrid'
import Navbar from '@/components/navbar/Navbar'
import { Box, Text, Heading, Button, VStack, HStack } from '@chakra-ui/react'
import { colors } from '@/styles/theme'
import ClubCard from '@/components/clubs/ClubCard'

// This is a Server Component by default in the app directory
const ClubsPage = async () => {
  const clubs: WineClub[] = await getAllClubs()

  return (
    <Box>
      <Navbar />
      <ClubsGrid clubs={clubs} />
      <Box
        bg={colors.brandGray}
        color={colors.brandWhite}
        minH='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        p={6}
      ></Box>

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

export default ClubsPage
