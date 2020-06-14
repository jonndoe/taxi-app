describe('The rider dashboard', function () {

  before(function () {
    cy.fixture('data/users.json').then((users) => {
      cy.task('tableInsert', {
        table: 'trips_user', rows: users, truncate: true
      })
    });
    cy.fixture('data/groups.json').then((groups) => {
      cy.task('tableInsert', {
        table: 'auth_group', rows: groups, truncate: true
      })
    });
    cy.fixture('data/user_groups.json').then((groups) => {
      cy.task('tableInsert', {
        table: 'trips_user_groups', rows: groups, truncate: true
      })
    });
  })

  it('Cannot be visited if the user is not a rider', function () {
    const { username, password } = Cypress.env('driver')

    // Capture API calls.
    cy.server()
    cy.route('POST', '**/api/log_in/').as('logIn')

    // Log in.
    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, { log: false })
    cy.get('button').contains('Log in').click()
    cy.hash().should('eq', '#/')
    cy.get('button').contains('Log out')
    cy.wait('@logIn')

    cy.visit('/#/rider')
    cy.hash().should('eq', '#/')
  })
})

