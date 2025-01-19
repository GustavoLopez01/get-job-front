import { useEffect, useState } from 'react';
import { getUser } from '../api/user';
import { User } from '../types';
import { useAppSelector } from '../store/store';


export function useProfileData() {
  const [user, setUser] = useState({})

  const setDataUser = async () => {
    try {
      if(!false) {
        const response: User = await getUser()
        console.log({response});
        setUser(response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setDataUser()
  }, [])

  return {
    user,
    setUser
  }
}