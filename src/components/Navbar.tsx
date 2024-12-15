
import { NavLink } from "react-router"
import { ROUTES_RECRUITER } from "../constants"

export const Navbar = () => {

  return (
    <nav className="w-full h-20 bg-violet-primary text-white flex items-center">
        <div className="grid grid-cols-2 w-full">
          <NavLink
            to="/dashboard"
            className="font-RobotoBlack text-3xl pl-10"
          >
            GetJob
          </NavLink>
          <div className="flex justify-end items-center pr-10">
            {
              ROUTES_RECRUITER.map((route, index) => (
                <NavLink
                  key={index}
                  className="px-2 hover:underline font-RobotoBold" 
                  to={`/${route.value}`}>
                     {route.label} 
                </NavLink>
              ))
            }
          </div>
        </div>
    </nav>
  )
}
