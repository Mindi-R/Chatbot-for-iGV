import { Router } from "express";
import { addBoarding, listBoarding } from "../controllers/boarding.controller.js";
import { list } from "postcss";

const boardingRouter = Router();

boardingRouter.post('/add-boarding', addBoarding);
boardingRouter.post('/list-boarding', listBoarding);

export default boardingRouter;