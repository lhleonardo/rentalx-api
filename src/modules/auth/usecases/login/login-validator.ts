import { celebrate, Joi, Segments } from "celebrate";

const createLoginValidator = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },
    { abortEarly: false }
);

export { createLoginValidator };
