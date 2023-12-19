
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userAuthMiddleware = require('./AuthMiddleware'); 
const {createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const gameStatsRoutes = require('./routes/gameStats');
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');
const textRoutes = require('./routes/text');
const leaderboardRoutes = require('./routes/leaderboard');


dotenv.config();

const app = express();
const port = 3004;
const saltRounds = 10;
const whitelist = ['http://localhost:3000', 'http://localhost:3000/layout1', 'http://localhost:3000/', 'http://localhost:3000/layout1/', 'http://localhost:3000/computer', 'http://localhost:3000/layout2' ]


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

app.use(express.json());


app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/game-stats', gameStatsRoutes);
app.use('/games', gameRoutes);
app.use('/text', textRoutes)
app.use('/leaderboard', leaderboardRoutes);


app.post('/test', userAuthMiddleware, (req, res) => {
    console.log('test req.user: ', req.user);
    console.log('/TEST ROUTE, req.cookies: ', req.cookies);
    console.log('/TEST ROUTE, req.cookies.token: ', req.cookies.token);
    console.log('/TEST ROUTE, req.user: ', req.user)
    console.log('testing')
    res.json('testing');
})



app.listen(port, () => {
    console.log(`Typing Game Server listening on http://localhost:${port}`);
});







// app.use('/genius-api', createProxyMiddleware({
//     target: `https://api.lyrics.ovh`,
//     changeOrigin: true,
//     logLevel: 'debug', // Enable logging
//     onError: function(err, req, res) {
//         console.error('Error occurred while trying to proxy:', err);
//       },
//   }));

// app.get('/poem-titles', async (req, res) => {
//     try {
//         const response = await axios.get(`https://poetrydb.org/author/${req.author}`);
//         const poems = response.data;

//         // Assuming each poem object has a 'title' property
//         const titles = poems.map(poem => poem.title);

//         res.json(titles);
//     } catch (error) {
//         console.error('Error fetching poems:', error);
//         res.status(500).send('Error fetching poem titles');
//     }
// });







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