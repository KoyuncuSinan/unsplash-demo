import express from "express"
import { verifyToken } from "../middlewares/auth-middleware.js";
import {postImage, getImages, getSingleImage,deleteImage,upload} from "../controller/image-controller.js"
const router = express.Router();

router.post("/post", verifyToken,upload.single("imagePath") ,postImage);
router.get("/", getImages);
router.get("/:id", getSingleImage);
router.delete("/:id", verifyToken, deleteImage)

export default router;