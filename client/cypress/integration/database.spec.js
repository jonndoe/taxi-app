// integration/database.spec.js

describe('The database client', function () {
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
});
