/* eslint-disable no-undef */

import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV||'development'}.local`});

export const { PORT , 
               NODE_ENV , 
               DB_URI ,
               CLOUD_NAME ,
               API_KEY ,
               API_SECRET ,
               JWT_SECRET ,
               JWT_EXPIRES_IN } = process.env;