'use server'

import {
  Box,
  Heading,
  Text,
  AvatarGroup,
  Avatar,
  Divider,
  VStack,
  HStack,
} from '@chakra-ui/react'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { DateTime } from 'luxon'
import { notFound, redirect } from 'next/navigation'
import SignUpToggle from '@/components/events/SignUpToggle'
import AddWineModal from '@/components/events/addWineModal/AddWineModal'

type Params = {
  params: {
    eventId: string
  }
}

export default async function EventPage({ params }: Params) {
  const id = params.eventId

  const event = await prisma.event.findUnique({
    where: { id: id },
    include: {
      host: true,
      tastings: true,
      wineClub: true,
      signUps: true,
    },
  })

  if (!event) notFound()

  const session = await auth()
  if (!session || !session.user || !session.user.email) {
    redirect('/login')
  }

  const isSignedUp = event.signUps.some(
    (member) => member.email === session.user!.email,
  )

  const wines = await prisma.wine.findMany()

  return (
    <Box maxWidth='1200px' margin='auto' padding={8}>
      <Heading as='h1' size='2xl' mb={4}>
        {event.wineClub.name} Event
      </Heading>
      <Text fontSize='lg' mb={2}>
        {event.description}
      </Text>
      <Text>Date: {DateTime.fromJSDate(event.date).toLocaleString()}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Host: {event.host.name}</Text>

      <Divider my={8} />

      <Heading as='h2' size='xl' mb={4}>
        Members Signed Up
      </Heading>
      <AvatarGroup size='md' max={5}>
        {event.signUps.map((member) => (
          <Avatar key={member.id} name={member.name} src={member.avatar} />
        ))}
      </AvatarGroup>

      <Divider my={8} />
      <SignUpToggle
        isSignedUp={isSignedUp}
        clubId={event.wineClubId}
        eventId={event.id}
        userEmail={session.user.email}
      />

      <Box>
        <VStack>
          <HStack>
            <Text as='h2'>Tastings</Text>
            <AddWineModal
              clubId={event.wineClub.id}
              eventId={event.id}
              userEmail={session.user.email}
              wines={wines}
            />
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
