import SideBar from "../components/SideBar";
import BrowseItems from "../components/BrowseItems";
import { useState } from "react";
const BrowsePage = () => {
    const [selectedItem, setSelectedItem] = useState("villagers")
    return (
        <div id="browse-div">
            <SideBar selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            <BrowseItems selectedItem={selectedItem}/>
        </div>
    )
}

export default BrowsePage;