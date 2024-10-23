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
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .required('Required')
            .min(8, 'at least 8 characters long')
            .matches(/[A-Z]/, 'at least one uppercase letter')
            .matches(/[a-z]/, 'at least one uppercase letter')
            .matches(/[0-9]/, 'at least one number'),
        })}
        onSubmit={async (values: Credentials) => action(values)}
      >
        <>
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
            <Button>Sign Up</Button>
          </Form>
          <Text mt={4}>
            Already have an account?{' '}
            <Link as={NextLink} href='/login' color='blue.500'>
              Login
            </Link>
          </Text>
        </>
      </Formik>
    </>
  )
}

export default SignupPage
