// src/components/filters/PriceFilterModal.jsx
export default function PriceFilterModal({ selectedPrices, setSelectedPrices, onClose }) {
  const priceOptions = ["$", "$$", "$$$"];

  const togglePrice = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select Price Range</h3>
        <div className="modal-options">
          {priceOptions.map((price, idx) => (
            <button
              key={idx}
              className={`modal-option ${selectedPrices.includes(price) ? "selected" : ""}`}
              onClick={() => togglePrice(price)}
            >
              {price}
            </button>
          ))}
        </div>
        <button className="modal-close" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
