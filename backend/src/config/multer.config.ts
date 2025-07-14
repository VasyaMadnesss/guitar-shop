import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FILE_UPLOAD_CONFIG } from './file-upload.config.js';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './backend/src/uploads',
    filename: (_, file, cb) => {
      const ext = extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      return cb(null, filename);
    },
  }),
  fileFilter: (_, file, cb) => {
    if (FILE_UPLOAD_CONFIG.ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG/JPEG/PNG images are allowed'), false);
    }
  },
  limits: {
    fileSize: FILE_UPLOAD_CONFIG.MAX_SIZE,
  },
};
