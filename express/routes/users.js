const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const userAuthMiddleware = require('../AuthMiddleware');


router.post('/create-account', async (req, res) => {
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

router.post('/login', async (req, res) => {
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
  
      res.json({ message: 'Logged in successfully.', username: user.rows[0].username, email: user.rows[0].email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout Successful')
});

router.get('/verify-session', userAuthMiddleware, async (req, res) => {
    console.log('Verify Session... req.user:',req.user);
    if (req.user) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            console.log('yes');
            res.status(200).json({validSession: true, username: req.user.username, email: req.user.email})
        } catch (error) {
            res.status(401).send('Session is not valid');
        }
    }
    else {
        res.status(401).send('No session found');
    }
});

router.get('/get-username-with-token', async (req, res) => {
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


        const query = 'SELECT username, email FROM users WHERE user_id = $1';
        const { rows } = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ username: rows[0].username, email: rows[0].email });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
});






router.get('/date-account-created/:username', async (req, res) => { 
  const { username } = req.params;
  const query = `
      SELECT 
          created_at
      FROM 
          users
      WHERE 
          username = $1;
  `;

  const result = await pool.query(query, [username]); 
  res.json(result.rows[0]);
  
})






module.exports = router;