
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: "Rick", last_name: "Sanchez", user_type: "admin"},
        {id: 2, first_name: "Morty", last_name: "Smith", user_type: "customer"},
        {id: 3, first_name: "Summer", last_name: "Smith", user_type: "customer"},
        {id: 4, first_name: "Beth", last_name: "Smith", user_type: "customer"},
        {id: 5, first_name: "Jerry", last_name: "Smith", user_type: "customer"}
      ]);
    });
};
