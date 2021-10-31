import { useState, useEffect } from "react";
import mealApi from "components/api/mealApi";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setloading(true);

    mealApi
      .get(url)
      .then((response) => {
        setData(response.data);
        setloading(false);
      })
      .catch(() => {
        console.log("err");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
