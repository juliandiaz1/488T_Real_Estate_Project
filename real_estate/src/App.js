import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Houses from "./pages/Houses";
import About from "./pages/About";

function App() {

    return (
        <>
        <nav class="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/houses">Houses</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/account">Account</Link>
                </li>
            </ul>
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