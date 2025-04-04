import express from 'express';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import hostRouter from './routes/host.routes.js';
import boardingRouter from './routes/boarding.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/host', hostRouter);
app.use('/api/v1/boarding', boardingRouter);

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
