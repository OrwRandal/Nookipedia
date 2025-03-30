const SideBar = ({selectedItem, setSelectedItem}) => {
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