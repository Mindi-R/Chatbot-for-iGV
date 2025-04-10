import { Router } from 'express';
import { signUp, signIn , signOut } from '../controllers/auth.controller.js';


const authRouter =  Router();

authRouter.post('/sign-up',signUp);

authRouter.post('/sign-in',signIn);

authRouter.post('/sign-out',signOut);

authRouter.post('/refresh-token',(req,res)=> res.send({'message': 'Refresh token'}));

export default authRouter;
