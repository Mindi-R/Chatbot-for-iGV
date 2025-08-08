// upload.middleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Ensure a destination folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destination = path.join(__dirname, '../uploads');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
