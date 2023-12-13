const express = require('express');
const router = express.Router();
const { generateTypingText } = require('../utilities/textGenerator');



router.get('/text/:characters/:length', (req, res) => {
    const { characters, length } = req.params;
    console.log('length: ', length)
    const text = generateTypingText(characters, length);
    res.json({ text });
})



module.exports = router;