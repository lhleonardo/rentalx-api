import { celebrate, Joi, Segments } from "celebrate";

const forgotPasswordValidator = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
        }),
    },
    { abortEarly: false }
);

export { forgotPasswordValidator };
