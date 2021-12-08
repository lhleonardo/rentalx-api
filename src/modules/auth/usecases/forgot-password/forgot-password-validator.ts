import { celebrate, Joi, Segments } from "celebrate";

const createForgotPasswordValidator = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
        }),
    },
    { abortEarly: false }
);

export { createForgotPasswordValidator };
