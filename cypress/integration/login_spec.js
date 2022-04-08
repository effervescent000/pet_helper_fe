describe("Login tests", () => {
    it("logins in with valid credentials", () => {
        const user = { username: "test_user", password: "ilovebutts" };
        cy.visit("http://127.0.0.1:3000");
        cy.login(user.username, user.password);
        cy.getCookie("access_token_cookie").should("exist");
        cy.get(".menu").click();
        cy.get(".offcanvas-body").should("contain", "Add pet").and("not.contain", "Sign up");
    });
});
