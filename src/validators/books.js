const Joi = require('@hapi/joi')
// Validators for the different book actions
module.exports = {
    createBook: Joi.object({
        isbn: Joi.alternatives().try(
            Joi.string().min(10).max(10),
            Joi.string().min(13).max(13)
        ),
        inventory: Joi.number().integer()
    }),
    deleteBook: Joi.object({
        isbn: Joi.alternatives().try(
            Joi.string().min(10).max(10),
            Joi.string().min(13).max(13)
        )
    })
}
