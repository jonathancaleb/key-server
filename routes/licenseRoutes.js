const express = require('express');
const router = express.Router();
const License = require('../models/License');


function generatePurchaseKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const keyLength = 12;
    const separator = '-';

    let key = '';
    for (let i = 0; i < keyLength; i++) {
        if (i > 0 && i % 4 === 0) {
            key += separator;
        }
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters.charAt(randomIndex);
    }

    return key;
}


router.get('/generate', (req, res) => {
    const newKey = generatePurchaseKey();
    res.json({ purchaseKey: newKey });
});


router.post('/validate', (req, res) => {
    try {
        const { purchaseKey } = req.body;
        const isValidKey = validateKey(purchaseKey);

        if (isValidKey) {
            res.json({ is_valid: true, result: { item: { id: purchaseKey } } });
        } else {
            res.json({ is_valid: false, result: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

function validateKey(key) {
    const pattern = /^([A-Z0-9]{4}-){2}[A-Z0-9]{4}$/;
    return pattern.test(key);
}


module.exports = router;
