import { useEffect, useState } from "react";
import picsum from "./../api/picsum";

export default () => {
  const [photoList, setPhotoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const photoListApi = async () => {
    try {
      const response = await picsum.get("/list", {
        params: {
          page: 1,
          limit: 100,
        },
      });
      setPhotoList(response.data);
    } catch (err) {
      console.log("Error loading photos: ", err);
      setErrorMessage("Failed to get photoList");
    } finally {
    }
  };

  useEffect(() => photoListApi(), []);

  return [photoListApi, photoList, errorMessage];
};
