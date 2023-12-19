const express = require('express');
const router = express.Router();
const { generateTypingText } = require('../utilities/textGenerator');


router.get('/assessments/:testName', (req, res) => {
    const { testName } = req.params;
    console.log('testName: ', testName)
    let chars;

    switch (testName) {
        case 'First Eight': 
            chars = 'asdfjkl;'
            break;
        case 'Home Row':
            chars = 'asdfjkl;gh'
            break;
        case 'Top Row':
            chars = 'qwertyuiop'
            break;
        case 'Bottom Row':
            chars = 'zxcvbnm,./'
            break;
        case 'All Letters': 
            chars = 'abcdefghijklmnopqrstuvwxyz'
            break; 
        case 'Numbers':
            chars = '1234567890'
            break;  
        case 'Symbols':
            chars = '!@#$%^&*()_+'
            break;
        case 'All':
            chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+'
            break;
        default:
            chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+' 
}


    const text = generateTypingText(chars, 200);
    res.json({ text });

})

router.get('/:characters/:length', (req, res) => {
    const { characters, length } = req.params;
    console.log('length: ', length)
    const text = generateTypingText(characters, length);
    res.json({ text });
})




module.exports = router;