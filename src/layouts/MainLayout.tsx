import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const MainLayout = () => {
  return (
    <>
      <div className="w-full h-full">
        <Navbar />
        <div className="md:max-w-5xl min-h-[550px] mx-auto flex justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
