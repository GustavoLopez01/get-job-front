
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAppDispatch } from '../store/store'
import {
  GENERAL_ROUTES,
  ROUTES_RECRUITER,
  ROUTES_WORKER
} from '../constants'
import { clearAllCookies, getCookieByKey } from '../helpers'
import type { DataUser, Route } from '../types'
import { logout } from '../api/login'
import {
  PlusCircleIcon,
  ListBulletIcon,
  UserCircleIcon,
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'
import { getUser } from '../api/user'
import { setData } from '../store/userSlice'

type BurguerMenuProps = {
  showMenu: boolean
  routes: Route[]
  setShowMenu: (showMenu: boolean) => void
  handleLogout: () => void
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "add-vacancy":
      return (<PlusCircleIcon className="size-4" />)
    case "my-vacancies":
      return (<ListBulletIcon className="size-4" />)
    case "home":
      return (<HomeIcon className="size-4" />)
    default:
      return (<UserCircleIcon className="size-4" />)
  }
}

export const Navbar = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = getCookieByKey()

  const [showMenu, setShowMenu] = useState(false)
  const [userData, setUserData] = useState<DataUser>({
      fullName: '',
      email: '',
      roleId: 0
  })

  const handleLogout = async () => {
    await logout()
    clearAllCookies()
    sessionStorage.clear()
    navigate("/")
  }

  const handleGetDataUser = async () => {
    try {
        const response: DataUser = await getUser()
        if(response.roleId) {
          const user = {
            roleId: response.roleId,
            fullName: response.fullName,
            email: response.email
          }
          dispatch(setData(user))
          setUserData(user)
        }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(location.pathname !== '/' && userData.roleId === 0) {
      handleGetDataUser()
    }
  }, [userData.roleId, location.pathname])

  useEffect(() => {
    if (!token) navigate("/")
  }, [token])

  const routes = useMemo(() => {
    const { roleId } = userData
    if (roleId > 2 || roleId < 1) return []
    if (roleId === 1) {
      return [...GENERAL_ROUTES, ...ROUTES_RECRUITER]
    }
    return [...GENERAL_ROUTES, ...ROUTES_WORKER]
  }, [userData.roleId])

  return (
    <nav className="w-full h-20 bg-violet-primary text-white flex items-center">
      <div className="flex w-full relative">
        <NavLink
          to="/dashboard"
          className="font-roboto-black w-1/4 flex items-center text-3xl pl-10"
        >
          GetJob
        </NavLink>

        <div className="sm:visible md:hidden flex flex-1 justify-end px-10">
          <BurguerMenu
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            routes={routes}
            handleLogout={handleLogout}
          />
        </div>

        {token && (
          <div className={`hidden md:flex flex-1 justify-end items-center pr-10 ${!token && ''}`}>
            {
              routes.map((route) => (
                <NavLink
                  key={route.value}
                  className="px-2 hover:underline font-roboto-bold"
                  to={`/${route.value}`}>
                  {route.label}
                </NavLink>
              ))
            }
            <button
              className="px-5 py-2 flex items-center gap-2 bg-indigo-800  rounded-md font-roboto-bold"
              onClick={handleLogout}
            >
              <ArrowLeftStartOnRectangleIcon className="size-5" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}


export default function BurguerMenu({
  setShowMenu,
  showMenu,
  routes,
  handleLogout
}: BurguerMenuProps) {
  return (
    <div className="top-24 w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 ">
          <Bars3Icon
            className="sm:visible md:hidden w-10 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-violet-primary/95 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-hidden data-closed:scale-95 data-closed:opacity-0"
        >
          {routes.map((route) => (
            <MenuItem key={route.value}>
              <NavLink
                to={route.value}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10">
                {getIcon(route.value)}
                {route.label}
              </NavLink>
            </MenuItem>
          ))}
          <MenuItem>
            <div
              className="group cursor-pointer flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10"
              onClick={handleLogout}
            >
              <ArrowLeftStartOnRectangleIcon className="size-5" />
              Cerrar sesión
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}