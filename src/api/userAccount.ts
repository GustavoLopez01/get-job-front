import { BASE_URL } from '../constants'
import { fetchApi } from './fetch'
import type { UserAccount } from '../components/Profile/Profile'
import { getCookieByKey } from '../helpers'

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

export const updateCV = async (formData: FormData) => {
  try {
    return await fetch(`${BASE_URL}/usersAccount/upload-cv`, {
      method: 'PUT',
      body: formData,
      headers: {
        'authorization': getCookieByKey() || '',
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export const getUserCv = async (id: number) => {
	try {
		// return await fetchApi({}, `${BASE_URL}/usersAccount/cv/${id}`, {
    //   method: 'GET',
    // }, {})

    const response = await fetch(`${BASE_URL}/usersAccount/cv/${id}`, {
      headers: {
        'authorization': getCookieByKey() || '',
        'Content-Type': 'application/pdf'
      }
    })

    return URL.createObjectURL(await response.blob()) 
	} catch (error) {
		console.error(error);
	}
}