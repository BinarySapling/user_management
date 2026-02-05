import express from "express"

import {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}
from "../controllers/user.controller.js"
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", checkAuth,getUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;