var express = require('express');
var _router = express.Router();
var arquivoPdf = require('../models/pdfModel.js');
var db = require('../bd/bd.js');

_router.get('/listaPdf', function(req,res){
    
    arquivoPdf.find({}).select('tipopdf pathpdf').lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
   
});

module.exports = _router;