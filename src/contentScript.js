import { fetchUserData, fetchUserMapStats } from "./api/esplayApi.js";
import { calculateBestMap } from "./helpers/mapStatsHelper.js";
import { observeDOM } from "./dom/domObserver.js";
import { addStyledElement } from "./dom/domUpdater.js";

(function () {
  console.log("Content script is running!");

  // Wait for the DOM to load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
  } else {
    onDOMContentLoaded();
  }

  function onDOMContentLoaded() {
    console.log("DOMContentLoaded event fired.");

    const selector = "#main > div > div.root-topbar.border-b > div > div.flex.grow-0.items-center.gap-x-2.pr-2";
    const targetElement = document.querySelector(selector);

    if (targetElement) {
      addStyledElement(targetElement);
    } else {
      console.error(`Target element with selector "${selector}" not found.`);
    }

    // Observe DOM for changes and add the styled element if required
    observeDOM(selector, addStyledElement);

    // Determine endpoint type and fetch user data
    const endpointType = determineEndpointType();
    fetchAndLogUserData(endpointType);
  }

  function determineEndpointType() {
    const url = new URL(window.location.href);

    if (url.pathname.includes("/g/")) {
      console.log("Endpoint type determined: gather");
      return "gather";
    } else if (url.pathname.includes("/m/")) {
      console.log("Endpoint type determined: match");
      return "match";
    }

    console.warn("No specific endpoint type found; defaulting to gather.");
    return "gather";
  }

  async function fetchAndLogUserData(endpointType) {
    const url = new URL(window.location.href);
    const gatherId = url.pathname.split("/")[2]; // Extract Gather ID from URL

    if (!gatherId) {
      console.error("No Gather ID found in URL.");
      return;
    }

    console.log(`Using "${endpointType}" endpoint to fetch data for Gather ID: ${gatherId}`);

    const userData = await fetchUserData(gatherId, endpointType);

    if (userData) {
      console.log(`User details from ${endpointType} endpoint:`);
      for (const user of userData) {
        console.log(`User ID: ${user.id}, Username: ${user.username}`);

        // Fetch map statistics for the user
        const mapStats = await fetchUserMapStats(user.id);

        if (mapStats) {
          // Calculate and log the user's best map
          const bestMap = calculateBestMap(mapStats);
          console.log(
            `Best map for ${user.username} (${user.id}): ${bestMap.name} (${bestMap.winRate.toFixed(2)}% win rate)`
          );
        } else {
          console.warn(`No map stats found for User ID: ${user.id}`);
        }
      }
    } else {
      console.error(`Failed to fetch or display user data from "${endpointType}" endpoint.`);
    }
  }
})();
