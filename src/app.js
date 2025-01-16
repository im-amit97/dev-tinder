const express = require('express');

const app = express(); //instance of express

app.use("/hello", (req, res) => {
    res.send('This is Hello Api')
})

app.use('/', (req, res) => {
    res.send('Hello Node JS');
});

app.listen(7777, () => {
    console.log('Node server started on port 7777');
})