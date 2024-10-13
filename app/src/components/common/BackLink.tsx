import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { MdArrowBackIos } from 'react-icons/md'

const BackLink: FC = () => {
  return (
    <Link href='/'>
      <MdArrowBackIos style={{ display: 'inline' }} />
      <Text
        display='inline'
        ml={1}
        verticalAlign={'text-bottom'}
        decoration={'underline'}
      >
        Back
      </Text>
    </Link>
  )
}

export default BackLink
