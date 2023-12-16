const pool = require('../db');


exports.submitGame = async (req, res) => {
    console.log('submit game req.body: ', req.body)
    try {
        const { keyData, gameStats, isAssessment, assessmentType } = req.body;
        const userId = req.user.id;
        const username = req.user.username;

        await pool.query('BEGIN');

        const insertGameText = `
        INSERT INTO games(user_id, total_characters, total_mistakes, total_time, words_per_minute, characters_per_second, game_date)
        VALUES($1, $2, $3, $4, $5, $6, NOW()) RETURNING game_id`;
        const gameValues = [
            userId, 
            gameStats.totalCharacters,
            gameStats.totalMistakes,
            gameStats.totalTime,
            gameStats.wordsPerMinute,
            gameStats.charactersPerSecond
        ];

        const gameInsertResult = await pool.query(insertGameText, gameValues);
        const gameId = gameInsertResult.rows[0].game_id; 

        for (const [keyChar, stats] of Object.entries(keyData)) {
            const insertKeyStatsText  = `
            INSERT INTO game_key_stats(game_id, key_char, incorrect_count, total_count)
            VALUES($1, $2, $3, $4)`;

            const keyStatsValues = [
                gameId,
                keyChar,
                stats.incorrect,
                stats.total
            ];
            await pool.query(insertKeyStatsText, keyStatsValues);
        }

        // If the game is an assessment, insert a row into the assessments table
        if (isAssessment) {
            const insertAssessmentText = `
            INSERT INTO assessments(game_id, type)
            VALUES($1, $2)`;
            const assessmentValues = [gameId, assessmentType];
            await pool.query(insertAssessmentText, assessmentValues);
        }

        await pool.query('COMMIT');

        res.status(200).send('Game data saved successfully');

    } catch (error) {
        
        await pool.query('ROLLBACK');
        console.error('Error saving gamed data', error);
        res.status(500).send('error saving game data');

    }
};









// exports.submitGame = async (req, res) => {
//     console.log('submit game req.body: ', req.body)
//     // console.log('submit game req.user: ', req.user);
//     try {
//         const { keyData, gameStats } = req.body;
//         const userId = req.user.id;
//         const username = req.user.username;
//         // const gameStats = keyStats.gameStats;
//         // const keyData = keyStats.keyData;

//         await pool.query('BEGIN');

//         const insertGameText = `
//         INSERT INTO games(user_id, total_characters, total_mistakes, total_time, words_per_minute, characters_per_second, game_date)
//         VALUES($1, $2, $3, $4, $5, $6, NOW()) RETURNING game_id`;
//         const gameValues = [
//             userId, 
//             gameStats.totalCharacters,
//             gameStats.totalMistakes,
//             gameStats.totalTime,
//             gameStats.wordsPerMinute,
//             gameStats.charactersPerSecond
//         ];

//         const gameInsertResult = await pool.query(insertGameText, gameValues);
//         const gameId = gameInsertResult.rows[0].game_id; 

//         for (const [keyChar, stats] of Object.entries(keyData)) {
//             const insertKeyStatsText  = `
//             INSERT INTO game_key_stats(game_id, key_char, incorrect_count, total_count)
//             VALUES($1, $2, $3, $4)`;

//             const keyStatsValues = [
//                 gameId,
//                 keyChar,
//                 stats.incorrect,
//                 stats.total
//             ];
//             await pool.query(insertKeyStatsText, keyStatsValues);
//         }

//         await pool.query('COMMIT');

//         res.status(200).send('Game data saved successfully');

//     } catch (error) {
        
//         await pool.query('ROLLBACK');
//         console.error('Error saving gamed data', error);
//         res.status(500).send('error saving game data');

//     }
    

// };