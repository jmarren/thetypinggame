
const jwt = require('jsonwebtoken'); // Assuming you're using the jsonwebtoken package
const pool = require('./db'); // Adjust the path to your database pool
const dotenv = require('dotenv');
// const cors = require('cors')
// dotenv.config();
// const cookieParser = require('cookie-parser');


const userAuthMiddleware = async (req, res, next) => {
    // console.log('USER AUTH MIDDLEWARE REQ.BODY: ', req.body);
    // console.log('USER AUTH MIDDLEWARE REQ.HEADERS: ', req.headers);
    // console.log('USER AUTH MIDDLEWARE REQ.COOKIES: ', req.cookies);
    // console.log('USER AUTH MIDDLEWARE TOKEN: ', req.cookies.token);
    try {
        // Retrieve the token from the cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Token is invalid, authorization denied.' });
        }

        // Query the database to get the user's information
        const userQuery = 'SELECT * FROM users WHERE user_id = $1';
        const user = await pool.query(userQuery, [decoded.user_id]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Add user information to the request object
        // console.log('user.rows[0]: ', user.rows[0])
        req.user = {
            id: user.rows[0].user_id,
            username: user.rows[0].username,
            // Add other user details as needed
        };
        // console.log('req.user: ', req.user)
        // console.log('AUTH MIDDLEWARE REQ.USER: ', req.user);

        next();
    } catch (error) {
        // console.error('Authentication error: ', error);
        res.status(401).json({ message: 'Authentication error.' });
    }
};

module.exports = userAuthMiddleware;


/*
const userAuthMiddleware = async (req, res, next) => {
    console.log('USER AUTH MIDDLEWARE REQ.BODY: ', req.body);
    console.log('USER AUTH MIDDLEWARE REQ.COOKIES: ', req.cookies);
    console.log('USER AUTH MIDDLEWARE TOKEN: ', req.cookies.token);
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Query the database to find the user by ID
      const userQuery = 'SELECT username FROM users WHERE user_id = $1';
      const user = await pool.query(userQuery, [decoded.user_id]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // Add the username to the request object
      req.user = user.rows[0].username;
  
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token.' });
    }
  };

  */

/*
const userAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log('USER AUTH MIDDLEWARE REQ.BODY: ', req.body);
    console.log('USER AUTH MIDDLEWARE REQ.COOKIES: ', req.cookies);
    console.log('USER AUTH MIDDLEWARE TOKEN: ', token);


    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            console.error('Token verification failed: UserId is undefined');
            return res.status(401).send({ error: 'Invalid token' });
        }

        try {
            const query = 'SELECT username FROM users WHERE user_id = $1';
            const { rows } = await pool.query(query, [userId]);

            if (rows.length === 0) {
                return res.status(404).send({ error: 'User not found' });
            }

            req.user = { userId, username: rows[0].username };
            next();
        } catch (dbError) {
            console.error('Database Error: ', dbError.message);
            return res.status(500).send({ error: 'Internal Database Error' });
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error('JWT Error: ', error.message);
            return res.status(401).send({ error: 'Invalid token' });
        } else if (error instanceof jwt.TokenExpiredError) {
            console.error('Token Expired Error: ', error.message);
            return res.status(401).send({ error: 'Token expired' });
        } else {
            console.error('Authentication Error: ', error.message);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    }
};

*/


/* 

const userAuthMiddleware = async (req, res, next) => {


    const token = req.cookies.token; // Or however you're passing the token
    console.log('req.body: ', req.body);
    console.log('token: ', token);
    console.log('req.cookies: ', req.cookies)

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key
        const userId = decoded.userId; // Assuming you've stored the user's ID as 'userId' in the token


        const query = 'SELECT username FROM users WHERE user_id = $1';
        const { rows } = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Add userId and username to req.body
        req.body.userId = userId;
        req.body.username = rows[0].username;

        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};


*/
module.exports = userAuthMiddleware;