import { useContext } from "react";
import MyContext from "../context/MyContext";
import ItemCard from "../components/ItemCard";
const SavedPage = () => {
    const {saved} = useContext(MyContext);
    const isEmpty = Object.values(saved).every(category => category.length === 0);
    return (
        <>
            <h1 id="savedH1">Saved</h1>
            {saved["villagers"].length > 0 && (
                <>
                    <h1 className="savedSubtitle">Villagers</h1>
                    <div className="savedDiv">
                        {saved["villagers"].map((item) => <ItemCard item={item} type={"villagers"}/>)}
                    </div>
                </>
            )}
            {saved["fish"].length > 0 && (
                <>
                    <h1 className="savedSubtitle">Fish</h1>
                    <div className="savedDiv">
                        {saved["fish"].map((item) => <ItemCard item={item} type={"fish"}/>)}
                    </div>
                </>
            )}
            {saved["bugs"].length > 0 && (
                <>
                    <h1 className="savedSubtitle">Bugs</h1>
                    <div className="savedDiv">
                        {saved["bugs"].map((item) => <ItemCard item={item} type={"bugs"}/>)}
                    </div>
                </>
            )}
            {saved["Sea Creatures"].length > 0 && (
                <>
                    <h1 className="savedSubtitle">Sea Creatures</h1>
                    <div className="savedDiv">
                        {saved["Sea Creatures"].map((item) => <ItemCard item={item} type={"Sea Creatures"}/>)}
                    </div>
                </>
            )}
            {isEmpty && <h2 id="emptySave">No Items Currently Saved</h2>}
        </>
    )
}

export default SavedPage;