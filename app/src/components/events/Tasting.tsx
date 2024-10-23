'use client'

import { Card, CardBody, HStack, Spacer, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { MdStar } from 'react-icons/md'
import RateWineModal from './RateWineModal'
import { Role } from '@prisma/client'

const Tasting = ({
  tasting,
  userEmail,
  isSignedUp,
  isHost,
  isEventToday,
}: {
  userEmail: string
  isSignedUp: boolean
  isHost: boolean
  isEventToday: boolean
  tasting: {
    wine: {
      id: string
      name: string
      image: string
      createdAt: Date
      year: Date
    }
    ratings: {
      id: number
      user: {
        id: string
        name: string
        email: string
        password: string
        role: Role
        avatar: string
      }

      userId: string
      rating: number
      createdAt: Date
      tastingId: string
    }[]
  } & {
    id: string
    wineId: string
    eventId: string
  }
}) => {
  const averageRating = tasting.ratings.length
    ? tasting.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
      tasting.ratings.length
    : 0

  const isRated = !!tasting.ratings.find(
    (rating) => rating.user.email === userEmail,
  )

  return (
    <Card w='100%'>
      <CardBody>
        <HStack>
          <Text>
            {tasting.wine.name} -{' '}
            {DateTime.fromJSDate(tasting.wine.year).get('year')}
          </Text>
          <Spacer />
          <HStack>
            <MdStar />
            <Text>{averageRating}</Text>
          </HStack>
          {(isSignedUp || isHost) &&
            isEventToday &&
            (isRated || (
              <RateWineModal tastingId={tasting.id} userEmail={userEmail} />
            ))}
        </HStack>
      </CardBody>
    </Card>
  )
}
export default Tasting
