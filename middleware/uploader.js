const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb)=> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' + file.originalname)
      }
})

const uploader = multer({
    storage : storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|webp|jpeg/;
        const extension = path.extname(file.originalname);

        if(supportedImage.test(extension)){
            cb(null, true);
          } else{
            cb(new Error("Must be a png/jpg/webp image"));
          }
    },
    limits: {
        fileSize: 5242880, // Max - 5 MB
    }
})

module.exports = uploader;