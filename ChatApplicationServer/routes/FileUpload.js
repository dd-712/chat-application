const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const path=require('path');
const cors=require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/Files');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    }
});

const FileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif|PNG|JPG|JPEG|JFIF|pdf|docx|doc|ppt|pptx|txt|tar|rar|zip|csv|xml|apk|py|cpp|html|css|c|cs|java|sh|swift|vb|xls|xlsm|xlsx|mp3|cda|aif|mid|wav)$/)) {
        return cb(new Error('You can upload only image, document and audio files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage,limits:{fileSize: 10000000},fileFilter: FileFilter});

const uploadRouter = express.Router();
uploadRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(cors.cors,authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /FileUpload');
})
.post(cors.corsWithOptions,authenticate.verifyUser,upload.single('File'),(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({'file':req.file.filename});
})
.put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /FileUpload');
})
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /FileUpload');
});

uploadRouter.route('/download/:filename')
.get(cors.cors,authenticate.verifyUser, (req, res, next) => {
    //console.log(req.params.filename);
    let npath=__dirname,path='';
     npath=npath.split('\\');
     for(let i=0;i<npath.length-1;i++)
     path+=npath[i]+'\\';
     
    var fileName = path+'public\\Files\\'+req.params.filename;
    console.log(fileName);
    res.statusCode = 200;
    res.sendFile(fileName, function (err) {
        if (err) {
            next(err);
        } 
    });
});

module.exports = uploadRouter;