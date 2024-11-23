import { Login } from "./Login"
import { Register } from "./Register"

export const Container = () => {
  return (
    <>
        <div className="md:w-[800px] md:shadow-md flex md:flex-row flex-col justify-center items-center min-h-[550px] md:border-2 rounded-2xl">
            <Register />
            <Login />
        </div>
    </>
  )
}
