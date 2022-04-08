Cypress.Commands.add("signup", (username, password, confirmPassword = password) => {
    cy.get(".menu").click();
    cy.wait(500);
    cy.get("a[href='/auth/signup'").click();
    cy.get(".btn-close").click();
    cy.wait(250);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(password);
    cy.get("input[name=confirmPassword]").type(password);
    cy.get("button[type=submit]").click();
    cy.wait(1000);
});
