let knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "../Quiz.sqlite"
    }
});

module.exports = knex
