import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Houses from "./pages/Houses";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import logo from "./images/My_project.png";
import './styles/Navbar.css';
import UserForm from "./pages/UserForm";
import axios from "axios";
import SavedListing from "./pages/SavedListing";
import Graphs from "./pages/Graphs";

const axiosInstance = axios.create({
  
    baseURL: process.env.REACT_APP_AXIOS_URL,
    withCredentials: true,
  
  });
  

export default function App() {
    

    const [ loginStatus, setLoginStatus ] = useState(false);
    const [ userName, setUserName ] = useState("Guest");
    
    const check_cookie= () =>{
        let cookies = document.cookie;
        let cookieArr = cookies.split(";");
        for(var i = 0; i < cookieArr.length; ++i){
            var temp = cookieArr[i].split("=");
            if(temp[0] === " user_name" && temp[1].length > 0){
                setLoginStatus(true);
                setUserName(temp[1]);
            }
        }
    }
    

    const handleLoginLogout = () => {
        if(loginStatus){
            axiosInstance.post('/api/logout', {

            }).then(res => {document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });window.location = '/login'}).catch(err => {console.log(err)});
        }
        else{
            window.location = "/login";
        }
       
        
    }

    const handleSignUp = () => {
        if(!loginStatus){
            window.location = "/signup";
        }
        
        
    }

    useEffect(() => {
        check_cookie();
    }, []);

    return (
        <>
        <nav className="navbar is-transparent">
            <div className="navbar-brand">
                <a className="navbar-item" href={process.env.REACT_APP_BASE_URL}>
                    <img id="logo" src={logo} alt="site logo"/>
                </a>
            </div>
            <div className="navbar-menu is-spaced" >
                <div className="navbar-end" id="navlinks">
                    
                    <Link className="navbar-item" id="homelink" to="/">Home</Link>
                    <Link className="navbar-item" id="houseslink" to={loginStatus ? "/houses" : "/login"}>Houses</Link>
                    <Link className="navbar-item" id="aboutlink" to="/about">About</Link>
                    <Link className="navbar-item" id="accountlink" to={loginStatus ? "/account" : "/login"}>Account</Link>
                    <Link className="navbar-item" id="aboutlink" to="/graphs">Graphs</Link>
                    <div className="nav-dot"></div>
                    
                </div>
                <div className="navbar-end">
                    <div className="buttons">
                        <Link className="button is-link" onClick={handleSignUp}>
                            <strong>{loginStatus ? "Hello, " + userName : "Sign up"}</strong>
                        </Link>
                        <Link className="button is-light" onClick={handleLoginLogout}>
                            {loginStatus ? "Log out": "Log in"}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<Home />}/>
            
            <Route path="account/*" element={<Account />}>
                <Route path="account/SavedListing" element={<SavedListing />} />
            </Route>
            <Route path="/houses" element={<Houses />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/graphs" element={<Graphs />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/userform" element={<UserForm />}/>
        </Routes>
        </>
    )
}

