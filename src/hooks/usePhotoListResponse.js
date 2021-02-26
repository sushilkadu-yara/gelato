import { useEffect, useState } from "react";
import picsum from "./../api/picsum";

const LIMIT = 50;
let page = 1;

export default () => {
  const [photoList, setPhotoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const photoListApi = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await picsum.get("/list", {
        params: {
          page: page,
          limit: LIMIT,
        },
      });

      const finalList = [...photoList, ...response.data];
      setPhotoList(finalList);
      page++;
    } catch (err) {
      console.log("Error loading photos: ", err);
      setErrorMessage("Failed to get photoList");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    photoListApi();
  }, []);

  return [photoListApi, photoList, errorMessage, loading];
};
