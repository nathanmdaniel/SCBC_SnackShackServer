const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
// Create the Express-Next App
const app = next({ dev })
const handle = app.getRequestHandler()


const bodyParser = require('body-parser');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var inventory = XLSX.readFile('./SampleInventory.xlsx');

/*
var merchSheet = inventory.Sheets['Merchandise'];
var snacksSheet = inventory.Sheets['Snacks'];
var drinksSheet = inventory.Sheets['Drinks'];
var frozenSheet = inventory.Sheets['Frozen'];
*/

var records = XLSX.readFile('./Records.xlsx');

var recSheet = records.Sheets['Sheet1'];


function chargeBalance(name, amount) {
    var balJson = XLSX.utils.sheet_to_json(recSheet);
    //console.log("BEFORE    ", balJson);
    balJson.forEach(account =>{
        if (name === account.Name) {
            account.Spent += amount;
            account.Balance -= amount;
            // no break in JS foreach?
        }
    })
    //console.log("AFTER    ", balJson);

    records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(balJson);
    recSheet = records.Sheets['Sheet1'];

    XLSX.writeFile(records, 'Records.xlsx');
}

function decrementInventories(transactionItems) {
    var merchJson = XLSX.utils.sheet_to_json(inventory.Sheets['Merchandise']);
    var snacksJson = XLSX.utils.sheet_to_json(inventory.Sheets['Snacks']);
    var drinksJson = XLSX.utils.sheet_to_json(inventory.Sheets['Drinks']);
    var frozenJson = XLSX.utils.sheet_to_json(inventory.Sheets['Frozen']);
    var catJson = null;
    transactionItems.forEach(transactionItem => {
        switch (transactionItem.sheet) {
            case 'Merchandise':
                catJson = merchJson;
                break;
            case 'Snacks':
                catJson = snacksJson;
                break;
            case 'Drinks':
                catJson = drinksJson;
                break;
            case 'Frozen':
                catJson = frozenJson;
                break;
        }
        catJson.forEach(inventoryItem => {
            if (transactionItem.item === inventoryItem.Name) {
                --inventoryItem.Stock;
            }
        })
    })
    inventory.Sheets['Merchandise'] = XLSX.utils.json_to_sheet(merchJson);
    inventory.Sheets['Snacks'] = XLSX.utils.json_to_sheet(snacksJson);
    inventory.Sheets['Drinks'] = XLSX.utils.json_to_sheet(drinksJson);
    inventory.Sheets['Frozen'] = XLSX.utils.json_to_sheet(frozenJson);

    XLSX.writeFile(inventory, 'SampleInventory.xlsx');
}

//Start the app
app.prepare()
//Start Express server and serve the 
.then(() => {
    const server = express()
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('/MerchJson', (req, res) => {
        var merchSheet = inventory.Sheets['Merchandise'];
        const merchJSON = XLSX.utils.sheet_to_json(merchSheet)
        res.send(merchJSON)
        res.end()
        return res;
    })
    server.get('/SnacksJson', (req, res) => {
        var snacksSheet = inventory.Sheets['Snacks'];
        const snacksJSON = XLSX.utils.sheet_to_json(snacksSheet)
        res.send(snacksJSON)
        res.end()
        return res;
    })
    server.get('/DrinksJson', (req, res) => {
        var drinksSheet = inventory.Sheets['Drinks'];
        const drinksJSON = XLSX.utils.sheet_to_json(drinksSheet)
        res.send(drinksJSON)
        res.end()
        return res;
    })
    server.get('/FrozenJson', (req, res) => {
        var frozenSheet = inventory.Sheets['Frozen'];
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

    // Decrement Inventories & Account's Balance
    server.post('/DecInventories', (req, res) => {
        //console.log(req.body)
        chargeBalance(req.body.name, req.body.price);
        decrementInventories(req.body.items);
        res.end();
        return res;
    })

    // Add account to Records spreadsheet
    server.post('/NewAccount', (req, res) => {
        res.end();
        return res;
    })

    // Increase balance of account in Records spreadsheet
    server.post('/CreditAccount', (req, res) => {
        res.end();
        return res;
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