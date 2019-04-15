var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var db = require('../bd/bd.js');
var Protocolos = require('../models/pdfModel.js');


var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');
//mé todo que 
_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        var newProtocolo = new Protocolos(req.body);
        console.log({"dados": newProtocolo, "body" : req.body })
        newProtocolo.save(newProtocolo);

        return res.json({originalname:req.file.originalname, uploadname:req.file.filename, retorno: newProtocolo});
    });
});

//método que lista os arquivos para download
_router.post('/download', function(req,res,next){
   
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    console.log(filepath);
    console.log({"file": filepath});
    res.sendFile(filepath);
});

module.exports = _router;