import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user-model.js';


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//export default passport;
/*
hum export nahi kr rhe kyuki aise export krne se import of passport ambigious 
ho jayega, pta hi nahi chalega ki middlwares se passport le rhe ya npm package se
isliye hum export kiye bina hi directly import krlenge is middleware ko passport import krne se pehle
common middlewared file me,

passport is a singleton — once configured, it stays configured.
You never reassign or shadow the import name.
No ambiguity when importing.
*/