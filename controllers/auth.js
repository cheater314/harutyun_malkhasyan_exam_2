import createError from "http-errors";
import Users from "../models/users.js";

export async function register(req, res, next) {
    try {
        const { username, email, password, age } = req.body;

        const exists = await Users.checkEmailUnique(email);
        if (exists) throw createError(422, "Email is already in use!");

        const user = await Users.create({
            username,
            email,
            password: Users.hashPassword(password),
            age
        });

        delete user.password;

        res.json({ message: "User registered successfully", user });
    } catch (e) {
        next(e);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await Users.findByEmail(email);

        if (!user || user.password !== Users.hashPassword(password)) {
            throw createError(401, "Invalid credentials");
        }

        const token = Users.encrypt({ userId: user.id });

        delete user.password;

        res.json({ token, user });
    } catch (e) {
        next(e);
    }
}

export async function profile(req, res, next) {
    try {
        const user = await Users.findById(req.userId);
        res.json({
            user
        });
    } catch (e) {
        next(e);
    }
}