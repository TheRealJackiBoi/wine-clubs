'use server'

import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Divider,
  AvatarGroup,
  Avatar,
  Flex,
} from '@chakra-ui/react'
import { MdInfo } from 'react-icons/md'
import prisma from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Event } from '@prisma/client'
import { DateTime } from 'luxon'
import LeaveClubModal from '@/components/clubs/LeaveClubModal'
import CreateEventModal from '@/components/clubs/CreateEventModal'
import EventCard from '@/components/events/EventCard'

type Params = {
  params: {
    id: string
  }
}

export default async function ClubPage({ params }: Params) {
  const id = params.id

  const club = await prisma.wineClub.findUnique({
    where: { id: id },
    include: {
      members: true,
      events: {
        include: {
          host: true,
        },
      },
    },
  })

  if (!club) notFound()

  const session = await auth()
  if (!session || !session.user || !session.user.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      ownedWineClubs: true,
      wineClubs: true,
    },
  })

  const isOwner = user!.ownedWineClubs.find((club) => club.id === id)
  const isMember = user!.wineClubs.find((club) => club.id === id)
  const now = DateTime.now().startOf('day')

  const findFutureEvents = (event: Event) =>
    DateTime.fromJSDate(event.date).startOf('day') > now

  const findPastEvents = (event: Event) =>
    DateTime.fromJSDate(event.date).startOf('day') < now

  return (
    <Box maxWidth='1200px' margin='auto' padding={8}>
      <Flex
        direction={{ base: 'column', sm: 'column', md: 'row' }} // Start wrapping earlier at 'sm'
        gap={8} // Use 'gap' instead of 'spacing' for Flex
        alignItems='flex-start'
        wrap='wrap' // Allows wrapping when space is constrained
      >
        <Image
          src={club.image}
          alt={club.name}
          borderRadius='md'
          boxSize={{ base: '100%', md: 'auto' }} // Full width on smaller screens, auto size on larger
          mb={{ base: 4, md: 0 }} // Adds margin-bottom on smaller screens
          mx='auto'
        />

        <VStack align='stretch' flex={1} width='100%'>
          <Heading as='h1' size='2xl'>
            {club.name}
          </Heading>
          <Text fontSize='lg' mb={2}>
            {club.description}
          </Text>
          {(isOwner || isMember) && (
            <CreateEventModal clubId={club.id} hostId={user!.id} />
          )}
          {isMember && !isOwner && (
            <LeaveClubModal userId={user!.id} clubId={id} />
          )}

          <Heading as='h2' size='xl' mb={4} mt={8}>
            Members
          </Heading>
          <HStack justify='space-between' mb={4}>
            <AvatarGroup size='md' max={5}>
              {club.members.map((member) => (
                <Avatar
                  key={member.id}
                  name={member.name}
                  src={member.avatar}
                />
              ))}
            </AvatarGroup>
            {isOwner && (
              <Button
                leftIcon={<MdInfo />}
                colorScheme='blue'
                // onClick={handleAddMember}
              >
                Add Member
              </Button>
            )}
          </HStack>
        </VStack>
      </Flex>

      <Divider my={8} />

      <Heading as='h2' size='xl' mb={4}>
        Upcoming Events
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {club.events.filter(findFutureEvents).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            host={event.host}
            clubId={club.id}
          />
        ))}
      </SimpleGrid>

      <Divider my={8} />

      <Heading as='h2' size='xl' mb={4}>
        Past Events
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {club.events.filter(findPastEvents).map((event) => (
          <EventCard
            key={id}
            event={event}
            host={event.host}
            clubId={club.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
