describe('Search Product', () => {

    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
    })

    it('Search & Choose Hoodies without Sign in', () => {
        cy.get('#ui-id-5').click()
        cy.url().should('contains','/men.html')

        // Select Category Hoodies
        cy.get('.categories-menu > :nth-child(2) > :nth-child(1) > a').click()
        cy.url().should('contains','hoodies-')
        cy.get(':nth-child(2) > .filter-options-title').click()  
        cy.get(':nth-child(2) > .filter-options-content > .items > :nth-child(1) > a').click()
        cy.url().should('contains','hoodies-')
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.url().should('contains','trek-hoodie')
        cy.get('#option-label-size-143-item-169').click()
        cy.get('#option-label-color-93-item-51').click()
        cy.get('#qty').clear().type('2{enter}')
        cy.get('#product-addtocart-button').click()

        // Check if product already in basket
        //cy.get('a[href*="/checkout/cart/"]').click()

        // View and continue to checkout
        //cy.get('#top-cart-btn-checkout').click()

    })

    
})