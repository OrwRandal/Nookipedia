import chest from '../assets/chest.png'
import {Link} from "react-router-dom"
const NavBar = () => {
    return (
    <nav>
        <Link to="/">
            <h1>Nookipedia</h1>
        </Link>
        <Link to="/saved">
            <img src={chest}></img>
        </Link>
    </nav>)
}

export default NavBar;