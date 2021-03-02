import createDataContext from './createDataContext'
import picsum from './../api/picsum'
import PageLimitReachedError from './../errors/PageLimitReachedError'

const RESPONSE_LIMIT = 100

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'PHOTO_LIST_LOADING':
      return {
        loading: true,
        photoList: [...state.photoList],
        page: state.page,
        error: ''
      }

    case 'PHOTO_LIST_LOADED':
      return {
        loading: false,
        photoList: [...state.photoList, ...action.payload.result],
        page: action.payload.page,
        error: ''
      }

    case 'PHOTO_LIST_FETCH_ERROR':
      return {
        loading: false,
        photoList: [...state.photoList],
        error: action.payload,
        page: state.page
      }

    case 'PHOTO_PAGE_LIMIT_REACHED':
      return {
        ...state,
        loading: false,
        error: ''
      }

    default:
      return state
  }
}

const fetchPhotoList = (dispatch) => {
  return async (page, limit = RESPONSE_LIMIT) => {
    dispatch({ type: 'PHOTO_LIST_LOADING' })
    try {
      const response = await picsum.get('/list', {
        params: {
          page: page,
          limit
        }
      })

      if (response.data && response.data.length === 0) {
        // We need to error because then
        throw new PageLimitReachedError('No more pages to load')
      }

      // Map result for rendering
      const result = response.data.map((item) => {
        return {
          id: item.id,
          uri: item.download_url,
          author: item.author,
          dimensions: { width: item.width, height: item.height }
        }
      })

      dispatch({ type: 'PHOTO_LIST_LOADED', payload: { result, page } })
    } catch (error) {
      if (error instanceof PageLimitReachedError) {
        dispatch({
          type: 'PHOTO_PAGE_LIMIT_REACHED'
        })
        return
      }

      dispatch({
        type: 'PHOTO_LIST_FETCH_ERROR',
        payload: 'Error fetching photos'
      })
    }
  }
}

const updatePhotoList = (dispatch) => {
  return (result, page) => {
    dispatch({ type: 'PHOTO_LIST_LOADED', payload: { result, page } })
  }
}

export const { Context, Provider } = createDataContext(
  photoReducer,
  { fetchPhotoList, updatePhotoList },
  { page: 0, loading: false, photoList: [] }
)
