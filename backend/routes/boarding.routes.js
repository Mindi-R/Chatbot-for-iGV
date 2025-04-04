import { Router } from "express";

const boardingRouter = Router();

boardingRouter.get('/',(req,res) => res.send ({'message': 'GET all boardings'}));

export default boardingRouter;