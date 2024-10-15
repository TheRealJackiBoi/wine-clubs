'use client'

import React, { FC } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Text, useToast } from '@chakra-ui/react'
import Input from '@/components/formik/FormikInput'
import Button from '@/components/formik/FormikButton'
import BackLink from '@/components/common/BackLink'
import { ClubCreateFormInput } from '@/lib/definitions'
import { createClub } from './actions'
import { useRouter } from 'next/navigation'

const CreateClubPage: FC = () => {
  const router = useRouter()
  const [code, action] = useFormState(createClub, undefined)
  const toast = useToast()

  if (code === 'success') {
    toast({
      title: 'Club created',
      description: 'Club created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    router.push('/clubs')
  }

  if (code !== 'success') {
    if (!toast.isActive('error')) {
      toast({
        id: 'error',
        title: 'Error',
        description: code,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <BackLink />
      <Text fontSize='2em' mb={4}>
        Create a WineClub
      </Text>
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
          return await action(values)
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
