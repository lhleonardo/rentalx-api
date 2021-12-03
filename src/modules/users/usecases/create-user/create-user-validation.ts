import { celebrate, Joi, Segments } from "celebrate";

const createUserValidation = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            driverLicense: Joi.string(),
            avatar: Joi.string(),
        }),
    },
    { abortEarly: false }
);

export { createUserValidation };
