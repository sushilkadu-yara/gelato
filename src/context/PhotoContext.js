import createDataContext from "./createDataContext";
import picsum from "./../api/picsum";

const RESPONSE_LIMIT = 50;

const photoReducer = (state, action) => {
  switch (action.type) {
    case "PHOTO_LIST_LOADING":
      return { loading: true, photoList: [...state.photoList] };

    case "PHOTO_LIST_LOADED":
      return {
        loading: false,
        photoList: [...state.photoList, ...action.payload],
      };

    case "PHOTO_LIST_FETCH_ERROR":
      return {
        loading: false,
        photoList: [...state.photoList],
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchPhotoList = (dispatch) => {
  return async (page, limit = RESPONSE_LIMIT) => {
    dispatch({ type: "PHOTO_LIST_LOADING" });
    try {
      const response = await picsum.get("/list", {
        params: {
          page: page,
          limit: RESPONSE_LIMIT,
        },
      });
      // Map result for rendering
      const result = response.data.map((item) => {
        return {
          id: item.id,
          uri: item.download_url,
          dimensions: { width: item.width, height: item.height },
        };
      });

      dispatch({ type: "PHOTO_LIST_LOADED", payload: result });
    } catch (error) {
      dispatch({
        type: "PHOTO_LIST_FETCH_ERROR",
        payload: "Error fetching photos",
      });

      throw new Error("Error fetching photos");
    }
  };
};

const updatePhotoList = (dispatch) => {
  return (newPhotoList) => {
    dispatch({ type: "PHOTO_LIST_LOADED", payload: newPhotoList });
  };
};

export const { Context, Provider } = createDataContext(
  photoReducer,
  { fetchPhotoList, updatePhotoList },
  { loading: false, photoList: [] }
);
