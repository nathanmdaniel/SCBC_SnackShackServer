const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
// Create the Express-Next App
const app = next({ dev })
const handle = app.getRequestHandler()

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('./SampleInventory.xlsx');
//console.log(workbook);
var worksheet = workbook.Sheets['Merchandise'];
//console.log(worksheet);

//var path = require('./SampleInventory.xlsx');
//console.log(path);
//var workbook = XLSX.readFile('./SampleInventory.xlsx');
//console.log(workbook);

//Start the app
app.prepare()
//Start Express server and serve the 
.then(() => {
    const server = express()
    server.get('/json', (req, res) => {
        //console.log("recieved get from RegisterPage [server]")
        //console.log("****worksheet raw****")
        //console.log(worksheet)
        const wkshtJSON = XLSX.utils.sheet_to_json(worksheet)
        //console.log("****worksheet JSON****")
        //console.log(wkshtJSON)
        res.send(wkshtJSON)
        res.end()
        return res;
    })/*
    server.get('/', (req, res) => {
        console.log("recieved get from RegisterPage [server]")
        console.log("****worksheet raw****")
        console.log(worksheet)
        const wkshtJSON = XLSX.utils.sheet_to_json(worksheet)
        console.log("****worksheet JSON****")
        console.log(wkshtJSON)
        res.send(wkshtJSON)
        res.end()
        return res;
    })*/
    server.get('*', (req, res) => {
        console.log("in * server get")
        return handle(req, res)
    })
    server.listen(3001, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3001')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})