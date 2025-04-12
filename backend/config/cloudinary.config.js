import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUD_NAME , API_KEY , API_SECRET} from '../config/env.js';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'imagesPendingApproval', // your image folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export { cloudinary, storage };