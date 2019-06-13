const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
// Create the Express-Next App
const app = next({ dev })
const handle = app.getRequestHandler()

if(typeof require !== 'undefined') XLSX = require('xlsx');
var inventory = XLSX.readFile('./SampleInventory.xlsx');

var merchSheet = inventory.Sheets['Merchandise'];
var snacksSheet = inventory.Sheets['Snacks'];
var drinksSheet = inventory.Sheets['Drinks'];
var frozenSheet = inventory.Sheets['Frozen'];

var records = XLSX.readFile('./Records.xlsx');

var recSheet = records.Sheets['Sheet1'];
console.log(recSheet);

//Start the app
app.prepare()
//Start Express server and serve the 
.then(() => {
    const server = express()
    server.get('/MerchJson', (req, res) => {
        const merchJSON = XLSX.utils.sheet_to_json(merchSheet)
        res.send(merchJSON)
        res.end()
        return res;
    })
    server.get('/SnacksJson', (req, res) => {
        const snacksJSON = XLSX.utils.sheet_to_json(snacksSheet)
        res.send(snacksJSON)
        res.end()
        return res;
    })
    server.get('/DrinksJson', (req, res) => {
        const drinksJSON = XLSX.utils.sheet_to_json(drinksSheet)
        res.send(drinksJSON)
        res.end()
        return res;
    })
    server.get('/FrozenJson', (req, res) => {
        const frozenJSON = XLSX.utils.sheet_to_json(frozenSheet)
        res.send(frozenJSON)
        res.end()
        return res;
    })
    server.get('/RecordsJson', (req, res) => {
        const recordsJSON = XLSX.utils.sheet_to_json(recSheet)
        res.send(recordsJSON)
        res.end()
        return res;
    })
    server.get('*', (req, res) => {
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