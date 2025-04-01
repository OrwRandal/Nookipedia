import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import API_KEY from "../config"
import { useContext } from 'react';
import MyContext from '../context/MyContext';
const ItemInfoPage = () => {
    const {paths, saved, setSaved} = useContext(MyContext)
    const {category, name,id} = useParams();
    const [item, setItem] = useState([])
    const navigate = useNavigate();

    const savedChecker = () => {
        return saved[category]?.some((obj) => JSON.stringify(obj) === JSON.stringify(item));
    }
    const [savedToggle, setSavedToggle] = useState(false);

    useEffect(() => {
        if(!(category in saved)) navigate('/browse')
        setSavedToggle(savedChecker());
    }, [saved, item]);

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
    }, [category, name, id]);

    useEffect(() => {
        localStorage.setItem("savedData", JSON.stringify(saved));
    }, [saved]);

    const saveItem = () => {
        const newSaved = { ...saved };
        const exists = savedChecker();
        if(exists) {
            const index = newSaved[category].findIndex(obj => JSON.stringify(obj) === JSON.stringify(item));
            newSaved[category] = newSaved[category].filter((element, i) => i !== index);
        } else {
            newSaved[category] = [...newSaved[category], item];
        }
        setSaved(newSaved);
        setSavedToggle(!exists);
    }

    return (
        <>
            <h1>{item?.name}</h1>
            <img src={item?.image_url}></img>
            <button onClick={saveItem}>{savedToggle? "Unsave": "Save"}</button>
        </>
    )
}

export default ItemInfoPage;