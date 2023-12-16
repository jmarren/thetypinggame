const express = require('express');
const router = express.Router();
const { generateTypingText } = require('../utilities/textGenerator');


router.get('/assessments/:testName', (req, res) => {
    const { testName } = req.params;
    console.log('testName: ', testName)
    let chars;

    switch (testName) {
        case 'first-8': 
            chars = 'asdfjkl;'
            break;
        case 'home-row':
            chars = 'asdfjkl;gh'
            break;
        case 'top-row':
            chars = 'qwertyuiop'
            break;
        case 'bottom-row':
            chars = 'zxcvbnm,./'
            break;
        case 'all-letters': 
            chars = 'abcdefghijklmnopqrstuvwxyz'
            break; 
        case 'numbers':
            chars = '1234567890'
            break;  
        case 'symbols':
            chars = '!@#$%^&*()_+'
            break;
        case 'all':
            chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+'
            break;
        default:
            chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+' 
}


    const text = generateTypingText(chars, 250);
    res.json({ text });

})

router.get('/:characters/:length', (req, res) => {
    const { characters, length } = req.params;
    console.log('length: ', length)
    const text = generateTypingText(characters, length);
    res.json({ text });
})




module.exports = router;