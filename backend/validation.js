const Joi = require('@hapi/joi');

// signup validation
const signupValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    // validate data before user creation
    return schema.validate(data);

    if (error) return res.status(400).send(error.details[0].message);
}

// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    // validate data before user creation
    return schema.validate(data);

    if (error) return res.status(400).send(error.details[0].message);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;