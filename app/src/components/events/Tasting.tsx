'use client'

import { Button, Card, CardBody, HStack, Text } from '@chakra-ui/react'
import { Tasting } from '@prisma/client'
import { DateTime } from 'luxon'

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
  } & {
    id: string
    wineId: string
    eventId: string
  }
}) => {
  return (
    <Card>
      <CardBody>
        <HStack>
          <Text>
            {tasting.wine.name} -
            {DateTime.fromJSDate(tasting.wine.year).get('year')}
          </Text>
          {/* TODO: Create rating button */}
          <Button>Rate</Button>
        </HStack>
      </CardBody>
    </Card>
  )
}
export default Tasting
