import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectToDatabase from './config/mongodb.js';
import authRouter from './routes/auth.routes.js';
import boardingRouter from './routes/boarding.routes.js';
import hostRouter from './routes/host.routes.js';   

const app = express();
const port = process.env.PORT || 5500;
connectToDatabase();
    // connect to cloudinary

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/user', authRouter);
app.use('/api/boarding', boardingRouter);
app.use('/api/host', hostRouter);

// listen 
app.get('/', (req,res) => {
    res.send("API working");
})

// listen 
app.listen(port, () => 
    console.log('Server is running on port '+ port)
);

