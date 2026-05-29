import loginPage from "../../pageObjects/loginPage"

describe('Login Page', () => {

    let userData
    before(() => {
        cy.fixture("credentials").then((data) => {
            userData = data
        })
    })

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
    })

    it("should login successfully with valid credentials", () => {
        loginPage.login(userData.validUser.username,userData.validUser.password)
        cy.url().should('include','inventory')
        cy.get('.inventory_list').should('be.visible')
    })

    it("should show error message for both invalid credentials", () => {
        cy.login("random","random")
        cy.verifyError("Username and password do not match")
    })
    
    it("should show error message for no credentials", () => {  
        cy.login("","")
        cy.verifyError("Username is required")
    })

    it("should show error message for empty password field", () => {  
        cy.login("random","")
        cy.verifyError("Password is required")
    })

    it("should show error message for empty username field", () => {
        cy.login("","random")
        cy.verifyError("Username is required")
    })

    it("should hide the error message after clicking the error close button", () => {  
        cy.login("","random")
        cy.get('[data-test = "error-button"]').click()
        cy.get('[data-test = "error-button"]').should('not.exist')
    })

})

