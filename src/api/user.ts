import { BASE_URL } from '../constants'
import { fetchApi } from './fetch'
import type { UserSave, UserAccountSave } from '../types'

export const getUser = async () => {
	try {
		return await fetchApi({}, `${BASE_URL}/users/get-user`, {}, {})
	} catch (error) {
		console.error(error);
	}
}

export const saveUser = async (user: UserSave) => {
	try {
		return await fetchApi({}, `${BASE_URL}/users`, {
			method: "POST",
			body: JSON.stringify(user)
		}, {})
	} catch (error) {
		console.error(error);
	}
}

export const updateUser = async (user: UserAccountSave) => {
	try {
		return await fetchApi({}, `${BASE_URL}/users`, {
			method: "PUT",
			body: JSON.stringify(user)
		}, {})
	} catch (error) {
		console.error(error);
	}
}