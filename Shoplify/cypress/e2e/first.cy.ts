describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/landing')
    cy.visit('http://localhost:4200/signup')
    cy.visit('http://localhost:4200/signin')
    cy.visit('http://localhost:4200/landing')
  })
})