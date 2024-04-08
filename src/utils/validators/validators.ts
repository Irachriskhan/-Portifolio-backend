import Joi from 'joi';

const messageValidator = Joi.object({
    sender: Joi.string().min(5).max(50).required().email(),
    email: Joi.string()
        .email()
        .required()
        .pattern(
            new RegExp(
                '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
            ),
        ),
    body: Joi.string().required(),
    replyTo: Joi.string().trim().allow(null), // replyTo is optional
});

const blogValidator = Joi.object({
    title: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
});

const commentValidator = Joi.object({
    user: Joi.string().trim().required().trim(),
    blog: Joi.string().trim().required(),
    comment: Joi.string().required().max(200),
});

const subscriberValidator = Joi.object({
    fullname: Joi.string()
        .required()
        .max(100)
        .trim()
        .pattern(new RegExp('^[a-zA-Z0-9]')),
    email: Joi.string()
        .required()
        .max(100)
        .trim()
        .pattern(
            new RegExp(
                '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
            ),
        ),
});

const userValidator = Joi.object({
    name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]')),
    email: Joi.string()
        .required()
        .trim()
        .pattern(
            new RegExp(
                '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$',
            ),
        ),
    password: Joi.string().required().trim().pattern(new RegExp('')),
});

export {
    messageValidator,
    blogValidator,
    commentValidator,
    subscriberValidator,
    userValidator,
};

// const { error } = messageValidator.validate(req.body);
// if (error) {
//     res.status(400).json({ error: error.details[0].message });
//     return;
// }
