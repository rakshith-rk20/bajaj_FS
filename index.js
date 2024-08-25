const express = require('express');
const findFreePort = require('find-free-port');
const app = express();
app.use(express.json());

// Serve the frontend
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "your_name_ddmmyyyy"; // replace with actual user_id
    const email = "your_email@college.com"; // replace with actual email
    const roll_number = "your_roll_number"; // replace with actual roll number

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet
    });
});

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server and find an available port
const DEFAULT_PORT = 3000;

findFreePort(DEFAULT_PORT, (err, freePort) => {
    if (err) {
        console.error('Error finding a free port:', err);
        process.exit(1);
    }

    app.listen(freePort, () => {
        console.log(`Server is running on port ${freePort}`);
    });
});
