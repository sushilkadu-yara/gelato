import { useContext } from "react";
import { useEffect, useState } from "react";
import PhotoContext from "../context/PhotoContext";
import picsum from "./../api/picsum";

const LIMIT = 50;
let page = 1;

export default () => {
  // const [photoList, setPhotoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { updatePhotoList } = useContext(PhotoContext);

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

      updatePhotoList(response.data);
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

  return [photoListApi, errorMessage, loading];
};
