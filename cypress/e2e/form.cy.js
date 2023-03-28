describe("User Onboarding", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    
        




})
const firstNameInput = () => cy.get("input[name=first_name]");
const lastNameInput = () => cy.get("input[name=last_name]");
const emailInput = () => cy.get("input[name=email]");
const passwordInput = () => cy.get("input[name=password]");
const submitBtn = () => cy.get(`input[id="submitBtn"]`)
const tosToggle = () => cy.get("input[name=tos]")

it('Elements render', () => {
    firstNameInput().should("exist");
    lastNameInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
})
it('Can Navigate', () => {
    cy.url().should("include", "localhost");
})
it('Can use text boxes', () => {
    firstNameInput().should("have.value", "").type("Bob").should("have.value", "Bob");
    lastNameInput().should("have.value", "").type("Loblaw").should("have.value", "Loblaw");
    emailInput().should("have.value", "").type("bobloblaw@lawblog.com").should("have.value", "bobloblaw@lawblog.com");
    passwordInput().should("have.value", "").type("strongpassword123").should("have.value", "strongpassword123");
})
it('Can check ToS box', () => {
    tosToggle().check().should("have.value", "on");
})
it('Check to see if a user can submit the form data', () => {
    firstNameInput().type("Bob");
    lastNameInput().type("Loblaw");
    emailInput().type("bobloblaw@lawblog.com");
    passwordInput().type("strongpassword123");
    tosToggle().type("true");
    submitBtn().should("not.be.disabled");
})
it('Submit button starts as Disabled', () => {
    submitBtn().should("be.disabled");
})
// it('Check for blank inputs', () => {
//     firstNameInput().should("have.value", "").type("Bob").should("have.value", "Bob");
//     lastNameInput().should("not.have.value", "").type("Loblaw").should("have.value", "Loblaw");
//     emailInput().should("have.value", "").type("bobloblaw@lawblog.com").should("have.value", "bobloblaw@lawblog.com");
//     passwordInput().should("have.value", "").type("strongpassword123").should("have.value", "strongpassword123");
//     tosToggle().type("true");
//     submitBtn().should("be.disabled");
// })
it('Check for blank inputs', () => {
    firstNameInput().type("Bob");
    lastNameInput().type('{backspace}');
    // cy.contains("required").should("exist");
    lastNameInput().should("have.value", "");
    emailInput().type("bobloblaw@lawblog.com");
    passwordInput().type("strongpassword123");
    tosToggle().type("true");
    submitBtn().should("be.disabled");
    
})
})

