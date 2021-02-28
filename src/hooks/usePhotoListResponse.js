import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../context/PhotoContext";

let page = 1;

export default () => {
  const { state, fetchPhotoList } = useContext(Context);

  const photoListApi = async () => {
    if (state.loading) return;
    try {
      await fetchPhotoList(page);
      page++;
    } catch (err) {
      console.log("Error loading photos: ", err);
    }
  };

  useEffect(() => {
    photoListApi();
  }, []);

  return [photoListApi];
};
