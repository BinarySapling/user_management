import express from "express"

import {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    getAllUsers,
    getActiveUsers,
    updatePasswordByEmailController,
    updateNameByEmailController,
    deleteUserByEmailController
}
from "../controllers/user.controller.js"
import { checkAuth, validateUser , validateUserId, validateToken } from "../middleware/auth.js";
import { validateCreateUserDto } from "../dtos/createUser.dto.js";

const router = express.Router();

router.post("/", validateCreateUserDto ,createUser);//fixed
router.post("/update-password", updatePasswordByEmailController);
router.post("/update-name", updateNameByEmailController);
router.delete("/delete-by-email", deleteUserByEmailController);
router.get("/all",getAllUsers);
router.get("/active", getActiveUsers);
router.get("/:id", validateToken, validateUserId, getUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;