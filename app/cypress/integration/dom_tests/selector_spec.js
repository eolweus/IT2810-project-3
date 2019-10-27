/// <reference types="cypress" />

describe('Content exists on page', () => {
    it('Page has selection', () => {
        cy.visit('http://localhost:3000/')

        // 5 is the default number of songs showed at the same time on the page
        // This test selects the table containing the songs in the DOM and verifies
        // That the number of songs (children elements of the table) initially displayed is 5
        cy.get('.MuiTableBody-root').children().should('have.length', 5)
    })

    it('Selector updates selection', () => {

        // Selects the select menu in which a user can change the number of songs
        // displayed at a time and clicks it so the menu becomes visible in the DOM
        cy.get('.MuiSelect-root').click()

        // Selects the now open menu, selects the option "10" and clicks it.
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(10).click()

        // checks if the selection of 10 updated the number of songs displayed in the table
        cy.get('.MuiTableBody-root').children().should('have.length', 10)

        // Reruns the test but with 25
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(25).click()
        cy.get('.MuiTableBody-root').children().should('have.length', 25)
    })

    it('Search works', () => {

        // grabs the searchbar, types a search request and presses enter
        cy.get('input[type=search]')
            .type('This Is America')
            .type('{enter}')

        // Checks if the searchstring appears on the page. The seachstring
        // itself will not trigger this test
        // .contains is case sensetive
        cy.contains('This Is America')
    })

    it('search will not return anything if there are no matches', () => {

        // Tests if anything is shown with random garbage input
        cy.visit('http://localhost:3000/')
        cy.get('input[type=search]')
            .type('jjdfjljslfasljfj')
            .type('{enter}')
        cy.get('.MuiTableBody-root').children().should('have.length', 0)
    })
})
