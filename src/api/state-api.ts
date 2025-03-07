import { BASE_URL } from '../constants'
import { fetchApi } from './fetch'

export const getAllStates = async () => {
  try {
    return await fetchApi({}, `${BASE_URL}/states`, {}, {})
  } catch (error) {
    console.error(error);
  }
}