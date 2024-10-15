'use client'

import React, { FC } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Text } from '@chakra-ui/react'
import Input from '@/components/formik/FormikInput'
import Button from '@/components/formik/FormikButton'
import BackLink from '@/components/common/BackLink'
import { ClubCreateFormInput } from '@/lib/definitions'
import { createClub } from './actions'

const CreateClubPage: FC = () => {
  const [code, action] = useFormState(createClub, undefined)

  return (
    <>
      <BackLink />
      <Text fontSize='2em' mb={4}>
        Create a WineClub
      </Text>
      {code && (
        <>
          <MdOutlineWarning style={{ display: 'inline-block' }} />
          <Text
            display='inline'
            ml={1}
            verticalAlign={'text-bottom'}
            color='red'
          >
            Invalid credentials
          </Text>
        </>
      )}
      <Formik
        initialValues={{
          name: '',
          description: '',
          imageurl: '',
          email: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          imageurl: Yup.string().required('Required'),
        })}
        onSubmit={async (values: ClubCreateFormInput) => {
          return action(values)
        }}
      >
        <Form>
          <Input
            label='name'
            placeholder='Name of your club'
            name='name'
            required
          />
          <Input
            label='description'
            placeholder='Description of your club'
            name='description'
            required
          />
          <Input
            label='imageurl'
            placeholder='Image url of your club'
            name='imageurl'
            required
          />
          <Button>Create</Button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateClubPage
