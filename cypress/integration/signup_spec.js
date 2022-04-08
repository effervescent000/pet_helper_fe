describe("Sign up tests", () => {
    it("signs up with valid new credentials", () => {
        const user = {
            username: `testuser${Math.floor(Math.random() * 10000)}`,
            password: "testpassword",
        };
        cy.visit("http://127.0.0.1:3000");
        cy.signup(user.username, user.password);
        cy.getCookie("access_token_cookie").should("exist");
        cy.get(".menu").click();
        cy.get(".offcanvas-body").should("contain", "Add pet").and("not.contain", "Sign up");
    });
});
