describe('Navigation', ()=>{

  it('should navigate back and forth', ()=>{

      //signin
      cy.visit('http://localhost:4200/signin')
      cy.get('[data-cy="email"]').type('michealvenum007@gmail.com')
      cy.get('[data-cy="password"]').type('Mike1234567')
      cy.get('[data-cy="login-btn"]').click()

      cy.get('[data-cy="add-btn"]').click()

      //add product
      cy.get('[data-cy="product-name"]').type('Product Name')
      cy.get('[data-cy="product-price"]').type('100')
      cy.get('[data-cy="product-quantity"]').type('10')
      cy.get('[data-cy="product-description"]').type('Product Description')
      cy.get('#productCategory').select('Bikes');
      cy.get('[data-cy="product-image"]').type('Product Image')
      cy.get('[data-cy="supplier-contact"]').type('0703142478')


      cy.get('[data-cy="add-product-btn"]').click()
      cy.visit('http://localhost:4200/signin')
      cy.location('pathname').should('eq', '/signin')
      cy.go('back')



      // cy.visit('http://localhost:4200/landing')

      //     gamesmy177@gmail.com


  })
})
