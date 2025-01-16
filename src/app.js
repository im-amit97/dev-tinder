const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');

const app = express(); //instance of express

app.use('/admin', adminAuth);

app.get('/admin/all', (req, res) => {
    res.send('All Users');
});

app.delete('/admin/user', (req, res) => {
    res.send('Deleted');
});

app.get('/user', userAuth, (req, res) => {
    res.send('Fetched All User')
})

app.listen(8000, () => {
    console.log('Node server started on port 8000');
})