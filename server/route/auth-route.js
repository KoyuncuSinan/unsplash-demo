const express = require("express");
import {signup, login} from "../controller/auth-controller.js"

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login);