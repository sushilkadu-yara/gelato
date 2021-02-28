import { useContext } from "react";
import { useEffect, useState } from "react";
import { Context } from "../context/PhotoContext";
import picsum from "./../api/picsum";

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
