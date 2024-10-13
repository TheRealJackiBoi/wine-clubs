describe('template spec', () => {
  it('creates a todo', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Create with Formik').click()
    cy.get('[name="text"]').type('Thing to do')
    cy.get('[name="type"]').select('work')
    cy.get('[name="description"]').type('This is very important to remember!')
    cy.contains('Create TODO item').click()

    cy.url().should('include', '/todo/')
    cy.contains('Thing to do')
    cy.contains('This is very important to remember!')
  })

  it('cannot access protected pages', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Protected Page').click()

    cy.url().should('include', '/login')
  })
})
