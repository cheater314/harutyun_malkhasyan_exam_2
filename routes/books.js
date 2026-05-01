import { Router } from "express";
import validator from "../middlewares/validation.js";
import authorization from "../middlewares/authorization.js";
import * as schema from "../middlewares/schemas/books.schema.js";
import * as controller from "../controllers/books.js";

const router = Router();

router.use(authorization);

router.get("/", controller.getAll);
router.post("/", validator(schema.create), controller.create);
router.put("/:id", validator(schema.update), controller.update);
router.delete("/:id", controller.remove);

export default router;