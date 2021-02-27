import createDataContext from "./createDataContext";

const photoReducer = (state, action) => {
  switch (action.type) {
    case "PHOTO_LIST_LOADED":
      return [...state, ...action.payload];

    default:
      return state;
  }
};

const updatePhotoList = (dispatch) => {
  return (newPhotoList) => {
    dispatch({ type: "PHOTO_LIST_LOADED", payload: newPhotoList });
  };
};

export const { Context, Provider } = createDataContext(
  photoReducer,
  { updatePhotoList },
  []
);
