import createError from "http-errors";
import Users from "../models/users.js";

export default async function authorization(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return next(createError(401, "No token"));
        }

        const data = Users.decrypt(token);

        if (!data?.userId) {
            return next(createError(401, "Invalid token"));
        }

        req.userId = data.userId;
        next();
    } catch {
        next(createError(401, "Unauthorized"));
    }
}