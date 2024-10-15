import React, { FC } from 'react'
import { useField } from 'formik'
import { Textarea } from '@chakra-ui/react'
import FormElement from './FormElement'
import { BaseElementProps } from './FormElement'

type Props = {
  name: string
  placeholder?: string
}

const FormikTextarea: FC<BaseElementProps & Props> = ({ ...props }) => {
  const [field] = useField(props)

  return (
    <FormElement {...props}>
      <Textarea {...field} {...props} />
    </FormElement>
  )
}

export default FormikTextarea
