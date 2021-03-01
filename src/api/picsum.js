import axios from 'axios'
import { Buffer } from 'buffer'

export default axios.create({
  baseURL: 'https://picsum.photos/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})

const getFileData = async (url) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  return `data:image/jpeg;base64,${Buffer.from(
    response.data,
    'binary'
  ).toString('base64')}`
}

export { getFileData }
