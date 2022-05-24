const express = require ('express'); 
const app = express();
app.use (express.json());
app.use ('/artist', artistRouter)

app.get('/', (req, res) => {
    res.status(200).json({ result: "Hello World" });
});

module.exports = app;

