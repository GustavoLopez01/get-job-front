import { BASE_URL } from '../constants'
import { fetchApi } from './fetch'
import type { UserAccount } from '../components/Profile/Profile'

export const updateUserAccount = async (userAccount: UserAccount) => {
  try {
    return await fetchApi({}, `${BASE_URL}/usersAccount`, {
      method: 'PUT',
      body: JSON.stringify(userAccount)
    }, {})
  } catch (error) {
    console.error(error);
  }
}

export const updateAccountByToken = async (token: string) => {
	try {
		return await fetchApi({}, `${BASE_URL}/usersAccount/verify/${token}`, {
			method: "PUT",
			body: JSON.stringify({})
		}, {})
	} catch (error) {
		console.error(error);
	}
}