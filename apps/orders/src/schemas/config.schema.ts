import * as Joi from 'joi';

export const configValidation=Joi.object({
    MONGODB_URI: Joi.string().required()

});