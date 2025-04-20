import express from 'express';
import { addBoarding, listBoarding } from '../controllers/boarding.controller.js';
import upload from '../middleware/upload.middleware.js';

const boardingRouter = express.Router();

boardingRouter.post('/add-boarding', upload.array('images'), addBoarding);
boardingRouter.get('/list-boarding', listBoarding);

export default boardingRouter;