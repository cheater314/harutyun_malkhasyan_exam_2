import createError from "http-errors";
import _ from "lodash";

export default function validator(schema, path = "body") {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req[path], {
                abortEarly: false
            });

            if (!error) return next();

            const errors = {};

            error.details.forEach(err => {
                const key = err.path.join(".");
                errors[key] = err.message.replace(/\"/g, "");
            });

            throw createError(422, "Validation error", { errors });
        } catch (e) {
            next(e);
        }
    };
}