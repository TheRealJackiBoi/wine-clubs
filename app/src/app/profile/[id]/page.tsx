import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { colors } from '@/styles/theme'
import { getUserById, getUserClubs, getUserEvents } from '@/lib/actions'
import EventCard from '@/components/events/EventCard'
import ClubsGrid from '@/components/clubs/ClubsGrid'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id)
  const userClubs = await getUserClubs(params.id)
  const userEvents = await getUserEvents(params.id)

  if (!user) {
    return (
      <Box
        bg={colors.brandGray}
        color={colors.brandWhite}
        minH='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        p={6}
      >
        <Heading>User not found</Heading>
      </Box>
    )
  }

  return (
    <Box>
      <Box bg={colors.brandGray} color={colors.brandWhite} minH='100vh' p={6}>
        <VStack spacing={8} align='stretch'>
          <HStack spacing={8}>
            <Avatar size='2xl' name={user.name} src={user.avatar} />
            <VStack align='start' spacing={2}>
              <Heading as='h1' size='2xl'>
                {user.name}
              </Heading>
              <Text fontSize='lg'>{user.email}</Text>
              <Text fontSize='md'>Membership: [ Standard / Premium ]</Text>
            </VStack>
          </HStack>

          <Divider />

          <Box>
            <Heading as='h2' size='xl' mb={4}>
              Clubs
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <ClubsGrid clubs={userClubs} />
            </SimpleGrid>
          </Box>

          <Divider />

          <Box>
            <Heading as='h2' size='xl' mb={4}>
              My Upcoming Events
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {userEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  host={user}
                  clubId={event.wineClub.id}
                />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}

export default ProfilePage
