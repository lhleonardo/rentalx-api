import { celebrate, Joi, Segments } from "celebrate";

const createCategoryValidation = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
        }),
    },
    { abortEarly: false }
);

export { createCategoryValidation };
