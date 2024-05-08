

export async function fetchData(ipAddress:string) {
  const apiKey = "at_TCY0gMA0G7oeoiGj3X2YwVzVFFwi0";
  const apiUrl = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ipAddress}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Example usage:
// const ipAddress = "8.8.8.8"; // IP address to fetch data for
// fetchData(ipAddress)
//   .then((data) => {
//     console.log(data); // Do something with the fetched data
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });