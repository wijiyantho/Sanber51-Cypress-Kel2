class loginPage{
    emladr = '#email_address'
    pswd = '#password'

    inputEmail(eMail){
        cy.get(this.emladr).type(eMail)
    }

    inputPassword(passwd){
        cy.get(this.pswd).type(passwd)
    }
}
export default new loginPage