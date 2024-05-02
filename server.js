const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/azure-blob.js', (req, res) => {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
    fs.readFile(path.join(__dirname, 'public', 'azure-blob.js'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading azure-blob.js file', err);
            res.status(500).send('Server error');
            return;
        }
        const result = data.replace('const connectionString = "";', `const connectionString = "${connectionString}";`);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
