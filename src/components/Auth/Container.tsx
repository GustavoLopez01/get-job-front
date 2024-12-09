import { useState } from "react"
import { Login } from "./Login"
import { Register } from "./Register"

export const Container = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      <div>
        <div className="md:w-[800px] md:shadow-md flex md:flex-row flex-col justify-center items-center min-h-[550px] md:border-2 rounded-2xl">
            <Register showLogin={showLogin} />
            <Login showLogin={showLogin} />
        </div>
        <div className="flex justify-center pt-4 md:pb-0 pb-5">
          <button 
            className={`cursor-pointer bg-gray-button w-3 h-3 rounded-full mr-4 ${!showLogin && 'bg-violet-primary'}`} 
            onClick={() => setShowLogin(false)}></button>
          <button 
            className={`cursor-pointer bg-gray-button w-3 h-3 rounded-full ml-4 ${showLogin && 'bg-violet-primary'}`}
            onClick={() => setShowLogin(true)}
            ></button>
        </div>
      </div>
    </>
  )
}
