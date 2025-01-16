const express = require('express');

const app = express(); //instance of express

app.get('/user', (req, res) => {
    res.send({
        'firstname': 'John',
        'lastname': 'Sena'
    })
});

app.patch('/user', (req, res) => {
    res.send({
        responseCode: 200,
        response: 'User updated Successfully'
    })
});

app.post('/user', (req, res) => {
    res.send({
        responseCode: 200,
        response: 'User Created Successfully'
    })
});

app.delete('user', (req, res) => {
    res.send({
        responseCode: 200,
        response: 'User Deleted Successfully'
    })
})

app.use("/hello", (req, res) => {
    res.send('This is Hello Api')
});

app.listen(8000, () => {
    console.log('Node server started on port 8000');
})