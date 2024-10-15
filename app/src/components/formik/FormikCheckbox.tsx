import React, { FC } from 'react'
import { useField } from 'formik'
import { FormLabel, Checkbox, Box } from '@chakra-ui/react'
import FormElement from './FormElement'
import { BaseElementProps } from './FormElement'

type Props = {
  label: string
  name: string
}

const FormikCheckbox: FC<BaseElementProps & Props> = ({ ...props }) => {
  const [field] = useField(props)

  return (
    <FormElement {...props} renderLabel={false}>
      <FormLabel
        mb={3}
        lineHeight='100%'
        fontWeight='normal'
        display='flex'
        alignItems='center'
      >
        <Checkbox {...props} {...field} mr={3} />
        <Box display='inline' cursor='pointer'>
          {props.label}
        </Box>
      </FormLabel>
    </FormElement>
  )
}

export default FormikCheckbox
