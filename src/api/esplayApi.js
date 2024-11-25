export async function fetchUserData(gatherId, endpointType = "gather") {
    // Base URLs for the endpoints
    const endpoints = {
      gather: `https://esplay.com/api/gather/get?id=${gatherId}`,
      match: `https://esplay.com/api/match/get?id=${gatherId}`,
    };
  
    // Validate and select the endpoint
    const endpoint = endpoints[endpointType];
    if (!endpoint) {
      console.error(`Invalid endpoint type: ${endpointType}`);
      return null;
    }
  
    console.log(`Fetching data from: ${endpoint}`); // Debug log to verify the URL
  
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        console.error(`Failed to fetch data from ${endpoint}:`, response.statusText);
        return null;
      }
  
      const data = await response.json();
      console.log(`Data fetched from ${endpointType} endpoint:`, data);
  
      // Handle gather endpoint structure
      if (endpointType === "gather") {
        return data.users || [];
      }
  
      // Handle match endpoint structure
      if (endpointType === "match") {
        // Combine data from `users` and `cs_users_total_stats` for more complete details
        const users = data.users || [];
        const stats = data.game_fields?.cs_users_total_stats || [];
  
        // Map stats to users by matching `user_id`
        return users.map(user => {
          const userStats = stats.find(stat => stat.user_id === user.id) || {};
          return { ...user, ...userStats }; // Merge user data with their stats
        });
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpointType} endpoint:`, error);
      return null;
    }
  }


  export async function fetchUserMapStats(userId) {
    const endpoint = `https://esplay.com/api/stats/user/maps?id=${userId}&game_id=1`;
  
    try {
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        console.error(`Failed to fetch map stats for User ID: ${userId}:`, response.statusText);
        return null;
      }
  
      const data = await response.json();
  
      return data; // Return the array of map stats
    } catch (error) {
      console.error(`Error fetching map stats for User ID: ${userId}:`, error);
      return null;
    }
  }
  
  