import React, { FC } from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react'

export type BaseElementProps = {
  name: string
  label?: string
  description?: string
  helpText?: string
  required?: boolean
}

type Props = {
  children: React.ReactNode
  renderLabel?: boolean
}

const BaseElement: FC<BaseElementProps & Props> = ({
  children,
  renderLabel = true,
  ...props
}) => {
  const [_field, meta] = useField(props)
  const hasError = meta.touched && meta.error

  return (
    <FormControl isRequired={props.required} isInvalid={!!hasError} my={10}>
      {props.label && renderLabel && (
        <FormLabel mb={3} htmlFor={props.label}>
          <b>{props.label}</b>
        </FormLabel>
      )}
      {props.description && <Text mb={6}>{props.description}</Text>}
      {children}
      {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
      {hasError && (
        <FormErrorMessage
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export default BaseElement
