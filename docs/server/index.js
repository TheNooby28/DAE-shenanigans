require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000

app.use(cors());

app.get('/quote', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log(`Sending quote to IP: ${ip}`)

        const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        });
        res.json(response.data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch quote'});
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});