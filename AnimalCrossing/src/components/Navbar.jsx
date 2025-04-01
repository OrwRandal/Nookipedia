import chest from '../assets/chest.png';
import {Link} from "react-router-dom";
import DarkMode from './DarkMode';
const NavBar = () => {
    return (
    <nav>
        <Link to="/">
            <h1>Nookipedia</h1>
        </Link>
        <div id="navRight">
        <DarkMode />
            <Link to="/saved">
                <img src={chest}></img>
            </Link>
            
        </div>
    </nav>)
}

export default NavBar;