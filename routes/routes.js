import express from "express";
import { signIn, signUp } from "../controllers/authCtrl.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userCtrl.js";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Auth
router.post("/signup", signUp);
router.post("/signin", signIn);

// CRUD User
router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, isAdmin, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
