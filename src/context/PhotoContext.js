import React, { useReducer } from "react";
import { useState } from "react";

const PhotoContext = React.createContext();

const photoReducer = (state, action) => {
  switch (action.type) {
    case "PHOTO_LIST_LOADED":
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export const PhotoProvider = ({ children }) => {
  const [photoList, dispatch] = useReducer(photoReducer, []);

  const updatePhotoList = (newPhotoList) => {
    dispatch({ type: "PHOTO_LIST_LOADED", payload: newPhotoList });
  };

  return (
    <PhotoContext.Provider value={{ data: photoList, updatePhotoList }}>
      {children}
    </PhotoContext.Provider>
  );
};

export default PhotoContext;
