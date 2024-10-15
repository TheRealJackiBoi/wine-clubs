import React, { FC } from 'react'
import { useField } from 'formik'
import { Select } from '@chakra-ui/react'
import FormElement from './FormElement'
import { BaseElementProps } from './FormElement'

type Props = {
  children: React.ReactNode
  name: string
}

const FormikSelect: FC<BaseElementProps & Props> = ({ children, ...props }) => {
  const [field] = useField(props)

  return (
    <FormElement {...props}>
      <Select {...field} {...props}>
        {children}
      </Select>
    </FormElement>
  )
}

export default FormikSelect
