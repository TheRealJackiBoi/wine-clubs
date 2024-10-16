import { Avatar, Box, HStack, Heading, Text } from '@chakra-ui/react'
import { Event, User } from '@prisma/client'
import { MdCalendarMonth } from 'react-icons/md'

const EventCard = ({
  event,
  host,
  clubId,
}: {
  event: Event
  host: User
  clubId: string
}) => {
  return (
    <Box
      as='a'
      href={`/clubs/${clubId}/events/${event.id}`}
      borderWidth={1}
      borderRadius='md'
      p={4}
    >
      <Heading as='h3' size='md' mb={2}>
        {event.name}
      </Heading>
      <HStack mb={4}>
        <MdCalendarMonth />
        <Text>{new Date(event.date).toLocaleDateString()}</Text>
      </HStack>
      <HStack>
        <Avatar name={host.name} src={host.avatar} w='1.5rem' h='1.5rem' />
        <Text>{host.name}</Text>
      </HStack>
    </Box>
  )
}

export default EventCard
