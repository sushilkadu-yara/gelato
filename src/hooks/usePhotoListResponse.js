import { useContext } from 'react'
import { useEffect } from 'react'
import { Context } from '../context/PhotoContext'

export default () => {
  const { state, fetchPhotoList } = useContext(Context)

  const photoListApi = async () => {
    if (state.loading) return
    try {
      await fetchPhotoList(state.page + 1)
    } catch (err) {
      console.log('Error loading photos: ', err)
    }
  }

  return [photoListApi]
}
