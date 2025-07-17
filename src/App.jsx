import { useState } from "react";
import restaurants from "./data/restaurants";
import RestaurantCard from "./components/RestaurantCard";
import DietaryRestrictionModal from "./components/filters/DietaryRestrictionModal";
import PriceFilterModal from "./components/filters/PriceFilterModal";
import DistanceFilterModal from "./components/filters/DistanceFilterModal";
import DineInTakeOutModal from "./components/filters/DineInTakeOutModal";
import AmbienceFilterModal from "./components/filters/AmbienceFilterModal";
import { filterRestaurants } from "./utils/filterRestaurants";

import "./styles/App.css";

const users = ["Abby", "David"];

export default function App() {
  const [index, setIndex] = useState(0);
  const [userAChoices, setUserAChoices] = useState([]);
  const [userBChoices, setUserBChoices] = useState([]);
  const [userTurn, setUserTurn] = useState("A");
  const [match, setMatch] = useState(null);

  const [showDietaryModal, setShowDietaryModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showDineModal, setShowDineModal] = useState(false);
  const [showAmbienceModal, setShowAmbienceModal] = useState(false);

  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDistances, setSelectedDistances] = useState([]);
  const [selectedDineOption, setSelectedDineOption] = useState("");
  const [selectedAmbience, setSelectedAmbience] = useState([]);

  const currentUser = users[userTurn === "A" ? 0 : 1];

  const filteredRestaurants = filterRestaurants(restaurants, {
    selectedPrices,
    selectedRestrictions,
    selectedDistances,
    selectedDineOption,
    selectedAmbience,
  });

  const currentRestaurant = filteredRestaurants[index];

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
      setIndex((prev) => prev + 1);
    }
  };

  const handleFilterClick = (filter) => {
    if (filter === "Dietary Restrictions") setShowDietaryModal(true);
    else if (filter === "Price") setShowPriceModal(true);
    else if (filter === "Ambience") setShowAmbienceModal(true);
    else if (filter === "Distance") setShowDistanceModal(true);
    else if (filter === "Dine In/Take Out") setShowDineModal(true);
  };

  if (match) {
    return (
      <div className="phone-frame">
        <img src="/PM_Logo.png" alt="PlateMate Logo" className="header-logo" />
        <h3 className="subtitle">🎉 It’s a match! You both like:</h3>
        <RestaurantCard restaurant={match} />
      </div>
    );
  }

  return (
    <div className="phone-frame">
      <img src="/PM_Logo.png" alt="PlateMate Logo" className="header-logo" />

      <div className="filter-scroll">
        <button
          className={`filter-pill ${selectedPrices.length > 0 ? "active-pill" : ""}`}
          onClick={() => handleFilterClick("Price")}
        >
          Price
        </button>
        <button
          className={`filter-pill ${selectedRestrictions.length > 0 ? "active-pill" : ""}`}
          onClick={() => handleFilterClick("Dietary Restrictions")}
        >
          Dietary
        </button>
        <button
          className={`filter-pill ${selectedAmbience.length > 0 ? "active-pill" : ""}`}
          onClick={() => handleFilterClick("Ambience")}
        >
          Ambience
        </button>
        <button
          className={`filter-pill ${selectedDistances.length > 0 ? "active-pill" : ""}`}
          onClick={() => handleFilterClick("Distance")}
        >
          Distance
        </button>
        <button
          className={`filter-pill ${selectedDineOption ? "active-pill" : ""}`}
          onClick={() => handleFilterClick("Dine In/Take Out")}
        >
          Dine Type
        </button>
      </div>

      <h3 className="subtitle">
        Where do you want to eat,{" "}
        <strong style={{ color: currentUser === "Abby" ? "#f79f28" : "#41bbc0" }}>
          {currentUser}
        </strong>
        ?
      </h3>

      {currentRestaurant ? (
        <>
          <RestaurantCard restaurant={currentRestaurant} />
          <div className="choice-buttons">
            <button className="yes" onClick={() => handleChoice(true)}>👍 Yes</button>
            <button className="no" onClick={() => handleChoice(false)}>👎 No</button>
          </div>
        </>
      ) : (
        <div className="no-more">No more restaurants match your filters!</div>
      )}

      {showDietaryModal && (
        <DietaryRestrictionModal
          selectedRestrictions={selectedRestrictions}
          setSelectedRestrictions={setSelectedRestrictions}
          onClose={() => setShowDietaryModal(false)}
        />
      )}

      {showPriceModal && (
        <PriceFilterModal
          selectedPrices={selectedPrices}
          setSelectedPrices={setSelectedPrices}
          onClose={() => setShowPriceModal(false)}
        />
      )}

      {showDistanceModal && (
        <DistanceFilterModal
          selectedDistances={selectedDistances}
          setSelectedDistances={setSelectedDistances}
          onClose={() => setShowDistanceModal(false)}
        />
      )}

      {showDineModal && (
        <DineInTakeOutModal
          selectedDineOption={selectedDineOption}
          setSelectedDineOption={setSelectedDineOption}
          onClose={() => setShowDineModal(false)}
        />
      )}

      {showAmbienceModal && (
        <AmbienceFilterModal
          selectedAmbience={selectedAmbience}
          setSelectedAmbience={setSelectedAmbience}
          onClose={() => setShowAmbienceModal(false)}
        />
      )}
    </div>
  );
}
