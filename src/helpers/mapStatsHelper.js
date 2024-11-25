import { mapIdToName } from "../api/mapHelper";

export function calculateBestMap(mapStats) {
  let bestMap = { name: null, winRate: 0 };

  for (const stat of mapStats) {
    const { map_id, wins, losses } = stat;
    const totalGames = wins + losses;

    if (totalGames > 0) {
      const winRate = (wins / totalGames) * 100;

      // Check if this map is better than the current best
      if (winRate > bestMap.winRate) {
        bestMap = {
          name: mapIdToName(map_id.toString()), // Convert map_id to a string for matching
          winRate,
        };
      }
    }
  }

  return bestMap;
}
