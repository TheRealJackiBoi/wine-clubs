'use client'

import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'
import BackLink from '@/components/common/BackLink'

const clubsPage: FC = () => {
  return (
    <>
      <BackLink />
      <Text fontSize='2em' mb={4}>
        Clubs
      </Text>
    </>
  )
}

export default clubsPage
