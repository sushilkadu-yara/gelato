import React from "react";
import { useState } from "react";

const PhotoContext = React.createContext();

export const PhotoProvider = ({ children }) => {
  const [photoList, setPhotoList] = useState([]);

  const updatePhotoList = (newPhotoList) => {
    setPhotoList([...photoList, ...newPhotoList]);
  };

  return (
    <PhotoContext.Provider value={{ data: photoList, updatePhotoList }}>
      {children}
    </PhotoContext.Provider>
  );
};

export default PhotoContext;
