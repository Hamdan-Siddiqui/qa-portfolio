import checkout from "../../pageObjects/checkout"

describe('checkout', () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
        cy.login("standard_user","secret_sauce")
    })

    it("should verify that all items are added to the cart from inventory page", () => {
        cy.getInventoryItems().each(($el,index)=>{
            cy.wrap($el).within(()=>{
                cy.addToCart()
            })
            cy.get('[data-test="shopping-cart-badge"]').should('have.text', `${index + 1}`)
        })
    })

    it("should verify that items can be removed from the cart", () => {
        cy.getInventoryItems().each(($el)=>{
            cy.wrap($el).within(()=>{
                cy.addToCart()
                cy.removeFromCart()
            })
            cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
        })
    })

    it("should verify that the cart button navigates to the cart page", () => {
        cy.addToCart()
        cy.goToCart()
        cy.removeFromCart()
        cy.url().should('include','cart')
    })

    it("should verify that the continue shopping button navigates back to inventory page", () => {
        cy.goToCart()
        cy.contains('button', 'Continue Shopping').click()
        cy.url().should('include','inventory')
    })

    it("should verify that the checkout button navigates to checkout page", () => {
        cy.goToCart()
        cy.contains('button', 'Checkout').click()
        cy.url().should('include','checkout')
    })

})

describe("Checkout Page", () => {

    beforeEach(()=>{
        cy.visit("https://www.saucedemo.com/")
        cy.login("standard_user","secret_sauce")
        cy.goToCart()
        cy.contains('button', 'Checkout').click()
    })

    it("should cancel checkout and return to cart page", () => {
        cy.contains('button', 'Cancel').click()
        cy.url().should('include','cart')
    })

    it("should successfully complete checkout form submission", () => {
        checkout.fillForm("random","random","random")
        cy.url().should('include','two')
    })

    it("should show error when first name is missing in checkout form", () => {
        checkout.fillForm("","random","random")
        cy.verifyError("First Name")
    })

    it("should show error when last name is missing in checkout form", () => {
        checkout.fillForm("random","","random")
        cy.verifyError("Last Name")
    })

    it("should show error when postal code is missing in checkout form", () => {
        checkout.fillForm("random","random","")
        cy.verifyError("Postal Code")
    })

})