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
import Link from 'next/link'
import { FC } from 'react'
import { colors } from '@/styles/theme'

interface Member {
  id: string
  name: string
  avatar: string
}

interface WineClub {
  id: string
  name: string
  description: string
  image: string
  clubOwnerId: string
  createdAt: Date
  members: Member[] // Add the members property here
}

interface ClubsGridProps {
  clubs: WineClub[]
}

const ClubsGrid: FC<ClubsGridProps> = ({ clubs }) => {
  return (
    <SimpleGrid columns={[1]} spacing={8}>
      {clubs.map((club) => (
        <Link key={club.id} href={`/clubs/${club.id}`}>
          <Box
            borderRadius='lg'
            overflow='hidden'
            boxShadow='lg'
            _hover={{ boxShadow: 'xl' }}
            bg={colors.brandRed}
          >
            <Image
              src={club.image}
              alt={club.name}
              height='200px'
              objectFit='cover'
              width='100%'
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
        </Link>
      ))}
    </SimpleGrid>
  )
}

export default ClubsGrid
