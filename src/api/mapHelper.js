// Map ID to Map Name Mapping
const maps = {
    "1": "Ancient",
    "2": "Anubis",
    "3": "D2",
    "4": "Inferno",
    "5": "Mirage",
    "7": "Vertigo",
    "8": "Cache",
    "9": "Overpass",
    "12": "Train",
    "44": "Cobble",
  };
  
  // Function to get a map name from the map ID
  export function mapIdToName(mapId) {
    return maps[mapId] || "Unknown Map";
  }
  
  // Exporting the mapping for external use if needed
  export default maps;
  