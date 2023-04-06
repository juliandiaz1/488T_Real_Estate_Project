import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Houses from "./pages/Houses";
import About from "./pages/About";
import logo from "./images/logo.png"

function App() {

    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src={logo} alt="site logo"/>
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Home</Link>
                </div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/houses">Houses</Link>
                </div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/about">About</Link>
                </div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/account">Account</Link>
                </div>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/account" element={<Account />}/>
            <Route path="/houses" element={<Houses />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
        </>
    )
}

export default App;