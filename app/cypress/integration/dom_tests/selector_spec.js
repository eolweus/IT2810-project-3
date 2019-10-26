describe('Test selector', () => {
    it('Page has selection', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.MuiTableBody-root').children().should('have.length', 5)
    })

    it('Is selector clickable', () => {
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(10).click()
    })

    it('Selector updates selection', () => {
        cy.get('.MuiTableBody-root').children().should('have.length', 7)
    })
})
