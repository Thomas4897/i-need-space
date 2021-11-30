//! Mapbox Geocoding API:
//! Accepts an address and gives us back the longitude / latitude of that address.
//? https://docs.mapbox.com/api/search/geocoding/

//! Satellite Passes API:
//! Accepts a longitude / latitude and a satellite's ID (known as a NORAD) and gives us back
//! information about when the satellite will next be visible over those coordinates.
//? https://satellites.fly.dev/

const inputApiKey = document.querySelector("#api-key");
const inputAddress = document.querySelector("#address");
const inputNorad = document.querySelector("#norad");
const buttonSearch = document.querySelector("#search");
const content = $(".content");

let apikey;
let address;
let norad;

async function main() {
	//? Fetch one story from Hacker News
	const httpResponseMapbox = await fetch(
		//? encodeURI() replaces special characters
		encodeURI(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apikey}`
		)
	);

	const dataMapbox = await httpResponseMapbox.json();
	const latitude = dataMapbox.features[0].center[1];
	const longitude = dataMapbox.features[0].center[0];

	const httpResponseSatellites = await fetch(
		//? encodeURI() replaces special characters
		encodeURI(
			`https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&days=15&visible_only=true`
		)
	);

	const dataSatellites = await httpResponseSatellites.json();

	console.log(dataSatellites);

	let isVisible = false;

	for (data of dataSatellites) {
		if (data["visible"] === true) {
			isVisible = true;
			return [
				data["culmination"]["utc_datetime"],
				data["rise"]["utc_datetime"],
				data["set"]["utc_datetime"],
			];
		}
	}

	if (isVisible === false) {
		return [];
	}
}

buttonSearch.addEventListener("click", async function () {
	apikey = inputApiKey.value;
	address = inputAddress.value;
	norad = inputNorad.value;

	const nextTimeVisible = await main();
	console.log(nextTimeVisible.length);
	const visibleDiv = `<div class="section">
						<div class="column">
							<div class="row">
								NORAD (Satellite ID) <b>&nbsp; ${norad} &nbsp;</b> will next rise and be visible on:
							</div>
							<h2>${moment(nextTimeVisible[1]).format(
								"MMMM Do YYYY, h:mm:ss a [| GMT] Z"
							)}</h2>

							<div class="row">
							It will culminate at:
						</div>
						<h2>${moment(nextTimeVisible[0]).format("h:mm:ss a [| GMT] Z")}</h2>

						<div class="row">
						And it will set at:
					</div>
					<h2>${moment(nextTimeVisible[2]).format("h:mm:ss a [| GMT] Z")}</h2>
							
							<div class="row">
								<b>Over:</b>
							</div>
							<div class="title">
								<h2>${address}</h2>
							</div>
						</div>
					</div>`;

	const notVisibleDiv = `<div class="section">
								<div class="row">
									NORAD (Satellite ID) <b>&nbsp; ${norad} &nbsp;</b> will not be visible in the next 15 days.
								</div>`;

	if (nextTimeVisible.length === 0) {
		content.append(notVisibleDiv);
	} else {
		content.append(visibleDiv);
	}
});

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
