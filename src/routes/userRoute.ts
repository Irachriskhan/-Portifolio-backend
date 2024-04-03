import express, { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controller/userController";
const router: Router = express.Router();
import { verifyAdmin, verifyUser } from "../utils/verifyToken";

// update User
router.put("/:id", verifyUser, updateUser);

// delete User
router.delete("/:id", verifyAdmin, deleteUser);

// get single User
router.get("/:id", verifyUser, getSingleUser);

// get all Users
router.get("/", verifyAdmin, getAllUser);

export default router;