import { createSlice } from '@reduxjs/toolkit'
import type { DataUser } from '../types'

export const initialState: DataUser = {
  id: 0,
  name: '',
  lastName: '',
  email: '',
  roleId: 0,
  userAccount: {
    age: 0,
    gender: '',
    isVerified: false,
    verifyToken: ''
  }
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getData: (state = initialState) => {
      return state
    },
    setData: (state = initialState, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { getData, setData } = userSlice.actions
export default userSlice.reducer