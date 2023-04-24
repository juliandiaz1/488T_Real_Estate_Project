const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport")
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const multer = require('multer')
const path = require('path');
const spawn = require('child_process').spawn;


const app = express();


/************************** Use Statements***************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"))
app.use(expressSession({ secret: "mySecretKey", resave: false, saveUninitialized: false }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Setting up multer middleware
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images');     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {

      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({
  storage: storage
});




let listings;

/************************** POST Statements***************************/
app.post('/api/signup', (req, res) => {
  
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



app.post('/api/login', (req, res, next) => {
    
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

  app.post('/api/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) { return next(err); }
        res.clearCookie('connect.sid', {path:'/'});
        res.clearCookie('user_id', {path:'/'});
        res.clearCookie('user_name', {path:'/'});
        res.send("Cookies cleared. Session destroyed!");
    });
  });



app.post('/api/userinfo', (req, res) => {
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

app.post('/api/getinfo', (req, res) => {
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

app.post('/api/add_listing', (req, res) => {
  let id = req.cookies['user_id'];
  const query = "INSERT INTO `RealEstate`.`listings` ( `id`, `zpid`, `price`, `city`, `state`, `zip`, `beds`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const query2 = "SELECT * FROM RealEstate.accounts where id = ?";
  const query3 = "SELECT * FROM RealEstate.listings where id = ? AND zpid = ?";

  db.query(query2, [id], (err, rows) =>{

    if(err){console.log(err)};
    if(rows.length > 0){
      
      db.query(query3, [id, req.body.zpid], (err, rows) => {
        if (err) {console.log(err);}
        if(rows.length > 0){
          res.send("Already added.");
        }
        else{
          db.query(query, [id, req.body.zpid, req.body.price, req.body.city, req.body.state, req.body.zip_code, req.body.beds], (err, rows) => {
            if (err) {console.log(err);}
            res.send("Listing added!");
          });
        }
        

      });

    }
    else{
      res.send("user not found!")
    }
  })

});

app.post('/api/listing_data', (req, res) => {
  listings = JSON.stringify(req.body);
  res.send("recieved data!");
});


//@type   POST
//route for post data
app.post("/api/images", upload.single('image'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
    let id = req.cookies['user_id'];
    console.log(req.file.filename)
    var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename
    var insertData = "UPDATE `RealEstate`.`accounts` SET imgSrc = ? where id = ?";
    db.query(insertData, [imgsrc, id], (err, result) => {
        if (err) throw err
        if(result.length > 0){
          console.log("File uploaded.");
        }
    });
  }
});



/************************** GET Statements***************************/

app.get('/api/return_listings', (req, res) => {
  
  res.send(listings);
  
})

app.post('/api/houses', (req, res) => {
  const pythonProcess = spawn('python3', ['src/server/script.py', req.body.state]);
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

app.get('/api/get_account', (req, res) => {
  let id = req.cookies['user_id'];
  let query = "SELECT * FROM accounts where id= ?";
  db.query(query, [id], (err, rows) => {
    
    if(err){console.log(err)};
    if(rows.length > 0){
      
      res.send(rows[0]);
    }
    else{
      res.send("No user found");
    }
  })
});


/************************** App listener ***************************/

app.listen(3001, () =>{
    console.log("Server is running");
});

