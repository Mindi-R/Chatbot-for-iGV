import { Router } from 'express';

const hostRouter = Router();

hostRouter.get('/', (req,res) => res.send ({'message': 'GET all hosts'}));

hostRouter.get('/:id', (req,res) => res.send({'message': `GET host with id ${req.params.id}`}));

hostRouter.post('/', (req,res) => res.send({'message': 'CREATE new host'}));

hostRouter.put('/:id', (req,res) => res.send({'message': `UPDATE host with id ${req.params.id}`}));

hostRouter.delete('/:id', (req,res) => res.send({'message': `DELETE host with id ${req.params.id}`}));

export default hostRouter;