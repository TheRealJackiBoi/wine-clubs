'use client'

import React, { FC } from 'react'
import { useFormState } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Text } from '@chakra-ui/react'
import Input from '@/components/todo-list/formik/FormikInput'
import Button from '@/components/todo-list/formik/FormikButton'
import { authenticate } from '@/lib/actions'
import { Credentials } from '@/lib/definitions'
import BackLink from '@/components/common/BackLink'

const LoginPage: FC = () => {
  const [code, action] = useFormState(authenticate, undefined)

  return (
    <>
      <BackLink />
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
          email: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={async (values: Credentials) => action(values)}
      >
        <Form>
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
          <Button>Login</Button>
        </Form>
      </Formik>
    </>
  )
}

export default LoginPage
