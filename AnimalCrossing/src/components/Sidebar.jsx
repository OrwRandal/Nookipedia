import { useContext } from "react";
import MyContext from "../context/MyContext";
const SideBar = () => {
    const {selectedItem, setSelectedItem} = useContext(MyContext);
    return (
        <div id="side-bar">
            <h1>Items</h1>
            <p className={selectedItem === "villagers"? "selected": ""}
            onClick={(() => setSelectedItem("villagers"))}>Villagers</p>

            <p className={selectedItem === "fish"? "selected": ""}
            onClick={(() => setSelectedItem("fish"))}>Fish</p>
            <p className={selectedItem === "bugs"? "selected": ""}
            onClick={(() => setSelectedItem("bugs"))}>Bugs</p>
            <p className={selectedItem === "Sea Creatures"? "selected": ""}
            onClick={(() => setSelectedItem("Sea Creatures"))}>Sea Creatures</p>
        </div>
    )
}

export default SideBar;