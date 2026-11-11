import multer from 'multer'
import path from 'path'


function fileFilter(req, file, cb) {
  // 1. Define the allowed file types using a regular expression
  const allowedTypes = /jpeg|jpg|png|gif/;

  // 2. Check the file extension
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  console.log(isValidExt, "Extention");

  // 3. Check the MIME type
  const isValidMimeType = allowedTypes.test(file.mimetype);

  console.log(isValidExt, "mime type");

  // 4. Accept or reject the file
  if (isValidExt || isValidMimeType) {
    // Accept the file
    console.log("helllo");

    cb(null, true);
  } else {
    // Reject the file and pass an error
    cb(
      new Error(
        "Invalid file type. Only PNG, JPG, JPEG, and GIF images are allowed!",
      ), false
    );
  }
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

export const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 //10mb
    }

})