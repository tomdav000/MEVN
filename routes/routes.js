const express = require('express');
const mongoose = require('mongoose');
const Game = require('../model/Game');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {auth} = require('../config/auth');

const router = express.Router();

router.get('/greet',(req,res)=>{
	res.send('SHALOM and HELLO')
});

router.get('/home',(req,res)=>{
	res.render('Home');
})

router.get('/login',(req,res)=>{
	res.render('Login');
})

router.get('/users',auth,async(req,res)=>{
	try{
		const users = await User.find();
		res.render('Users',{users:users});
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.get('/register',(req,res)=>{
	res.render('Register');
})

router.post('/register',async(req,res)=>{
	try{
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(newUser.password, salt);
		newUser.password = hash;
		await newUser.save();
		res.redirect('/api/games/login');
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.post('/login',(req,res,next)=>{
	try{
		passport.authenticate('local',{
			successRedirect:'/api/games/users',
			failureRedirect: '/api/games/login'
		})(req,res,next)
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available...')
	}
})

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/api/games/login');
})

router.get('/',async(req,res)=>{
	try{
		const games = await Game.find();
		res.send(games);
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.post('/',async(req,res)=>{
	try{
		let newGame = new Game({
			name: req.body.name,
			company: req.body.company,
			year: req.body.year
		});
		await newGame.save();
		res.redirect('/api/games/');
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.put('/:id',async(req,res)=>{
	try{
		let game = await Game.findByIdAndUpdate(req.params.id);
		game.name = req.body.name;
		game.company = req.body.company;
		game.year = req.body.year;
		await game.save();
		res.redirect('/api/games/');
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.get('/:id',async(req,res)=>{
	try{
		const game = await Game.findById(req.params.id);
		res.send(game);
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

router.delete('/:id',async(req,res)=>{
	try{
		const game = await Game.findByIdAndRemove(req.params.id);
		res.redirect('/api/games/')
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available..')
	}
})

module.exports = router;