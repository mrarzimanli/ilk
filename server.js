const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { DOMParser } = require('xmldom');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route to fetch currency data from CBAR
app.get('/api/currencies/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const url = `https://cbar.az/currencies/${date}.xml`;

        console.log(`Fetching currencies for date: ${date}`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();

        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const currencies = xmlDoc.getElementsByTagName('Valute');

        const currencyData = [];

        for (let i = 0; i < currencies.length; i++) {
            const currency = currencies[i];
            const code = currency.getAttribute('Code');
            const nominal = parseFloat(currency.getElementsByTagName('Nominal')[0].textContent);
            const value = parseFloat(currency.getElementsByTagName('Value')[0].textContent);
            const name = currency.getElementsByTagName('Name')[0].textContent;

            currencyData.push({
                code,
                name,
                nominal,
                value,
                rate: nominal / value // Rate in AZN
            });
        }

        res.json({
            success: true,
            date,
            currencies: currencyData
        });

    } catch (error) {
        console.error('Error fetching currency data:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Currency API server is running' });
});

app.listen(PORT, () => {
    console.log(`Currency API server running on http://localhost:${PORT}`);
});
