import Joi from 'joi';

const genres = [
    "fiction",
    "non-fiction",
    "science",
    "history",
    "fantasy",
    "mystery",
    "biography",
    "other"
];

export const create = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    author: Joi.string().min(1).max(100).required(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().valid(...genres).required()
});

export const update = create;