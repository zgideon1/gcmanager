const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required(),
            username: Joi.string().required(),
            firstname: Joi.string().min(1).required(),
            lastname: Joi.string().min(1).required(),
            role: Joi.number().integer().required()
        });
        
        const { error, value } = schema.validate(req.body);
        if(error) {
            switch (error.details[0].context.key) {
                case 'email':
                    return res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    return res.status(400).send({
                        error: '<br> The password provided must be between 8 and 32 characters with no special characters'
                    })
                    break
                case 'firstname':
                    return res.status(400).send({
                        error: 'First name is required'
                     })

                case 'lastname':
                    return res.status(400).send({
                        error: 'Last name is required'
                    })
                case 'role':
                    return res.stats(400).send({
                        error: 'Invalid role'
                    })
                default:
                    return res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } 
        next()
    }
}