require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3001;
const jwt = require('jsonwebtoken');
app.use(express.json());


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/recording/', function (req, res) {
    res.sendFile(path.join(__dirname + '/recording.html'));
});

router.get('/homework/', function (req, res) {
    res.sendFile(path.join(__dirname + '/homework.html'));
});

router.post('/get-valid-token/', function (req, res) {

	// If user is valid and logged in, return the jwt with your learncube user details

	const privateKey = process.env.privateKey || 'set private key in the .env file'
	const username = process.env.username || 'set username in .env file'
	const user_id = process.env.user_id || 'set user_id in .env file'
	const email = process.env.email || 'set email in .env file'

	const token = jwt.sign({
	  "exp": Math.floor(Date.now() / 1000) + (60 * 5),
	  "username": username, 
	  "user_id": user_id,
	  "email": email,
	}, privateKey, { algorithm: 'HS256' })

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ 'token': token }))
});

router.get('/content-library/', function (req, res) {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.end(JSON.stringify(files))
})

router.post('/content-library/premium/', function (req, res) {

	// this is not a real signed url.
	// It is up to you to return an authenticated url that is publicly available to all users in the classroom
	const signedUrl =  `${req.body.url}?key=12345678910&expires=${req.body.expires}`

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.end(JSON.stringify({ 'url': signedUrl }))
})

app.use('/', router);
app.listen(process.env.port || port)