// integration/database.spec.js

describe('The database client', function () {


  beforeEach(function () {
    cy.fixture('data/users.json').then((users) => {
      cy.task('tableInsert', {
        table: 'trips_user', rows: users, truncate: true
      }).then((ids) => {
        cy.wrap(ids).should('have.length', 2);
      });
    });
  });

  // new
  it('can read data from a table', function () {
    cy.task('tableSelect', {
      table: 'trips_user'
    }).then((users) => {
      cy.wrap(users).should('have.length', 2);
    })
  });




  it('can insert data into a table', function () {
    cy.task('tableInsert', {
      table: 'trips_user',
      rows: [
        {
          username: 'test.user@example.com',
          password: 'pAssw0rd',
          first_name: 'Test',
          last_name: 'User',
          email: 'test.user@example.com',
          date_joined: new Date(),
          is_staff: false,
          is_superuser: false,
          is_active: true
        }
      ],
      truncate: true
    }).then((ids) => {
      cy.wrap(ids).should('have.length', 1);
    });
  });


  it('can insert data into a table from fixtures', function () {
    cy.fixture('data/users.json').then((users) => {
      cy.task('tableInsert', {
        table: 'trips_user', rows: users, truncate: true
      }).then((ids) => {
        cy.wrap(ids).should('have.length', 2);
      });
    });
  });



  it('can read data from a table', function () {
    cy.task('tableSelect', {
      table: 'trips_user'
    }).then((users) => {
      cy.wrap(users).should('have.length', 2);
    })
  });

});
