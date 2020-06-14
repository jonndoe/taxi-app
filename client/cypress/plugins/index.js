// plugins/index.js

const knex = require('knex');

module.exports = (on, config) => {
  on('task', {
    async tableInsert ({ table, rows, truncate }) {
      const client = await knex({
        client: 'pg',
        connection: config.env.database
      });
      if (truncate) {
        await client.raw(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
      }
      return client.insert(rows, ['id']).into(table);
    },


    async tableSelect ({ table }) {
      const client = await knex({
        client: 'pg',
        connection: config.env.database
      });
      return client.select().table(table);
    }



  });
}