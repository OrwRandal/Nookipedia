import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import MyContext from "../context/MyContext";
const ItemCard = ({item, type}) => {
    const {selectedItem} = useContext(MyContext);
    const navigate = useNavigate();
    const cardClick = () => {
        navigate(`/info/${type}/${item.name}/${item.id || ""}`)
    }
    return (
        <div className="itemCard" onClick={cardClick}>
            <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
            <img className="cardImg" src={item.image_url}></img>
        </div>
    )
}

export default ItemCard;