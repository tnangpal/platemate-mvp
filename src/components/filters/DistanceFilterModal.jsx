import React from "react";
import "../../styles/App.css";

const distanceOptions = ["0-5 miles", "5-10 miles", "10-20 miles", "20+ miles"];


export default function DistanceFilterModal({
  selectedDistances,
  setSelectedDistances,
  onClose,
}) {
  const toggleDistance = (option) => {
    setSelectedDistances((prev) =>
      prev.includes(option)
        ? prev.filter((d) => d !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Distance Range</h3>
        <div className="modal-options">
          {distanceOptions.map((option, idx) => (
            <button
              key={idx}
              className={`modal-option ${
                selectedDistances.includes(option) ? "selected" : ""
              }`}
              onClick={() => toggleDistance(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
