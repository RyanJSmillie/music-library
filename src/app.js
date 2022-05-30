const express = require ('express'); 
const app = express();
const artistRouter = require('./routes/artist');
app.use (express.json());
app.use ('/artist', artistRouter) // When a request is received to /artist, this re-routes it to the artist routes

app.get('/', (req, res) => {
    res.status(200).json({ result: "Hello World" });
});

module.exports = app;

