'use client'

import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  VStack,
  HStack,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react'
import { MdPeople } from 'react-icons/md'
import prisma from '@/lib/prisma'
import { WineClub } from '@prisma/client'
import { notFound } from 'next/navigation'

const ClubsPage: FC = async () => {
  const clubs: WineClub[] = await prisma.wineClub.findMany({
    include: {
      members: true,
      clubOwner: true,
    },
  })

  if (!clubs) notFound()

  return (
    <Box maxWidth='1200px' margin='auto' padding={8}>
      <Heading as='h1' size='2xl' mb={8}>
        Wine Clubs
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {clubs.map((club) => (
          <Box
            key={club.id}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            boxShadow='lg'
            _hover={{ boxShadow: 'xl' }}
          >
            <Image
              src={club.image}
              alt={club.name}
              height='200px'
              objectFit='cover'
            />
            <VStack align='stretch' padding={4}>
              <Heading as='h2' size='lg'>
                {club.name}
              </Heading>
              <Text>{club.description}</Text>
              <HStack justify='space-between' mt={4}>
                <HStack>
                  <MdPeople />
                  <Text>{club.members.length} Members</Text>
                </HStack>
                <AvatarGroup size='sm' max={3}>
                  {club.members.map((member) => (
                    <Avatar
                      key={member.id}
                      name={member.name}
                      src={member.avatar}
                    />
                  ))}
                </AvatarGroup>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ClubsPage
