import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { updateAccountByToken } from '../../api/userAccount'
import Loader from '../Loader'
import type { FetchResponse } from '../../types'

export default function VerifyAccount() {
  const navigate = useNavigate()
  const params = useParams()
  const [loading, setLoading] = useState(true)

  const handleVerifyAccount = async () => {
    try {
      if (params.token) {
        const response: FetchResponse = await updateAccountByToken(params.token)
        if (!response.success) {
          navigate('/')
        }
        setLoading(false)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    return () => {
      handleVerifyAccount()
    }
  }, [])

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {loading ? (
        <Loader classProps="w-12 h-12 border-2 border-violet-primary" />
      ) : (
        <div className="flex flex-col px-5 ">
          <h2 className="font-roboto-bold text-xl text-center">
            Se ah verificado tu cuenta con exito!
            {" "}
          </h2>
          <button
            className="bg-indigo-500 text-white py-3 px-2 mt-4 rounded-full uppercase font-roboto-black cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  )
}
