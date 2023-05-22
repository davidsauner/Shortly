import Joi from 'joi';

const SignUpSchema = Joi.object ({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(), 
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})
export default SignUpSchema