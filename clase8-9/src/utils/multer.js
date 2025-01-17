const multer = require('multer')
const { dirname } = require('node:path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, dirname(__dirname)+'/public/image')
        cb(null, dirname(dirname(__dirname))+'/public/image')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})

module.exports = {
    uploader
}

// export uploader