const express = require('express');
const router = express.Router();
const pool = require('../db');





router.get('/', async (req, res) => {
    try {
        const query = `
        SELECT 
            assessments.type AS assessment_type,
            games.words_per_minute AS score, 
            users.username, 
            games.game_date
        FROM 
            assessments 
        JOIN 
            games ON assessments.game_id = games.game_id 
        JOIN 
            users ON games.user_id = users.user_id 
        ORDER BY 
            assessments.type,
            games.words_per_minute DESC`;

        const { rows } = await pool.query(query);

        // Group the results by assessment type
        const grouped = rows.reduce((acc, row) => {
            const { assessment_type, ...game } = row;
            if (!acc[assessment_type]) {
                acc[assessment_type] = [];
            }
            acc[assessment_type].push(game);
            return acc;
        }, {});

        res.json(grouped);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});





module.exports = router;







// router.get('/', async (req, res) => {
//     try {
//         const query = `
//         SELECT 
//             assessments.type AS assessment_type,
//             games.words_per_minute AS score, 
//             users.username, 
//             games.game_date
//         FROM 
//             assessments 
//         JOIN 
//             games ON assessments.game_id = games.game_id 
//         JOIN 
//             users ON games.user_id = users.user_id 
//         ORDER BY 
//             assessments.type,
//             games.words_per_minute DESC`;

//         const { rows } = await pool.query(query);
//         res.json(rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });
