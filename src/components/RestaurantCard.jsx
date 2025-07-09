import "../styles/RestaurantCard.css";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
      />
      <h2>{restaurant.name}</h2>
      <p>
        {restaurant.cuisine} • {restaurant.price} • {restaurant.distance}
      </p>
      <p style={{ color: "#888", fontSize: "0.9rem" }}>{restaurant.area} • ⭐ {restaurant.rating}</p>
    </div>
  );
}
