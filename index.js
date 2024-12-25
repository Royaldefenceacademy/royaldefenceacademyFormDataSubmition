const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello server');
});

app.post('/send-data', async (req, res) => {
    try {
        const formData = req.body; // Extract data from the request body
        const response = await axios.post('http://3.110.189.42:8000/enquiry/', formData, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            res.status(200).json({
                status:true,
                message:"data send"
            })
        } else {
            console.error('Error:', response.statusText);
            res.status(400).send('Failed to send data',response.error);
        }
    } catch (e) {
        console.error('Error:', e);
        res.status(500).send('Internal server error');
    }
});
module.exports = app;