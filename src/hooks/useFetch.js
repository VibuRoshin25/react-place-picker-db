import { useEffect, useState } from "react";

export function useFetch(fetchFN, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFN();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFN]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}
