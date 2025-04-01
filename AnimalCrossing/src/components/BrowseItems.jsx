import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import API_KEY from "../config";
import MyContext from "../context/MyContext";
import { useContext } from "react";

const BrowseItems = () => {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState(0);
    const [loading, setLoading] = useState(true);
    const leftPagBool = pagination > 0;
    const rightPagBool = (pagination + 1) * 20 < items.length;

    const {selectedItem, paths} = useContext(MyContext);

    useEffect(() => {
        setLoading(true);
        setItems([]);
        const doFetch = async () => {
          const options = {
            headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
            }
          }
          const url = `https://api.nookipedia.com${paths[selectedItem]}`;
          const response = await fetch(url, options);

          const data = await response.json();
          setItems(data);
          console.log(data);
          setPagination(0);
          setLoading(false);
        }
        doFetch();
    }, [selectedItem])

    return ( 
    <div id="browseItemsDiv">
        <h1 id="itemTitle">{selectedItem[0].toUpperCase() + selectedItem.slice(1)}</h1>
        <form>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        </form>
        {!query && !loading && <div id="pagination">
            <button style={{visibility: leftPagBool? "visible": "hidden"}}
            onClick={() => setPagination(leftPagBool? pagination - 1: pagination)}>{"<<"}</button>
            <p>{pagination + 1}</p>
            <button style={{visibility: rightPagBool? "visible": "hidden"}}
            onClick={() => setPagination(rightPagBool? pagination + 1: pagination)}>{">>"}</button>
        </div>}
        {loading? <div className="loader"></div>: <></>}
        <div id="card-holder">

        {items.length > 0 && query && items.map((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase())? 
          <ItemCard item={item} type={selectedItem}/> : <></>
      })}

        {items.length > 0 && !query && items.slice(pagination * 20, (pagination * 20) + 20).map((item) => {
            return <ItemCard selectedItem={selectedItem} item={item} type={selectedItem}/>
      })}
        </div>
    </div> );
}

export default BrowseItems;