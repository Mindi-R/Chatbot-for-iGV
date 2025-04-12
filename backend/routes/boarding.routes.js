import { Router } from "express";

const boardingRouter = Router();

boardingRouter.get('/',(req,res) => res.send ({'message': 'GET all boardings'}));

boardingRouter.get('/:id',(req,res)=> res.send({'message': `GET boarding with id ${req.params.id}`}));

boardingRouter.post('/',(req,res)=> res.send({'message': 'CREATE new boarding'}));

boardingRouter.put('/:id',(req,res)=> res.send({'message': `UPDATE boarding with id ${req.params.id}`}));

boardingRouter.delete('/:id',(req,res)=> res.send({'message': `DELETE boarding with id ${req.params.id}`}));

boardingRouter.get('/host/:id',(req,res)=> res.send({'message': `GET all boardings for host with id ${req.params.id}`}));

export default boardingRouter;