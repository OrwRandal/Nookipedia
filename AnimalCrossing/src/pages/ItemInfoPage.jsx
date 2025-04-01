import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import API_KEY from "../config"
import { useContext } from 'react';
import MyContext from '../context/MyContext';
const ItemInfoPage = () => {
    const {paths} = useContext(MyContext)
    const {category, name,id} = useParams();
    const [item, setItem] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const doFetch = async () =>{
            const options = {
                    headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY
                }
            }
            const url = category !== "villagers"? `https://api.nookipedia.com${paths[category]}/${encodeURIComponent(name)}`
            :`https://api.nookipedia.com${paths[category]}?name=${encodeURIComponent(name)}`;
            console.log(url)
            const response = await fetch(url, options);
            const data = await response.json();

            if(data.length === 0) navigate('/browse');

            if(category === "villagers"){
                if(data.length > 1){
                    setItem(data.find((element) => {
                        return element.id === (id || "")})
                    );
                } else {
                    setItem(data[0]);
                }
            } else {
                setItem(data);
            };
            console.log(data)
        }
        doFetch();
    }, [category, name, id])
    return (
        <>
            <h1>{item?.name}</h1>
            <img src={item?.image_url}></img>
        </>
    )
}

export default ItemInfoPage;