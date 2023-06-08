const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const multer = require('multer');
const path = require('path');
const spawn = require('child_process').spawn;
require('dotenv').config();
const app = express();
var zlib = require('zlib');


/************************** Use Statements***************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"))
app.use(expressSession({ secret: "mySecretKey", resave: false, saveUninitialized: false }));
app.use(cors({
    origin: process.env.REACT_APP_BASE_URL,
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
  const query = "INSERT INTO `RealEstate`.`listings` ( `id`, `zpid`, `price`, `city`, `state`, `zip`, `beds`, `imgSrc`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
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
          db.query(query, [id, req.body.zpid, req.body.price, req.body.city, req.body.state, req.body.zip_code, req.body.beds, req.body.imgSrc], (err, rows) => {
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

//THIS IS FOR THE DELETE
app.post('/api/delete_listing', (req, res) => {
  let id = req.cookies['user_id'];
  const query = "DELETE FROM `RealEstate`.`listings` where id = ? AND zpid = ?";
  const query2 = "SELECT * FROM RealEstate.accounts where id = ?";

  db.query(query2, [id], (err, rows) =>{

    if(err){console.log(err)};
    if(rows.length > 0){
      db.query(query, [id, req.body.zpid], (err, rows) => {
        if(err){throw err}
        res.send("Deleted");
        
      });

    }
    else{
      res.send("user not found!")
    }
  })

});


app.post('/api/listing_data', (req, res) => {
    var gunzip = zlib.createGunzip();            
    req.pipe(gunzip);
    var buffer = "";
    gunzip.on('data', function(data) {
      // decompression chunk ready, add it to the buffer
      buffer += data.toString();

    }).on("end", function() {
        listings = JSON.stringify(buffer);
        res.send("Decompressed data!");

    }).on("error", function(e) {
        res.send("Could not decompress the data");
        throw e;
    })
});


app.post("/api/images", upload.single('image'), (req, res) => {
  if (!req.file) {
      console.log("No file upload");
  } else {
    let id = req.cookies['user_id'];
    var imgsrc = process.env.REACT_APP_AXIOS_URL + '/images/' + req.file.filename
    var insertData = "UPDATE `RealEstate`.`accounts` SET imgSrc = ? where id = ?";
    db.query(insertData, [imgsrc, id], (err, result) => {
        if (err){throw err}
        res.send("Uploaded!");
    });
  }
});

app.post('/api/updateUserInfo', (req, res) => {
  
  let id = req.cookies['user_id'];
  const query2 = "SELECT * FROM RealEstate.accounts where id = ?";
  const query3 = "UPDATE `RealEstate`.`accounts` SET fname = ?, lname = ?, email = ?, phone_number = ? WHERE id = ?";

  db.query(query2, [id], (err, rows) =>{

    if(err){console.log(err)};

    if(rows.length > 0){

      db.query(query3, [req.body.fname, req.body.lname, req.body.email, req.body.phone, id], (err, rows) => {
        if (err) {console.log(err);}
        res.send("Updated account info");
      });

    }

  })

})

app.post('/api/calculate_mortgage', (req, res) => {
  let id = req.cookies['user_id'];
  console.log(id);
  var query = "SELECT email FROM `RealEstate`.`accounts` where id = ?";

  db.query(query, [id], (err, rows) => {
    if(err){console.log(err)}
    if(rows.length > 0){
      let email = rows[0].email;
      const pythonProcess = spawn('python3', 
      ['src/server/mortgage_calc.py', 
      req.body.state, 
      req.body.max, 
      req.body.beds, 
      req.body.baths, 
      req.body.homePrice, 
      req.body.downPayment, 
      req.body.propertyTax,
      req.body.insurancePrice,
      req.body.loanYears,
      req.body.interestRate,
      email
      ]);
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
    }
    else{
      res.send("No email found");
    }
  });

  

});

 




/************************** GET Statements***************************/


app.get('/api/saved_listings', (req, res) => {

  let id = req.cookies['user_id'];
  
  var query = "SELECT * FROM `RealEstate`.`listings` where id = ?";

  db.query(query, [id], (err, rows) => {
    if(err){console.log(err)}
    if(rows.length > 0){
      res.send(rows);
    }
    else{
      res.send("no user found.")
    }
  });

})


app.get('/api/return_listings', (req, res) => {

  res.send(listings);
  
})

app.post('/api/houses', (req, res) => {
  const pythonProcess = spawn('python3', ['src/server/script.py', req.body.state, req.body.zip]);
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

