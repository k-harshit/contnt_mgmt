const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/create-blog', (req, res) => {
    const { content } = req.body;

    // Store the blog content in your database or file system here
    // You can use a database like MongoDB or a file storage system

    res.sendStatus(200); // Send a success status code
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
