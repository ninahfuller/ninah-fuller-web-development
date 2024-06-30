const express = require('express');

const bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');

const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//middleware for parsing JSON in request body
app.use(express.json());

app.get('/', (request, response) => {

	response.render('contact', { errors : '' });

});

app.post('/send', 
	[
		check('name').notEmpty().withMessage('Name is required'),
		check('email').isEmail().withMessage('Invalid Email Address'),
		check('subject').notEmpty().withMessage('Subject is required'),
		check('message').notEmpty().withMessage('Message is required')
	], (request, response) => {

		const errors = validationResult(request);

		if(!errors.isEmpty())
		{
			response.render('contact', { errors : errors.mapped() });
		}
		else
		{
			const transporter = nodemailer.createTransport({
				service : 'Gmail',
				auth : {
					user : 'fullerninah@gmail.com',
					pass : 'NPooh2000'
				}
			});

			const mail_option = {
				from : request.body.email,
				to : 'fullerninah@gmail.com',
				subject : request.body.subject,
				text : request.body.message
			};

			transporter.sendMail(mail_option, (error, info) => {
				if(error)
				{
					console.log(error);
				}
				else
				{
					response.redirect('/success');
				}
			});
		}
});

app.get('/success', (request, response) => {

	response.send('<h1>Your Message was Successfully Send!</h1>');

});

//start server
app.listen(3000, () => {

	console.log('Server started on port 3000');

});