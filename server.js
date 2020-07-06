const express = require('express')
const next = require('next')
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production'
// Create the Express-Next App
const app = next({ dev })
const handle = app.getRequestHandler()


const bodyParser = require('body-parser');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var inventory = XLSX.readFile('./Inventory.xlsx');


var records = XLSX.readFile('./CurrentWeekAccounts.xlsx');

var recSheet = records.Sheets['Sheet1'];


function chargeBalance(name, amount) {
    var balJson = XLSX.utils.sheet_to_json(recSheet);
    var found = false;
    var cabin = 0;
    var cohort = "unknown";
    balJson.forEach(account =>{
        if (name === account.Name) {
            found = true;
            cabin = account.Cabin;
            cohort = account.Cohort;
            account.Spent += amount;
            account.Balance -= amount;
        }
    })

    records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(balJson);
    recSheet = records.Sheets['Sheet1'];

    XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');
    

    // return found;
    return {
        found: found,
        cabin: cabin,
        cohort: cohort
    };
}

function decrementInventories(transactionItems) {
    var outOfStockArr = [];
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
                if (inventoryItem.Stock < 0) {
                    outOfStockArr.push(inventoryItem.Name);
                }
            }
        })
    })
    inventory.Sheets['Merchandise'] = XLSX.utils.json_to_sheet(merchJson);
    inventory.Sheets['Snacks'] = XLSX.utils.json_to_sheet(snacksJson);
    inventory.Sheets['Drinks'] = XLSX.utils.json_to_sheet(drinksJson);
    inventory.Sheets['Frozen'] = XLSX.utils.json_to_sheet(frozenJson);

    XLSX.writeFile(inventory, 'Inventory.xlsx');
    return outOfStockArr;
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
        const camperInfo = chargeBalance(req.body.name, req.body.price);
        const outOfStock = decrementInventories(req.body.items);
        res.send({"found": camperInfo.found, "outOfStock": outOfStock});
        var output = req.body.name + " (Cabin " + camperInfo.cabin + " " + camperInfo.cohort + ") - $" + req.body.price + " [ ";
        req.body.items.forEach(i => {
            output += i.item + ", "
        })
        output += "]\n";
        console.log(output);
        const out_filename = camperInfo.cohort + "_orders.txt";
        fs.appendFile(out_filename, output, function (err) {
            if (err) throw err;
            // console.log('Success!');
        });
        res.end();
        return res;
    })

    // Add account to CurrentWeekAccounts spreadsheet
    server.post('/NewAccount', (req, res) => {
        var recJson = XLSX.utils.sheet_to_json(recSheet);
        recJson.push({ Name: req.body.name, Deposited: req.body.balance, Spent: 0, Balance: req.body.balance });
        records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(recJson);
        recSheet = records.Sheets['Sheet1'];
        XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');
        res.send({"name": req.body.name, "balance": req.body.balance});
        res.end();
        return res;
    })

    // Increase balance of account in CurrentWeekAccounts spreadsheet
    server.post('/CreditAccount', (req, res) => {
        var recJson = XLSX.utils.sheet_to_json(recSheet);
        var found = false;
        recJson.forEach(account => {
            if (req.body.name === account.Name) {
                found = true;
                account.Deposited += req.body.amount;
                account.Balance += req.body.amount;
            }
        })

        records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(recJson);
        recSheet = records.Sheets['Sheet1'];
        XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');
        res.send({"name": req.body.name, "amount": req.body.amount, "success": found});
        res.end();
        return res;
    })

    server.listen(3001, (err) => {
        if (err) throw err
        console.log('> Ready on http://192.168.1.16:3001')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})