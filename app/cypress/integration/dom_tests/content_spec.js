/// <reference types="cypress" />

describe('Content exists on page', () => {

    // beforeEach(() => {
    //     cy.visit('http://localhost:3000/')
    // })

    it('Page has content initially', () => {
        cy.visit('http://localhost:3000/')

        // This test selects the table containing the songs in the DOM and verifies
        // That there is at least one song displayed (children element of the table)
        cy.get('.MuiTableBody-root').children().should('exist')
    })

    it('Additional information shown on click', () => {

        // Tests that there is no image (Additional information) displayed before
        // interaction
        cy.get('img[id=popup_image]').should('not.exist')

        // Gets the first cell of every row, targets the first (top) one of them,
        // and clicks it
        cy.get('th[class="MuiTableCell-root MuiTableCell-body"]').first().click()

        // Verifies that an image has appeared
        cy.get('img[id=popup_image]').should('exist')
    })

    it('Additional information removed on "close" click', () => {

        // Finds and presses the close button, then verifies that the image is gone
        cy.contains('close').click()
        cy.get('img[id=popup_image]').should('not.exist')
    })

    it('Selector updates selection', () => {

        // Selects the select menu in which a user can change the number of songs
        // displayed simultaneously, and clicks it so the menu becomes visible in the DOM
        cy.get('.MuiSelect-root').click()

        // Selects the now open menu, selects the option "10" and clicks it.
        cy.get('.MuiPaper-root > .MuiList-root')
        cy.contains(10).click()

        // checks if the selection of 10 updated the number of songs displayed in the table
        cy.get('.MuiTableBody-root').children().should('have.length', 10)

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

    // Tests if anything is shown if there are no matches input
    it('search will not return anything if there are no matches', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[type=search]')
            .type('jjdfjljslfasljfj')
            .type('{enter}')

        cy.get('.MuiTableBody-root')
            .children()
            .should('have.length', 0)
    })
})
