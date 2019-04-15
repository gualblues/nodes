const mongoose = require('mongoose');

var protocolosSchema = new mongoose.Schema({
    tipopdf: String,
    keywords: Array,
    bynariopdf: String,
    pathpdf: String,
    dataIntegracao: Date,
    subtipo: String,
    codigo: String
}, {collection: 'protocolos'}
);
module.exports = mongoose.model("protocolo", protocolosSchema);
//modelos
