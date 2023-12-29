describe('verify searchbar', () => {
    it('negative - verifify searchbar, minimum search query lenght 3', () => {
      cy.visit('')
      cy.wait(1000)
      cy.login2('idlytogame@gmail.com','K3ri,wisnu')
      cy.wait(1000)
      cy.get('#search').type('x{enter}')
      cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div')
      .invoke('text')
      .then(text => {
        expect(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
          .to.contains('Minimum Search query length is 3')
      })
    })
    it('positive - verifify searchbar no item found', () => {
      cy.visit('')
      cy.wait(1000)
      cy.login1()
      cy.wait(1000)
      cy.get('#search').type('xxx{enter}')
      cy.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[2]/div').should('contains.text','Your search returned no results.')
      cy.wait(2000)
    })
    it('positive - verifify searchbar item found', () => {
      cy.visit('')
      cy.wait(1000)
      cy.login1()
      cy.wait(1000)
      cy.get('#search').type('Jacket{enter}')
      cy.get(':nth-child(1) > .product-item-info > .details > .name > .product-item-link')
      .invoke('text')
      .then(text => { 
        expect(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
          .to.contains('Adrienne Trek Jacket')
      })
      cy.wait(2000)
    })
  })
  