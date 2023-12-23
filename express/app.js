
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
const whitelist = ['http://localhost:3000', 'http://localhost:3000/layout1', 'http://localhost:3000/', 'http://localhost:3000/layout1/', 'http://localhost:3000/computer', 'http://localhost:3000/layout2', 'http://mechanicalturk.one', 'mechanicalturk.one', 'https://mechanicalturk.one','https://mechanicalturk.one/layout2', 'http://localhost:3000/'
 , '207.181.194.238', 'localhost:3000']


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

app.get('/', (req, res) => {
    res.send('Typing Game Server');
})

app.use('/user', userRoutes);
app.use('/game-stats', gameStatsRoutes);
app.use('/games', gameRoutes);
app.use('/text', textRoutes)
app.use('/leaderboard', leaderboardRoutes);


app.post('/test',  (req, res) => {
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
