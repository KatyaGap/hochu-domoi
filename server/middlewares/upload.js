const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadMultiple = upload.fields([{ name: 'files', maxCount: 5 }]); // ОНО?

module.exports = { upload, uploadMultiple };
