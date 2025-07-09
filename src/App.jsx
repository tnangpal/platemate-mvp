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

  const currentRestaurant = restaurants[index];
  const currentUser = userTurn === "A" ? users[0] : users[1];

  const handleChoice = (liked) => {
    if (!currentRestaurant) return;

    if (userTurn === "A") {
      if (liked) setUserAChoices([...userAChoices, currentRestaurant.id]);
      setUserTurn("B");
    } else {
      if (liked) setUserBChoices([...userBChoices, currentRestaurant.id]);
      if (liked && userAChoices.includes(currentRestaurant.id)) {
        setMatch(currentRestaurant);
        return;
      }
      setUserTurn("A");
      setIndex(index + 1);
    }
  };

  if (match) {
    return (
      <div className="app">
        <div className="phone-frame">
          <div className="header">🎉 You matched on:</div>
          <RestaurantCard restaurant={match} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="phone-frame">
        <div className="filter-scroll">
          <button>🍕</button>
          <button>🍣</button>
          <button>🥗</button>
          <button>🌮</button>
          <button>🍔</button>
          <button>🥘</button>
        </div>

        <div className="header">
          Where do you want to eat, <strong>{currentUser}</strong>?
        </div>

        {currentRestaurant ? (
          <>
            <RestaurantCard restaurant={currentRestaurant} />

            <div className="buttons">
              <button className="yes" onClick={() => handleChoice(true)}>
                👍 Yes
              </button>
              <button className="no" onClick={() => handleChoice(false)}>
                👎 No
              </button>
            </div>
          </>
        ) : (
          <div className="header">No more restaurants.</div>
        )}
      </div>
    </div>
  );
}
