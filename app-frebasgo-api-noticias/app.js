/**
 * @module root
 * Início da API, conexão com porta e requerimento de pacotes
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const restify = require('restify');
const errs = require('restify-errors')
const fs = require('fs');
const csvParser = require('csv-parse');
const config = require('./config.json');
const port = config.porta;
const got = require("got");
const path = require('path');
var swaggerDocument = require('./swagger.json');
const mysql = require("mysql");
const connection = mysql.createConnection(config.bd);

app.use(bodyParser.urlencoded({
    extended: true
}));

connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
})

var knex = require('knex')({
    client: 'mysql',
    connection:{
        host : config.bd.host,
        user : config.bd.user,
        password: config.bd.password,
        database: config.bd.database
    } 
});

app.use(express.static('public'));

app.use(bodyParser.json());

const router = express.Router();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('<div style="width:80%;background-color:rgba(84,64,12,0.55);padding:5%; margin:auto; font-family:tahoma, arial, sans-serif;border: solid 1px rgba(100,100,100,0.5)"><h1>Api de Notícias</h1><p><a target="alvo" href="/api-docs">documentação</a></p><iframe width="100%" id="alvo" height="80%" name="alvo" margin="0" border="0" frameborder="0"></iframe></div>');
});



router.get('/csvcarga', (req, res) => {
    let filePath = config.caminho_cfv;
    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, csvData) {
        if (err) {
            console.log(err);
        }
        csvParser(csvData, {
            delimiter: ','
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                data.forEach(function(element, index) {
                 res.send( data);
                });
                
                //execSQLQuery(`INSERT INTO tbNews(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
            }
        });
    });
});
router.get('/noticias', (req, res, next) => {
    knex('tbNews').where({ tipoConteudo: 1 }).then((dados)=>{
        console.log(dados)
        res.send(dados);
    }, next)
});
router.get('/cursos', (req, res, next) => {
    // let urlChamada = config.urlWordPressAmazon + config.expressaoCursos
    // got(urlChamada, {
    //         json: true
    //     })
    //     .then(response => {
    //         console.log({
    //             "response": response.body
    //         });
    //         res.send(response.body);
    //     })
    //     .catch(error => {
    //         console.log(error.response);
    //     })
    knex('tbNews').where({ tipoConteudo: 2 }).then((dados)=>{
        console.log(dados)
        res.send(dados);
    }, next)
});

router.get('/eventos', (req, res, next) => {
    // let urlChamada = config.urlWordPressAmazon + config.expressaoEventos
    // got(urlChamada, {
    //         json: true
    //     })
    //     .then(response => {
    //         console.log({
    //             "response": response.body
    //         });
    //         res.send(response.body);
    //     })
    //     .catch(error => {
    //         console.log(error.response);
    //     });
    knex('tbNews').where({ tipoConteudo: 3 }).then((dados)=>{
        console.log(dados)
        res.send(dados);
    }, next)
});
router.get('/artigos', (req, res, next) => {
   
    knex('tbNews').where({ tipoConteudo: 4 }).then((dados)=>{
        console.log(dados)
        res.send(dados);
    }, next)
});

app.use('/', router);
app.listen(port);