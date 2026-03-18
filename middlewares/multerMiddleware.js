const multer = require('multer')

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'./uploads')
  },
  filename:(req,file,callback)=>{
    const date = new Date().toDateString()
    const fname = `img - ${file.originalname}-${date}`

    callback(null,fname)
  }


})

const  fileFilter=(req,file,callback)=>{
    if(file.mimetype==`image/png` || file.mimetype==`image/jpg` || file.mimetype==`image/jpeg` || file.mimetype==`image/webp`){
        callback(null,true)
    }else{
        callback(null,false)
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig;



