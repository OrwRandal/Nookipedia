import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_KEY from "../config";
import MyContext from "../context/MyContext";
import "../iteminfo.css";

const ItemInfoPage = () => {
  const {paths, saved, setSaved} = useContext(MyContext)
  const { category, name, id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedChecker = () => {
    return saved[category]?.some((obj) => JSON.stringify(obj) === JSON.stringify(item));
}
const [savedToggle, setSavedToggle] = useState(false);


useEffect(() => {
    if(!(category in saved)) navigate('/browse')
    setSavedToggle(savedChecker());
}, [saved, item]);

  const normalizedCategory = category?.toLowerCase().replace(/[_\s]/g, "-");

  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
          },
        };

        const url =
          category !== "villagers"
            ? `https://api.nookipedia.com${paths[category]}/${encodeURIComponent(name)}`
            : `https://api.nookipedia.com${paths[category]}?name=${encodeURIComponent(name)}`;

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.length === 0) navigate("/browse");

        if (category === "villagers") {
          setItem(data.length > 1 ? data.find((el) => el.id === (id || "")) : data[0]);
        } else {
          setItem(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    doFetch();
  }, [category, name, id, paths, navigate]);

  useEffect(() => {
    localStorage.setItem("savedData", JSON.stringify(saved));
}, [saved]);

  const getPersonalityColor = (personality) => {
    const colors = {
      Normal: "#E0C9A6",
      Peppy: "#FFC0CB",
      Lazy: "#B7D7D8",
      Cranky: "#9999CC",
      Snooty: "#D8A0D8",
      Jock: "#87CEEB",
      Smug: "#C3B091",
      "Big sister": "#E6A8D7",
    };
    return colors[personality] || "#A8E6CF";
  };

  const getCategoryStyles = (category, item) => {
    const styles = {
      fish: {
        backgroundColor: "#d0f0fd",
        borderColor: "#4ab1f1",
      },
      bugs: {
        backgroundColor: "#e7fcd9",
        borderColor: "#76c24e",
      },
      "sea-creatures": {
        backgroundColor: "#f0eaff",
        borderColor: "#a27cf2",
      },
      villagers: {
        backgroundColor: getPersonalityColor(item.personality),
        borderColor: `#${item.title_color || "515151"}`,
      },
    };
    return styles[category] || { backgroundColor: "#fff8dc", borderColor: "#ccc" };
  };

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


//   const saveItemToLocalStorage = (itemToSave) => {
//     const saved = JSON.parse(localStorage.getItem("savedItems")) || [];
//     const exists = saved.some(
//       (el) => el.name === itemToSave.name && el.category === itemToSave.category
//     );
//     if (!exists) {
//       saved.push(itemToSave);
//       localStorage.setItem("savedItems", JSON.stringify(saved));
//       alert("Item saved!");
//     } else {
//       alert("Item already saved.");
//     }
//   };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item information...</p>
      </div>
    );
  }

  if (!item || Object.keys(item).length === 0) {
    return <div className="error-message">No item information found.</div>;
  }

  const styles = getCategoryStyles(normalizedCategory, item);

  return (
    <div className="page-container">
      <div
        className="villager-card"
        style={{
          backgroundColor: styles.backgroundColor,
          border: `8px solid ${styles.borderColor}`,
        }}
      >
        <div className="villager-header">
          <h1 className="villager-name">{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
          <span className="villager-species">
            {item.species || item.category || category}
          </span>
        </div>

        <div className="villager-content">
          <div className="villager-image-container">
            <img
              className="villager-image"
              src={item.image_url || item.render_url || item.icon_url}
              alt={item.name}
            />
            {(item.quote || item.catchphrase) && (
              <div className="villager-quote">
                "{item.quote || item.catchphrase}"
              </div>
            )}
          </div>

          <div className="villager-details">
            {normalizedCategory === "villagers" && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Personality:</span>
                  <span className="detail-value">{item.personality}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Birthday:</span>
                  <span className="detail-value">
                    {item.birthday_month} {item.birthday_day}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Zodiac Sign:</span>
                  <span className="detail-value">{item.sign}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Catchphrase:</span>
                  <span className="detail-value">"{item.phrase}"</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender:</span>
                  <span className="detail-value">{item.gender}</span>
                </div>
                {item.clothing && (
                  <div className="detail-item">
                    <span className="detail-label">Clothing:</span>
                    <span className="detail-value">{item.clothing}</span>
                  </div>
                )}
                {item.hobby && (
                  <div className="detail-item">
                    <span className="detail-label">Hobby:</span>
                    <span className="detail-value">{item.hobby}</span>
                  </div>
                )}
                {item.favorite_song && (
                  <div className="detail-item">
                    <span className="detail-label">Favorite Song:</span>
                    <span className="detail-value">{item.favorite_song}</span>
                  </div>
                )}
              </>
            )}

            {normalizedCategory === "fish" && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Shadow Size:</span>
                  <span className="detail-value">{item.shadow_size}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{item.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{item.sell_nook} Bells</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Catches:</span>
                  <span className="detail-value">{item.total_catch}</span>
                </div>
              </>
            )}

            {normalizedCategory === "bugs" && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{item.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{item.sell_nook} Bells</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Weather:</span>
                  <span className="detail-value">{item.weather}</span>
                </div>
              </>
            )}

            {normalizedCategory === "sea-creatures" && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Speed:</span>
                  <span className="detail-value">{item.shadow_movement}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Shadow Size:</span>
                  <span className="detail-value">{item.shadow_size}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{item.sell_nook} Bells</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="villager-footer">
          <button className="back-button" onClick={() => navigate("/browse")}>
            Back to Browse
          </button>
          {item.url && (
            <a
              className="wiki-link"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Nookipedia
            </a>
          )}
          <button
            className="save-button"
            onClick={saveItem}
          >
            {savedToggle? "Remove From Saved": "Save To My Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemInfoPage;