// src/components/filters/AmbienceFilterModal.jsx
export default function AmbienceFilterModal({
  selectedAmbience,
  setSelectedAmbience,
  onClose,
}) {
  const ambienceOptions = [
    "Family Friendly",
    "Romantic",
    "Fine Dining",
    "Casual Dining",
    "Buffet",
  ];

  const toggleOption = (option) => {
    setSelectedAmbience((prev) =>
      prev.includes(option) ? prev.filter((r) => r !== option) : [...prev, option]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Ambience</h3>
        <div className="modal-options">
          {ambienceOptions.map((option, idx) => (
            <button
              key={idx}
              className={`modal-option ${selectedAmbience.includes(option) ? "selected" : ""}`}
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
