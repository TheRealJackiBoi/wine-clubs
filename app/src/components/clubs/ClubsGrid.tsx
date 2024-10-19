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
import { WineClub } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { colors } from '@/styles/theme'

interface ClubsGridProps {
  clubs: WineClub[]
}

const ClubsGrid: FC<ClubsGridProps> = ({ clubs }) => {
  return (
    <Box
      maxWidth='1200px'
      margin='auto'
      padding={8}
      bg={colors.brandGray}
      color={colors.brandWhite}
    >
      <Heading as='h1' size='2xl' mb={8} textAlign='center'>
        Wine Clubs
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {clubs.map((club) => (
          <Link key={club.id} href={`/clubs/${club.id}`}>
            <Box
              borderWidth='1px'
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
    </Box>
  )
}

export default ClubsGrid
