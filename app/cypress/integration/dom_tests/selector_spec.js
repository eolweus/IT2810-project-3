describe('Test selector', () => {
    it('Page has selection', () => {

        cy.visit('http://localhost:3000/')

        // 5 is the default number of songs showed at the same time on the page
        // This test selects the table containing the songs in the DOM and verifies
        // That the number of songs (children elements of the table) initially displayed is 5
        cy.get('.MuiTableBody-root').children().should('have.length', 5)
    })

    it('Is selector clickable', () => {

        // Selects the select menu in which a user can change the number of songs
        // displayed at a time and clicks it so the menu becomes visible in the DOM
        cy.get('.MuiSelect-root').click()

        // Selects the now open menu, selects the option "10" and clicks it.
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(10).click()
    })

    it('Selector updates selection', () => {

        // checks if the selection of 10 updated the number of songs displayed in the table
        cy.get('.MuiTableBody-root').children().should('have.length', 7)
    })
})
