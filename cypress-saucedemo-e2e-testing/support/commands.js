Cypress.Commands.add('login',(username, password) => {
    if (username){
        cy.get("#user-name").type(username)
        }
    if (password){
        cy.get("#password").type(password)
        }
        
        cy.get("#login-button").click()
})

Cypress.Commands.add('verifyError',(errorMessage) => {
    cy.get('[data-test = "error"]').should('be.visible').and('contain.text',errorMessage)
    cy.screenshot()
})

Cypress.Commands.add('getInventoryItems',() => {
    return cy.get("[data-test = 'inventory-item']")
})

Cypress.Commands.add('verifyItems', (item) => {
    cy.fixture('inventory').then((data) => {
        cy.get("[data-test = 'inventory-item-name']").then(($name) => {
            const itemName = $name.text().trim()
            const expected = data[itemName]

            if(item==="id"){
                cy.url().should('include',`id=${expected.id}`)
            }
            if(item==="price"){
                cy.get("[data-test = 'inventory-item-price']").should('contain', expected.price)
            }
            if(item==="image"){
                cy.get(`[data-test='${expected.image}']`).should('be.visible')
            }
            if(item==="desc")
                cy.get("[data-test = 'inventory-item-desc']").should('contain', expected.desc)

        })
    })
})

Cypress.Commands.add('getSortType',(type) => {
    cy.get('[data-test="product-sort-container"]').select(type)
})

Cypress.Commands.add('addToCart', () => {
    cy.contains('button', 'Add to cart').click()
})

Cypress.Commands.add('removeFromCart', () => {
    cy.contains('button', 'Remove').click()
})

Cypress.Commands.add('goToCart', () => {
    cy.get("[data-test='shopping-cart-link']").click()
})
