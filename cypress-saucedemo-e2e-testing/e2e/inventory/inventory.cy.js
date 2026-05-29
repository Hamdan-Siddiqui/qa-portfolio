import inventoryPage from "../../pageObjects/inventoryPage"

describe('Inventory Page', () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
        cy.login("standard_user","secret_sauce")
    })

    it("checks if all the details in inventory description are present", () => {
        inventoryPage.verifyItems()
    })

    it("checks if items label leads to the item page", () => {
        cy.getInventoryItems().each(($el, index) => {
                cy.get("[data-test = 'inventory-item-name']").eq(index).click()
                cy.verifyItems("id")
                cy.go('back')
        })
    })

    it("checks if item images leads to the item page", () => {
        cy.getInventoryItems().each(($el, index) => {
                cy.get(".inventory_item_img").eq(index).click()
                cy.verifyItems("id")
                cy.go('back')
        })
    })

    it("should sort items by name A to Z", () => {
        cy.getSortType('az')
        inventoryPage.verifySort("az")
    })

    it("should sort items by name Z to A", () => {
        cy.getSortType('za')
        inventoryPage.verifySort("za")
    })

    it("should sort items by price low to high", () => {
        cy.getSortType('lohi')
        inventoryPage.verifySort("lohi")
    })

    it("should sort items by price high to low ", () => {
        cy.getSortType('hilo')
        inventoryPage.verifySort("hilo")
    })


})