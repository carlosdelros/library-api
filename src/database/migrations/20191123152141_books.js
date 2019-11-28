
exports.up = function(knex) {
  return knex.schema
  .createTable('books', (table) => {
      table.string('isbn', 13).primary(),
      table.string('title', 255).notNullable(),
      table.string('authors', 255),
      table.integer('page_count'),
      table.integer('year_published'),
      table.string('publisher'),
      table.enum('status', ['available', 'checkec_out', 'out_of_circulation']).defaultTo('available')
      table.integer('inventory').defaultTo(0),
      table.timestamp('created_at').defaultTo(knex.fn.now()),
      table.timestamp('deleted_at').nullable()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('books')
};
