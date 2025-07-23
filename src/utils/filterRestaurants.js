export function filterRestaurants(restaurants, filters) {
  const {
    selectedPrices,
    selectedRestrictions,
    selectedDistances,
    selectedDineOption,
    selectedAmbience,
  } = filters;

  return restaurants.filter((restaurant) => {
    // Cleaned tags and ambience arrays
    const tags = (restaurant.tags || []).map((t) => t.toLowerCase());
    const ambienceTags = (restaurant.ambience || []).map((a) => a.toLowerCase());
    const distanceStr = String(restaurant.distance || "").toLowerCase();
    const distanceNum = parseFloat(distanceStr.replace(/[^\d.]/g, "")); // "5 miles" → 5

    // Price filter
    const priceMatches =
      selectedPrices.length === 0 || selectedPrices.includes(restaurant.price);

    // Distance filter
    const distanceMatches =
      selectedDistances.length === 0 ||
      selectedDistances.some((range) => {
        if (isNaN(distanceNum)) return false;
        if (range === "0-5 miles") return distanceNum >= 0 && distanceNum <= 5;
        if (range === "5-10 miles") return distanceNum <= 10;
        if (range === "10-20 miles") return distanceNum <= 20;
        if (range === "20+ miles") return distanceNum >= 20;
        return false;
      });

    // Dietary filter (must match ALL selected)
    const dietaryMatches =
      selectedRestrictions.length === 0 ||
      selectedRestrictions.every((r) => tags.includes(r.toLowerCase()));

    // Dine in / Take out (only one option allowed)
    const dineMatches =
      !selectedDineOption ||
      tags.includes(selectedDineOption.toLowerCase());

    // Ambience filter (inclusive OR)
    const ambienceMatches =
      selectedAmbience.length === 0 ||
      selectedAmbience.some((a) => ambienceTags.includes(a.toLowerCase()));

    return (
      priceMatches &&
      distanceMatches &&
      dietaryMatches &&
      dineMatches &&
      ambienceMatches
    );
  });
}
