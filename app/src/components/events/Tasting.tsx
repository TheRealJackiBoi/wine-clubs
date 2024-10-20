'use client'

import { Button, Card, CardBody, HStack, Spacer, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { MdStar } from 'react-icons/md'

const Tasting = ({
  tasting,
}: {
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
      wineId: string
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

  return (
    <Card w='100%'>
      <CardBody>
        <HStack>
          <Text>
            {tasting.wine.name} -
            {DateTime.fromJSDate(tasting.wine.year).get('year')}
          </Text>
          <Spacer />
          <HStack>
            <MdStar />
            <Text>{averageRating}</Text>
          </HStack>
          {/* TODO: Create rating button */}
          <Button>Rate</Button>
        </HStack>
      </CardBody>
    </Card>
  )
}
export default Tasting
