
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userAuthMiddleware = require('./AuthMiddleware'); // Adjust the path

dotenv.config();

const app = express();
const port = 3004;
const saltRounds = 10;
const whitelist = ['http://localhost:3000', 'http://localhost:3000/layout1', 'http://localhost:3000/', 'http://localhost:3000/layout1/', 'http://localhost:3000/computer' ]


var corsOptions = {
	origin: function( origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
		    callback(null, true);
		} else  {
		    callback(new Error('Not allowed by CORS'));
		}
	},
    credentials: true,
};



app.use(cors(corsOptions));

// app.use(cors({
//     origin: '*', // Allow all origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Allow cookies to be sent
//     // other options...
//   }));


app.use(express.json());


app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// app.use(authMiddleware)



app.post('/test',  userAuthMiddleware,  (req, res) => {
    // console.log('test req.user: ', req.user);
    console.log('/TEST ROUTE, req.cookies: ', req.cookies);
    console.log('/TEST ROUTE, req.cookies.token: ', req.cookies.token);
    console.log('/TEST ROUTE, req.user: ', req.user)
    console.log('testing')
    res.json('testing');
})




//// CREATE ACCOUNT

app.post('/create-account', async (req, res) => {
	console.log(req.body)
	const { username, email, password } = req.body;
	// const hashedPassword = await bcrypt.hash(password, 10);
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	if (typeof hashedPassword !== 'string') {
		throw new Error('Failed to hash password');
	}

	try {
	  const newUser = await pool.query(
		'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
		[username, email, hashedPassword]
	  );
	  res.status(201).json(newUser.rows[0]);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send('Server error');
	}
  });


app.get('/verify-session', userAuthMiddleware,  async (req, res) => {
    console.log('Verify Session... req.user:',req.user);
    if (req.user) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            console.log('yes');
            res.status(200).json({validSession: true, username: req.user.username})
        } catch (error) {
            res.status(401).send('Session is not valid');
        }
    }
    else {
        res.status(401).send('No session found');
    }
})


// app.post('/')


app.get('/get-username-with-token', async (req, res) =>  {
    const token = req.cookies.token; // Or however you're passing the token
    console.log('req.cookies: ', req.cookies);
    console.log('req.cookies.token: ', req.cookies.token);

    if (!token) {
        throw new Error('No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key
        const userId = decoded.user_id; // Assuming you've stored the user's ID as 'userId' in the token

        console.log('decoded: ', decoded)
        console.log('userId: ', userId)


        const query = 'SELECT username FROM users WHERE user_id = $1';
        const { rows } = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ username: rows[0].username });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
} )




app.post('/login', async (req, res) => {
    console.log('login req.body: ', req.body);

    try {
      // 1. Validate User Input
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }
  
      // 2. Query Database
      const userQuery = 'SELECT * FROM users WHERE username = $1';
      const user = await pool.query(userQuery, [username]);
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // 3. Password Verification
      const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // 4. JWT Token Generation
      const token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      // 5. Set HTTP-Only Cookie
      res.cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 3600000 // 1 hour
      });
  
      res.json({ message: 'Logged in successfully.', username: user.rows[0].username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
/*
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = (await pool.query('SELECT * FROM users WHERE username = $1', [username])).rows[0];
        
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });

            // Set the token in a cookie
            res.cookie('token', token, { 
                httpOnly: true,
                // sameSite: 'strict',
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            // Send back the username along with the successful login message
            res.status(200).send({ message: 'Login successful', username: user.username });
        } else {
            res.status(401).send({ message: 'Invalid Username or Password' });
        }
    } catch (error) {
        console.error('Login error: ', error.message);
        res.status(500).send('Server Error');
    }
});
*/

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout Successful')
})




app.post('/submit-game', userAuthMiddleware, async (req, res) => {
    console.log('submit game req.body: ', req.body)
    try {
        const {userId, username, keyData, gameStats } = req.body;
        // const gameStats = keyStats.gameStats;
        // const keyData = keyStats.keyData;

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

        await pool.query('COMMIT');

        res.status(200).send('Game data saved successfully');

    } catch (error) {
        
        await pool.query('ROLLBACK');
        console.error('Error saving gamed data', error);
        res.status(500).send('error saving game data');

    }
})






app.listen(port, () => {
    console.log(`Typing Game Server listening on http://localhost:${port}`);
});
