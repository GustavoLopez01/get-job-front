import { createSlice } from '@reduxjs/toolkit'

export type UserSessionState = {
  roleId: number
  fullName: string
  email: string
}

const initialState = {
  roleId: 0,
  fullName: '',
  email: ''
} satisfies UserSessionState as UserSessionState

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