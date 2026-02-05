import express from "express"

import {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}
from "../controllers/user.controller.js"
import { checkAuth, validateUser , validateUserId } from "../middleware/auth.js";

const router = express.Router();

router.post("/", validateUserlidateUser ,createUser);
router.get("/:id", validateUserId,getUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;