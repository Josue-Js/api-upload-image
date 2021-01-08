import multer from 'multer';
import md5 from 'md5';
import path from 'path';


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join('./', 'uploads'))
    },

    filename: (req, file, cb) => {

        const hash = md5(Date.now())
        file.key = `${hash}@${file.originalname}`

        cb(null, file.key)

    }

})
    


export default {

    storage: storage,
    
    limits: {
        fileSize: 3 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedFiles = [
            "image/png",
            "image/jpeg",
            "image/pjpeg",
            "image/gif"
        ]

        if (allowedFiles.includes(file.mimetype)){
            cb(null, true)
        }
        else {
            cb(new Error('Invalid file type'))
        }


    }
  
}
