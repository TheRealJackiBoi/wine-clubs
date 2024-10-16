import React from 'react'
import FormikButton from './FormikButton'
import { Form, Formik } from 'formik'

describe('<FormikButton />', () => {
  it('showing spinner on submit', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <FormikButton>Button Text</FormikButton>
        </Form>
      </Formik>,
    )

    cy.get('.chakra-button__spinner').should('not.exist')
    cy.contains('Button Text').click()
    cy.get('.chakra-button__spinner').should('exist')
  })
})
