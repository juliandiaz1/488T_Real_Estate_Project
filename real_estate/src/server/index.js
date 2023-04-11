const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport")
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const { redirect } = require("react-router-dom");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: "mySecretKey", resave: false, saveUninitialized: false }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);



app.post('/signup', (req, res) => {
  
    const query = "INSERT INTO `RealEstate`.`users` (`username`, `password`) VALUES (?,?)";
    const query2 = "SELECT * FROM RealEstate.users where username = ?";
  
    db.query(query2, [req.body.username] ,async (err, rows) => {
      if (err) {console.log(err);}
      if (rows.length > 0) {res.send("User already exists");}
      if (rows.length === 0) {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);
        db.query(query, [req.body.username, hashedPassword], (err, rows) => {
          if (err) {console.log(err);}
          res.send("User created");
        });
      }
    })
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { 
      if (err) {console.log(err);}
      if (!user) {res.send("User not found");}
      if (user) {
        req.login(user, (err) => {
          if (err) {console.log(err);}
          res.send("User logged in");
          console.log(user);
        })
      }
      
    })(req, res, next);
     
  })



app.listen(3001, () =>{
    console.log("Server is running");
});