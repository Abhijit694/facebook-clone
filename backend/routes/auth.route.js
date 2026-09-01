import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateCoverPhoto,
  updateProfilePhoto,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile/:id", getProfile);
router.put(
  "/update/profile-picture",
  isAuthenticated,
  upload.single("file"),
  updateProfilePhoto,
);
router.put(
  "/update/cover-photo",
  isAuthenticated,
  upload.single("file"),
  updateCoverPhoto,
);

export default router;
