import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const MainLayout = () => {
  return (
    <>
        <Navbar />
          <div className="md:max-w-5xl min-h-[550px] mx-auto">
            <Outlet />
          </div>
        <Footer />
    </>
  )
}
