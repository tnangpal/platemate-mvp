import { useState } from "react";
import restaurants from "./data/restaurants";
import RestaurantCard from "./components/RestaurantCard";
import "./styles/App.css";

const users = ["Abby", "David"];

export default function App() {
  const [index, setIndex] = useState(0);
  const [userAChoices, setUserAChoices] = useState([]);
  const [userBChoices, setUserBChoices] = useState([]);
  const [userTurn, setUserTurn] = useState("A");
  const [match, setMatch] = useState(null);

  const filterOptions = [
    "Dietary Restrictions",
    "Distance",
    "Dine In/Take Out",
    "Price",
  ];

  const currentRestaurant = restaurants[index];
  const currentUser = users[userTurn === "A" ? 0 : 1];

  const handleChoice = (liked) => {
    if (!currentRestaurant) return;

    if (userTurn === "A") {
      if (liked) setUserAChoices([...userAChoices, currentRestaurant.id]);
      setUserTurn("B");
    } else {
      if (liked) setUserBChoices([...userBChoices, currentRestaurant.id]);
      if (liked && userAChoices.includes(currentRestaurant.id)) {
        setMatch(currentRestaurant);
      }
      setUserTurn("A");
      setIndex((prev) => prev + 1);
    }
  };

  if (match) {
    return (
      <div className="phone-frame">
        <img src="/PM_Logo.png" alt="PlateMate Logo" className="header-logo" />
        <h3 className="subtitle">It’s a match! You both like:</h3>
        <RestaurantCard restaurant={match} />
      </div>
    );
  }

  return (
    <div className="phone-frame">
      <img src="/PM_Logo.png" alt="PlateMate Logo" className="header-logo" />

      <div className="filter-scroll">
        {filterOptions.map((filter, idx) => (
          <button className="filter-pill" key={idx}>
            {filter}
          </button>
        ))}
      </div>

      <h3 className="subtitle">
        Where do you want to eat, <strong>{currentUser}</strong>?
      </h3>

      {currentRestaurant ? (
        <>
          <RestaurantCard restaurant={currentRestaurant} />

          <div className="choice-buttons">
            <button className="yes" onClick={() => handleChoice(true)}>
              👍 Yes
            </button>
            <button className="no" onClick={() => handleChoice(false)}>
              👎 No
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>No more restaurants left!</p>
        </div>
      )}
    </div>
  );
}
