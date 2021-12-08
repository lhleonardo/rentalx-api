import { celebrate, Joi, Segments } from "celebrate";

const resetPasswordValidator = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        }),
        [Segments.PARAMS]: {
            token: Joi.string().uuid().required(),
        },
    },
    { abortEarly: false }
);

export { resetPasswordValidator };
