import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  //giving name to file
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //cb(null, file.fieldname + "-" + uniqueSuffix);

    cb(null, file.originalname);
    // console.log(file);
  },
});

export const upload = multer({ storage });
