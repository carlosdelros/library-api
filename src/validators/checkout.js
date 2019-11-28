const Joi = require('@hapi/joi')
// Validation for the different checkout actions
module.exports = {
    checkoutBook: Joi.object({
        isbn: Joi.alternatives().try(
            Joi.string().min(10).max(10),
            Joi.string().min(13).max(13)
        ),
    }),
    returnBook: Joi.object({
        isbn: Joi.alternatives().try(
            Joi.string().min(10).max(10),
            Joi.string().min(13).max(13)
        ),
    }),
}
