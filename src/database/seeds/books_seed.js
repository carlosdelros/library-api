
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          isbn: "9780984782871",
          title: "Cracking the coding interview",
          authors: "Gayle McDowell",
          year_published: 2015,
          publisher: "CareerCup",
          status: "available",
          inventory: 10
        },
        {
          isbn: "9780984781871",
          title: "Example Book 1",
          authors: "Joe Smith",
          year_published: 2015,
          publisher: "The Publisher",
          status: "available",
          inventory: 10
        },
        {
          isbn: "9780984781872",
          title: "Example Book 2",
          authors: "Jake Writer",
          year_published: 2015,
          publisher: "The Publisher",
          status: "available",
          inventory: 10
        }
      ]);
    });
};
