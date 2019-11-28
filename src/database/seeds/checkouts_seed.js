
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('checkouts').del()
      .then(function () {
        // Inserts seed entries
        return knex('checkouts').insert([
          {
            book_id: 9780984782871,
            user_id: 2,
            checkout_date: '2019-11-27 16:59:29',
            due_date: '2019-11-29 16:59:29'
          },
          {
            book_id: 9780984781871,
            user_id: 2,
            checkout_date: '2019-11-27 16:59:29',
            due_date: '2019-11-29 16:59:29'
          },
          {
            book_id: 9780984782871,
            user_id: 3,
            checkout_date: '2019-11-27 16:59:29',
            due_date: '2019-11-26 16:59:29'
          },
          {
            book_id: 9780984782871,
            user_id: 4,
            checkout_date: '2019-11-27 16:59:29',
            due_date: '2019-11-26 16:59:29'
          },
        ]);
      });
  };
  