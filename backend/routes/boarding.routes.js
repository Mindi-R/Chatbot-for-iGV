import express from 'express';
import { addBoarding, listBoarding } from '../controllers/boarding.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/add-boarding', upload.array('images'), addBoarding);
router.get('/list-boarding', listBoarding);

export default router;