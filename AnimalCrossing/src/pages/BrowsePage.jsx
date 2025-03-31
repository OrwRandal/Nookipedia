import SideBar from "../components/SideBar";
import BrowseItems from "../components/BrowseItems";
import { useState } from "react";
const BrowsePage = () => {
    return (
        <div id="browse-div">
            <SideBar />
            <BrowseItems />
        </div>
    )
}

export default BrowsePage;