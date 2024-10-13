import { FC } from 'react'
import { Metadata, NextPage } from 'next'
import { Heading } from '@chakra-ui/react'
import BackLink from '@/components/common/BackLink'

export const metadata: Metadata = {
  title: 'Page not found',
}

const PageNotFound: FC<NextPage> = () => (
  <>
    <BackLink />
    <Heading>Page not found</Heading>
  </>
)

export default PageNotFound
