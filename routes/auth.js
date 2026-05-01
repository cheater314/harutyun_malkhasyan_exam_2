import { Router } from "express";
import validator from "../middlewares/validation.js";
import authorization from "../middlewares/authorization.js";
import * as schema from "../middlewares/schemas/auth.schema.js";
import * as controller from "../controllers/auth.js";

const router = Router();

router.post("/register", validator(schema.register), controller.register);
router.post("/login", validator(schema.login), controller.login);
router.get("/profile", authorization, controller.profile);

export default router;