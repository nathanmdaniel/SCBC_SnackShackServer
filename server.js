const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
// Create the Express-Next App
const app = next({ dev })
const handle = app.getRequestHandler()
const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'transaction-log.txt');


const bodyParser = require('body-parser');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var inventory = XLSX.readFile('./Inventory.xlsx');


var records = XLSX.readFile('./CurrentWeekAccounts.xlsx');

var recSheet = records.Sheets['Sheet1'];


function logTransaction(logEntry) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const line = `${timestamp} CT | ${logEntry}\n`;
  fs.appendFile(logFile, line, err => {
    if (err) console.error('Failed to write transaction log:', err);
  });
}

function chargeBalance(name, amount) {
    var newBalance = null;
    var balJson = XLSX.utils.sheet_to_json(recSheet);
    for (const account of balJson) {
        if (name === account.Name) {
            account.Spent += amount;
            account.Balance -= amount;
            newBalance = account.Balance;
            break;
        }
    }

    records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(balJson);
    recSheet = records.Sheets['Sheet1'];

    XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');
    return newBalance;
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

    XLSX.writeFile(inventory, 'Inventory.xlsx');
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
        var newBalance = chargeBalance(req.body.name, req.body.price);
        decrementInventories(req.body.items);

        if (newBalance !== null) {
            logTransaction(`PURCHASE | name: ${req.body.name} | items: ${JSON.stringify(req.body.items)} | charged: ${req.body.price} | newBalance: ${newBalance}`);
        }
        else {
            logTransaction(`PURCHASE FAILED | name: ${req.body.name} | items: ${JSON.stringify(req.body.items)} | charged: ${req.body.price}`);
        }

        res.end();
        return res;
    })

    // Add account to CurrentWeekAccounts spreadsheet
    server.post('/NewAccount', (req, res) => {
        // Log: { date; "ACCOUNT CREATED"; name: req.body.name, balance: req.body.balance }
        logTransaction(`ACCOUNT CREATED | name: ${req.body.name} | balance: ${req.body.balance}`);
        var recJson = XLSX.utils.sheet_to_json(recSheet);
        recJson.push({ Name: req.body.name, Deposited: req.body.balance, Spent: 0, Balance: req.body.balance });
        records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(recJson);
        recSheet = records.Sheets['Sheet1'];
        XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');

        res.end();
        return res;
    })

    // Increase balance of account in CurrentWeekAccounts spreadsheet
    server.post('/CreditAccount', (req, res) => {
        var newBalance = null;
        var recJson = XLSX.utils.sheet_to_json(recSheet);
        
        for (const account of recJson) {
            if (req.body.name === account.Name) {
                account.Deposited += req.body.amount;
                account.Balance += req.body.amount;
                newBalance = account.Balance;
                break;
            }
        }

        if (newBalance !== null) {
            logTransaction(`ACCOUNT CREDITED | name: ${req.body.name} | amountAdded: ${req.body.amount} | newBalance: ${newBalance}`);
        }
        else {
            logTransaction(`FAILED TO CREDIT ACCOUNT | name: ${req.body.name} | amountAttemptedToAdd: ${req.body.amount}`);
        }

        records.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(recJson);
        recSheet = records.Sheets['Sheet1'];
        XLSX.writeFile(records, 'CurrentWeekAccounts.xlsx');

        res.end();
        return res;
    })

    server.listen(3001, (err) => {
        if (err) throw err
        console.log('> Server ready (typically on http://192.168.1.2:3001)')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})