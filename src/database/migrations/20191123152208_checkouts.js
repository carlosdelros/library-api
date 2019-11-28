
exports.up = function(knex) {
  return knex.schema
  .createTable('checkouts', (table) => {
      table.increments('id'),
      table.string('book_id', 13),
      table.integer('user_id'),
      table.timestamp('checkout_date').defaultTo(knex.fn.now()),
      table.timestamp('due_date'),
      table.timestamp('return_date').nullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('checkouts')
};
