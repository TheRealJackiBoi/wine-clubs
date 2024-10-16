import { FC } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { TodoType } from '../lib/definitions'
import { Todo } from '@prisma/client'
import Input from './FormikInput'
import Button from './FormikButton'
import Select from './FormikSelect'
import Textarea from './FormikTextarea'
import Checkbox from './FormikCheckbox'

interface Props {
  onSave: (x: Partial<Todo>) => void
}

const FormikCreateItemForm: FC<Props> = (p) => {
  return (
    <Formik
      initialValues={{
        text: '',
        type: TodoType.PRIVATE,
        description: '',
        completed: false,
      }}
      validationSchema={Yup.object({
        text: Yup.string().required('Required'),
        description: Yup.string(),
      })}
      onSubmit={p.onSave}
    >
      <Form>
        <Input
          label='Todo'
          placeholder='Write what you need to do'
          name='text'
          required
        />
        <Select name='type' label='Select type of to do' required>
          <option value={TodoType.PRIVATE}>Private</option>
          <option value={TodoType.WORK}>Work Related</option>
        </Select>
        <Textarea
          name='description'
          label='Description'
          placeholder='Write an extended description of how to complete the to do'
        />
        <Checkbox name='completed' label='Completed' />
        <Button>Create TODO item</Button>
      </Form>
    </Formik>
  )
}

export default FormikCreateItemForm
