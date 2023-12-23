const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const http = require('http');
// const WebSocket = require('ws');
const cors = require('cors');
const authenticate = require('./authenticate');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3001;
const saltRounds = 10;
const whitelist = ['http://localhost:3000/', 'http://localhost:3000/create-account', 'http://localhost:3000/login', 'http://localhost:3000', 'http://localhost:3000/test'  ]





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


var corsDebug = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all methods
    credentials: true, // Include credentials like cookies
    allowedHeaders: '*' // Allow all headers
}


// Middleware ==========================================================

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


// Express Routes ==========================================================


app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const {username, password} = req.body;

        const user = ( await pool.query('SELECT * FROM users WHERE username = $1',[username])).rows[0]
        
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({userId: user.id } , process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('token', token), { 
                httpOnly: true,
                // sameSite: 'strict',
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            }
            res.status(200).send('Login successful')
        } else {
            res.status(401).send({message: 'Invalid Username or Password'});
        }
    }
    catch (error) {
        console.error('Login error: ', error.message);
        res.status(500).send('Server Error');
    }
})
//-----------------------------------------------------------------------------------


app.get('/get-username-with-token', async (req, res) =>  {
    const token = req.cookies.token; // Or however you're passing the token

    if (!token) {
        throw new Error('No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key
        const userId = decoded.userId; // Assuming you've stored the user's ID as 'userId' in the token

        const query = 'SELECT username FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ username: rows[0].username });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
} )






app.post('/create-account', async (req, res) => {
    console.log(req.body)
    try {
     
        const {username, password, email} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        if (typeof hashedPassword !== 'string') {
            throw new Error('Failed to hash password');
        }

        const newUser = await pool.query( 
            'INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );

        res.json(newUser.rows[0]);
    
    } catch (error) {
        console.error('an error occurred while attempting to create an account: ', error.message)
        res.status(500).send('Server Error');
    }
})

app.post('/test', (req, res) => {
    console.log('testing')
    res.send('testing');
})




app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout Successful')
})


app.get('/verify-session', async (req, res) => {
    console.log(req.cookies);
    if (req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            res.status(200).send('Session is valid')
        } catch (error) {
            res.status(401).send('Session is not valid');
        }
    }
    else {
        res.status(401).send('No session found');
    }
})



app.listen(port, () => {
    console.log(`Streaming app listening at http://localhost:${port}`);
});
