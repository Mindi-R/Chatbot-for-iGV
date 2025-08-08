import { config } from 'dotenv';

// Load the correct .env file based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;