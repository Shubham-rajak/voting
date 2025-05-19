
import multer from 'multer';
import path from 'path';
import fs from 'fs';
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(fs.existsSync('./uploads')){
            cb(null, './uploads')
        }else{
            fs.mkdirSync("./uploads")
            cb(null, './uploads')
        }
    },
    filename: function (req, file, cb) {
        const orgName = file.originalname;
        const fname = path.parse(orgName).name;
        const ext = path.parse(orgName).ext;
        const uniqueValue = Date.now();
        const filename = fname+'-'+uniqueValue+ext
      cb(null, filename)
    }
  })
  