import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { isFetching, error, fetchedData } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={fetchedData}
      isLoading={isFetching}
      loadingText="Fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
