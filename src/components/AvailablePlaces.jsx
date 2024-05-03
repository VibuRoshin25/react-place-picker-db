import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const { isFetching, setIsFetching, error, fetchedData, setFetchedData } =
    useFetch(fetchAvailablePlaces, []);
  try {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        fetchedData,
        position.coords.latitude,
        position.coords.longitude
      );
      setFetchedData(sortedPlaces);
      setIsFetching(false);
    });
  } catch (error) {
    setError({
      message: error.message || "Could not fetch places, try again later.",
    });
  }
  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }

  const sortedPlaces = sortPlacesByDistance(fetchedData);
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
