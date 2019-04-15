const mongoose = require('mongoose');
const config = require('../configs/conf.json');
const model = require('../models/pdfModel.js');

//var urlDB = config.Homologacao.db.url;
var urlDB = config.database.mongoAmazon.db.url;

console.log({'urlDB': urlDB});

mongoose.connect(urlDB);
console.log("Conectado ao banco" + urlDB);