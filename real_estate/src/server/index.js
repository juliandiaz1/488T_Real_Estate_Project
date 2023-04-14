const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport")
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const spawn = require('child_process').spawn;


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

 let listings;

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
          res.cookie('user_id', user['id']);
          res.cookie('user_name', user['username']).send("User logged in");
        })
      }
      
    })(req, res, next);
     
  })

  app.post('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) { return next(err); }
        res.clearCookie('connect.sid', {path:'/'});
        res.clearCookie('user_id', {path:'/'});
        res.clearCookie('user_name', {path:'/'});
        res.send("Cookies cleared. Session destroyed!");
    });
  });



app.post('/userinfo', (req, res) => {
  let id = req.cookies['user_id'];
  const query = "INSERT INTO `RealEstate`.`accounts` ( `id`, `fname`, `lname`, `email`, `phone_number`) VALUES (?, ?, ?, ?, ?)";
  const query2 = "SELECT * FROM RealEstate.accounts where id = ?";
  const query3 = "UPDATE `RealEstate`.`accounts` SET ( `fname`, `lname`, `email`, `phone_number`) VALUES (?, ?, ?, ?) WHERE id = ?";
  db.query(query2, [id], (err, rows) =>{

    if(err){console.log(err)};

    if(rows.length > 0){

      db.query(query3, [req.body.fname, req.body.lname, req.body.email, req.body.phone_number, id], (err, rows) => {
        if (err) {console.log(err);}
        res.send("Updated account info");
      });

    }

    else{

      db.query(query, [id, req.body.fname, req.body.lname, req.body.email, req.body.phone_number], (err, rows) => {
        if (err) {console.log(err);}
        res.send("User info has been added.");
      });

    }
  })
 
})

app.post('/getinfo', (req, res) => {
  const query = "SELECT * FROM RealEstate.accounts where id = ?";
  
  db.query(query, [req.body.id], (err, rows) => {
    
    if(err){console.log(err)};
    if(rows.length > 0){
      
      res.send(rows[0]);
    }
    else{
      res.send("No User");
    }
  })
})

app.post('/listing_data', (req, res) => {

  listings = JSON.stringify(req.body);
  res.send("recieved data!");

})

app.get('/return_listings', (req, res) => {
  
  res.send(listings);
  
})

app.get('/houses', (req, res) => {
  const pythonProcess = spawn('python3', ['src/server/script.py']);
    var d = '';
    var e = '';

    pythonProcess.stdout.on('data', data => {
      d += data;
    });

    pythonProcess.stderr.on('data', data => {
      e += data;
    });

    pythonProcess.on('close', code => {
    res.json({ data: d, error: e });
      
    });
  
});

app.listen(3001, () =>{
    console.log("Server is running");
});

