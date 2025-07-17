// src/components/filters/DineInTakeOutModal.jsx
export default function DineInTakeOutModal({
  selectedDineOption,
  setSelectedDineOption,
  onClose,
}) {
  const options = ["Dine In", "Takeout"];

  const selectOption = (option) => {
    setSelectedDineOption(prev => (prev === option ? "" : option));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Dine Option</h3>
        <div className="modal-options">
          {options.map((option, idx) => (
            <button
              key={idx}
              className={`modal-option ${selectedDineOption === option ? "selected" : ""}`}
              onClick={() => selectOption(option)}
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
