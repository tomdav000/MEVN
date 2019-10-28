const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db').MongoDB;
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const app = express();

require('./config/passport')(passport)
mongoose.connect(db,{useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
	.then(console.log('DB connected...'))
	.catch(err=>console.log('DB not connected...',err));

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(session({
	secret:'123abc',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/games/',require('./routes/routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`live on port ${PORT}`))