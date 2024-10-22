'use client'

import React, { FC } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Input from '@/components/formik/FormikInput'
import Button from '@/components/formik/FormikButton'
import { authenticate } from '@/lib/actions'
import { Credentials } from '@/lib/definitions'

const LoginPage: FC = () => {
  const [code, action] = useFormState(authenticate, undefined)

  return (
    <>
      <Text fontSize='2em' mb={4}>
        Login
      </Text>
      {code === 'CredentialsSignin' && (
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
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={async (values: Credentials) => action(values)}
      >
        <Form>
          <Input
            label='E-mail'
            placeholder='john@example.com'
            name='email'
            required
          />
          <Input
            type='password'
            label='Password'
            placeholder='Password'
            name='password'
            required
          />
          <Button>Login</Button>
          <Text mt={4}>
            Don’t have an account?{' '}
            <Link as={NextLink} href='/signup' color='blue.500'>
              Sign up
            </Link>
          </Text>
        </Form>
      </Formik>
    </>
  )
}

export default LoginPage
