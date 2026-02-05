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
import { checkAuth, validateUser , validateUserId, validateToken } from "../middleware/auth.js";
import { validateCreateUserDto } from "../dtos/createUser.dto.js";

const router = express.Router();

router.post("/", validateCreateUserDto ,createUser);//fixed
router.get("/all",getAllUsers);
router.get("/:id", validateToken, validateUserId, getUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;