const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const Address = require('../models/Address');

router.post('/register', function(req, res) {

	const { errors, isValid } = validateRegisterInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if(user) {
			return res.status(400).json({
				email: 'Email already exists'
			});
		}
		else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				isAdmin: req.body.isAdmin
			});
			
			bcrypt.genSalt(10, (err, salt) => {
				if(err) console.error('There was an error', err);
				else {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) console.error('There was an error', err);
						else {
							newUser.password = hash;
							newUser
							.save()
							.then(user => {
								res.json(user)
							}); 
						}
					});
				}
			});
		}
	});
});

router.post('/login', (req, res) => {

	const { errors, isValid } = validateLoginInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email})
	.then(user => {
		if(!user) {
			errors.email = 'User not found'
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
					isAdmin: user.isAdmin
				}
				jwt.sign(payload, 'secret', {
					expiresIn: 3600
				}, (err, token) => {
					if(err) console.error('There is some error in token', err);
					else {
						res.json({
							success: true,
							token: `Bearer ${token}`
						});
					}
				});
			}
			else {
				errors.password = 'Incorrect Password';
				return res.status(400).json(errors);
			}
		});
	});
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
	return res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		isAdmin: req.user.isAdmin
	});
});

router.get('/allusers', passport.authenticate('jwt', { session: false }), async (req, res) => {
	if(req.user.isAdmin) {
		var users = await User.find({ })
		return res.status(200).json(users);
	}
	return res.status(200).json([]);
});

router.get('/address', passport.authenticate('jwt', { session: false }), async (req, res) => {
	var address = await Address.findOne({ user_id: req.user.id });
	return res.status(200).json(address);
});

router.post('/regaddr', passport.authenticate('jwt', { session: false }), async (req, res) => {
	var address = await Address.findOne({ user_id: req.user })
	if(address) {
		address["street"] = req.body.street;
		address["address1"] = req.body.address1;
		address["address2"] = req.body.address2;
		address["suburb"] = req.body.suburb;
		address["town"] = req.body.town;
		Address.updateOne({ user_id: req.user }, {$set: {
			street: req.body.street,
			address1: req.body.address1,
			address2: req.body.address2,
			suburb: req.body.suburb,
			town: req.body.town
		}})
		.then((address)=>{ return res.status(200).send({ _id: address._id }); });
	} else {
		const newAddress = new Address({
			street: req.body.street,
			address1: req.body.address1,
			address2: req.body.address2,
			suburb: req.body.suburb,
			town: req.body.town,
			user_id: req.user
		});

		newAddress.save()
		.then(address => {
			return res.status(200).send({ _id: newAddress._id });
		});
	}
	return res.status(500);
});

module.exports = router;