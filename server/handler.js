const basket = require('./basket');
const fs = require('fs');

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        let newBasket = basket[action](JSON.parse(data), req);
        fs.writeFile(file, newBasket, (err) => {
            if (err) {
                res.send({ result: 0, text: 'error' });
                return;
            }

            res.send({ result: 1, text: 'error' })
        })
    })
};

module.exports = handler;