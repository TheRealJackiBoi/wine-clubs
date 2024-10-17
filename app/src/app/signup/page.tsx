'use client'

import React, { FC } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Text } from '@chakra-ui/react'
import Input from '@/components/formik/FormikInput'
import Button from '@/components/formik/FormikButton'
import { signup } from '@/lib/actions'
import { Credentials } from '@/lib/definitions'

const SignupPage: FC = () => {
  const [code, action] = useFormState(signup, undefined)

  return (
    <>
      <Text fontSize='2em' mb={4}>
        Sign Up
      </Text>
      {code === 'CredentialsSignup' && (
        <>
          <MdOutlineWarning style={{ display: 'inline-block' }} />
          <Text
            display='inline'
            ml={1}
            verticalAlign={'text-bottom'}
            color='red'
          >
            User already exists
          </Text>
        </>
      )}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          avatar: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Required'),
          avatar: Yup.string().url('Invalid URL').optional(), // Validate avatar if provided
        })}
        onSubmit={async (values: Credentials) => action(values)}
      >
        <Form>
          <Input
            label='Name'
            placeholder='Input your name'
            name='name'
            required
          />
          <Input
            label='E-mail'
            placeholder='Input your e-mail'
            name='email'
            required
          />
          <Input
            type='password'
            label='Password'
            placeholder='Input your password'
            name='password'
            required
          />
          <Input
            label='Avatar URL (optional)'
            placeholder='Input your avatar URL'
            name='avatar'
            //optional
          />
          <Button>Sign Up</Button>
        </Form>
      </Formik>
    </>
  )
}

export default SignupPage
