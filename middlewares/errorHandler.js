import createError from "http-errors";

export default {
    notFound(req, res, next) {
        next(createError(404, "Route not found"));
    },

    errors(err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors || null
        });
    }
};