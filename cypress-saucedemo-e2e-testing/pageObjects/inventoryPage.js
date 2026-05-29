class inventoryPage{
    verifyItems(item){
        cy.fixture("inventory").then((data)=>{
            cy.getInventoryItems().each(($el) => {
                cy.wrap($el).within(() => {
                    cy.get('[data-test = "inventory-item-name"]').then(($name) => {
                        const itemName = $name.text()
                        const expected = data[itemName]
                        
                        cy.get("[data-test = 'inventory-item-price']").should('contain', expected.price)
                        cy.get(`[data-test= '${expected.image}']`).should('be.visible')
                    })
             })
            })
        })
    }

    verifySort(type){
        let selector

        if(type === "az" || type === "za"){
            selector = "[data-test = 'inventory-item-name']"
        }
        else{
            selector = "[data-test = 'inventory-item-price']"
        }

        cy.get(selector).then(($els) => {
            let values = [...$els].map(el => el.innerText.trim())
        
            if(type === "hilo" || type === "lohi"){
                values = values.map(v => Number(v.replace('$','')))
            }

            let expected = [...values]

            if (type === 'az') expected.sort()
            if (type === 'za') expected.sort().reverse()
            if (type === 'lohi') expected.sort((a, b) => a - b)
            if (type === 'hilo') expected.sort((a, b) => b - a)

            expect(values).to.deep.equal(expected)
    })
    }
}

export default new inventoryPage