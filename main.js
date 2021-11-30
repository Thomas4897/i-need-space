//* Mapbox 'Access Tokens':
//* pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA

//! Mapbox Geocoding API:
//! Accepts an address and gives us back the longitude / latitude of that address.
//? https://docs.mapbox.com/api/search/geocoding/

//! Satellite Passes API:
//! Accepts a longitude / latitude and a satellite's ID (known as a NORAD) and gives us back
//! information about when the satellite will next be visible over those coordinates.
//? https://satellites.fly.dev/

async function main() {
	//? Fetch one story from Hacker News
	const httpResponse = await fetch(
		//? encodeURI() replaces special characters
		encodeURI(
			"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"
		)
	);

	const data = await httpResponse.json();

	console.log(data);
	console.log("Longitude:", data.features[0].center[0]);
	console.log("Latitude:", data.features[0].center[1]);

	//? Put the story on the DOM
	// const content = document.querySelector("#content");
	// const storyTitle = document.createElement("div");
	// storyTitle.className = "story";
	// storyTitle.innerText = data.title;
	// content.appendChild(storyTitle);

	//? Load comments for a story and put them on the DOM
	// await loadComments(data, 0);
}

main();
// Longitude: 4.683971 Latitude: 51.825221

//! ==================================================================================================
//! # A basic forward geocoding request
//? # Find Los Angeles
//* $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"

//? # Find a town called 'Chester' in a specific region
//? # Add the proximity parameter with local coordinates
//? # This ensures the town of Chester, New Jersey is in the results
// *$ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"

//? # Specify types=country to search only for countries named Georgia
//? # Results will exclude the American state of Georgia
//* $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/georgia.json?types=country&access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"

//? # Search for "Starbucks" in Washington, D.C.
//? # Use a bounding box to limit results to within the district
//* $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"

//? # Limit the results to two results using the limit option
//? # Even though there are many possible matches
//? # for "Washington", this query will only return two results.
//* $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"

//? # Search for the Place feature "Kaaleng" in the Ilemi Triangle. Specifying the cn worldview will return the country value South Sudan. Not including leaving the worldview parameter would default to the us worldview and return the country value Kenya.
//* $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Kaaleng.json?worldview=cn&access_token=pk.eyJ1IjoidGhvbWFzLW1heW5hcmQiLCJhIjoiY2t3bDJpdjNsMDJ2ZTJubXI5cmk1NzNuaiJ9.S6LONB4wZIPtlddgLOABMA"
