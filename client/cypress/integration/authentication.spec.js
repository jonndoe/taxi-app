// cypress/integration/authentication.spec.js



describe('Authentication', function () {
  it('Can log in.', function () {

    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/log_in/**',
      status: 200,
      response: {
        'access': 'ACCESS_TOKEN',
        'refresh': 'REFRESH_TOKEN'
      }
    }).as('logIn');

    cy.visit('/#/log-in');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('button').contains('Log in').click();

    cy.wait('@logIn');

    cy.hash().should('eq', '#/');
    cy.get('button').contains('Log out');
  });
  it('Can sign up.', function () {
    cy.visit('/#/sign-up');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#firstName').type('Gary');
    cy.get('input#lastName').type('Cole');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('select#group').select('driver');
    cy.fixture('images/photo.jpg').then(photo => {
        cy.get('input#photo').attachFile({
          fileContent: photo,
          fileName: 'photo.jpg',
          mimeType: 'application/json'
        });
      });
    cy.get('button').contains('Sign up').click();
    cy.hash().should('eq', '#/log-in');
  });
});

