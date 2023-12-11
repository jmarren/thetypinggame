const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/user-accuracy/:username', async (req, res) => {
    console.log('user-accuracy route ')
    try {
        const { username } = req.params;
        const query = `
            SELECT 
                gks.key_char, 
                SUM(gks.total_count - gks.incorrect_count) / SUM(gks.total_count)::float AS accuracy
            FROM 
                game_key_stats gks
            JOIN 
                games g ON g.game_id = gks.game_id
            JOIN 
                users u ON u.user_id = g.user_id
            WHERE 
                u.username = $1
            GROUP BY 
                gks.key_char;
        `;
        const result = await pool.query(query, [username]);
        console.log('result.rows: ', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;