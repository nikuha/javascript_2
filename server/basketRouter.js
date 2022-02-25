const express = require('express');
const handler = require('./handler');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/userBasket.json', 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'Ошибка загрузки корзины' });
            return;
        }
        res.send(data);
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userBasket.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'update', 'server/db/userBasket.json');
});

module.exports = router;
