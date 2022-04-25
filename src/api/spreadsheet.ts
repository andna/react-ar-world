const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./clients_secret.json');

async function accessSpreadsheet() {
   const doc = new GoogleSpreadsheet('1gNkkyuaKcyXsOTpLx87rgpb3MPZEBAQLMJ04fRAV_kM');
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    const rows = await sheet.getRows();
    return({headerValues: sheet.headerValues, rows: rows})
}

const express = require('express')
const app = express()
const port = 3000


app.get('/island-info', async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        const data = await accessSpreadsheet()
        let toRender = [];
        if (data.rows && data.headerValues) {
            data.rows.forEach((row) => {
                let toPush = {};
                data.headerValues.forEach((header) => {
                   toPush[header] = row[header]
                })
                toRender.push(toPush);
            })
        }
        res.send(toRender)
    } catch (e) {
        res.end(e.message || e.toString());
    }
})

app.listen(port, () => {
    console.log('ready')
})
