## A user-friendly website that Property Owners and Real Estate Investors can use to filter properties and determine which ones will provide the best ROI. 

Primary tech stack
## `REACT Node.js Express.js Python`
 

Dependecies to install:
 
`cd real_estate`
## usually `npm install` will do the trick if not: 
`npm i -D react-router-dom@latest`

`npm i nodemon axios bcrypt cors express express-session cookie-parser mysql passport passport-local bulma react-scripts multer react-plotly.js plotly.js react-currency-input-field dotenv`

## `Python dependencies`:

`pip install requests pandas python3-dotenv`

To Run

## `cd real_estate`
## `npm start`

open a new terminal

## `cd real_estate`
## `npm run server`


## `DATABASE and BACKEND connection set up`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
You will need your own MySQL database. I've added the SQL tables structures in the root folder of this repo. Just import it into your environment.
Edit the .env file in the src folder, and fill in the fields:

REACT_APP_AXIOS_URL : This is for the HTTP client to send requests to Express (e.g http://localhost:3001 Backend IP)

REACT_APP_BASE_URL : This is for Express to allow the HTTP client to send requests (CORS) (e.g http://localhost:3000 Client IP)

DB_HOST : This is the MySQL server host name

DB_USER : This is the MySQL user name for the DB

DB_PASS : This is the MySQL password for the DB

DB : This is the DB name for the MySQL server, This should be named `RealEstate`

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
