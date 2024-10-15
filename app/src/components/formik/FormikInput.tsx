import React, { FC, HTMLInputTypeAttribute } from 'react'
import { useField } from 'formik'
import { Input } from '@chakra-ui/react'
import FormElement from './FormElement'
import { BaseElementProps } from './FormElement'

type Props = {
  name: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

const FormikInput: FC<BaseElementProps & Props> = ({
  type = 'text',
  ...props
}) => {
  const [field] = useField(props)

  return (
    <FormElement {...props}>
      <Input type={type} {...field} {...props} />
    </FormElement>
  )
}

export default FormikInput
