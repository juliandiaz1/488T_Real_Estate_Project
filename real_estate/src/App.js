import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Houses from "./pages/Houses";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import logo from "./images/My_project.png";
import './styles/Navbar.css';



function App() {

    return (
        <>
        <nav className="navbar is-transparent">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img id="logo" src={logo} alt="site logo" height={"50px"}/>
                </a>
            </div>
            <div className="navbar-menu is-spaced" >
                <div className="navbar-end">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/houses">Houses</Link>
                    <Link className="navbar-item" to="/about">About</Link>
                    <Link className="navbar-item" to="/account">Account</Link>
                </div>
                <div className="navbar-end">
                    <div className="buttons">
                        <Link className="button is-link" to="/signup">
                            <strong>Sign up</strong>
                        </Link>
                        <Link className="button is-light" to="/login">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/houses" element={<Houses />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            
        </Routes>
        </>
    )
}

export default App;