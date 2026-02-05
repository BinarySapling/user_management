import express from "express"

import {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    getAllUsers
}
from "../controllers/user.controller.js"
import { checkAuth, validateUser , validateUserId } from "../middleware/auth.js";

const router = express.Router();

router.post("/", validateUser ,createUser);//fixed
router.get("/:id", validateUserId,getUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);
router.get("/all",getAllUsers)

export default router;