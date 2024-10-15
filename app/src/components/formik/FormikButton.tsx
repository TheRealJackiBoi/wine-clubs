import React, { FC } from 'react'
import { useFormikContext } from 'formik'
import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  type?: 'submit' | 'button'
}

const FormikButton: FC<Props> = ({ children, type = 'submit' }) => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button
      colorScheme='blue'
      variant='solid'
      type={type}
      isLoading={isSubmitting}
    >
      {children}
    </Button>
  )
}

export default FormikButton
