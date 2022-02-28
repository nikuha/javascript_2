const express = require('express');
const fs = require('fs');
const basketRouter = require('./basketRouter');

const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/basket', basketRouter);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        res.send(data);
    })
});

app.listen(3000, () => console.log('Server started....'));
