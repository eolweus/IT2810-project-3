describe('Test selector', () => {
    it('Checks wether the selector works', () => {
        cy.visit('http://localhost:3000/')

        cy.contains('Ja Vi Elsker')
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(10).click()

        cy.get('.MuiSelect-root').should('contain', 10)
    })
})
