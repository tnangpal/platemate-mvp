// src/components/filters/DietaryRestrictionModal.jsx
export default function DietaryRestrictionModal({
  selectedRestrictions,
  setSelectedRestrictions,
  onClose,
}) {
  const restrictionOptions = [
    "Gluten-Free",
    "Lactose Free",
    "Nuts Free",
    "Vegan",
    "Vegetarian",
    "Halal",
  ];

  const toggleOption = (option) => {
    setSelectedRestrictions((prev) =>
      prev.includes(option) ? prev.filter((r) => r !== option) : [...prev, option]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Dietary Restrictions</h3>
        <div className="modal-options">
          {restrictionOptions.map((option, idx) => (
            <button
              key={idx}
              className={`modal-option ${selectedRestrictions.includes(option) ? "selected" : ""}`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
