const express = require("express")
const Image = require("../model/image-model.js");
import { verifyToken } from "../middlewares/auth-middleware.js";
import {postImage, getImages, getSingleImage,deleteImage,upload} from "../controller/image-controller.js"
const router = express.Router();

router.post("/post", verifyToken,upload.single("imagePath") ,postImage);
router.get("/", getImages);
router.get("/:id", getSingleImage);
router.delete("/:id", verifyToken, deleteImage)