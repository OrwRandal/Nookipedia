const ItemCard = ({selectedItem, item}) => {
    return (
        <div className="itemCard" key={item.id}>
            <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
            <img className="cardImg" src={item.image_url}></img>
        </div>
    )
}

export default ItemCard;