
exports.up = function(knex) {
  return knex.schema
  .createTable('users', (table) => {
    table.increments('id'),
    table.string('first_name', 50).notNullable(),
    table.string('last_name', 50).notNullable(),
    table.string('email', 50),
    table.string('phone', 10),
    table.enum('user_type', ['admin', 'customer'])
    table.timestamp('created_at').defaultTo(knex.fn.now()),
    table.timestamp('deleted_at').nullable()
})
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('users')
};
