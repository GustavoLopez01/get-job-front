
import { useState } from "react"
import { NavLink } from "react-router"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PlusCircleIcon,
  ListBulletIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ROUTES_RECRUITER } from "../constants"

const getIcon = (icon: string) => {
  switch (icon) {
    case "add-vacancy":
      return (<PlusCircleIcon className="size-4" />)
    case "my-vacancies":
      return (<ListBulletIcon className="size-4" />)
    default:
      return (<UserCircleIcon className="size-4" />)
  }
}

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <nav className="w-full h-20 bg-violet-primary text-white flex items-center">
      <div className="grid grid-cols-2 w-full relative">
        <NavLink
          to="/dashboard"
          className="font-RobotoBlack flex items-center text-3xl pl-10"
        >
          GetJob
        </NavLink>

        <div className="sm:visible md:hidden flex justify-end px-10">
          <BurguerMenu setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>

        <div className="hidden md:flex justify-end items-center pr-10">
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

type BurguerMenuProps = {
  setShowMenu: (showMenu: boolean) => void
  showMenu: boolean
}

export default function BurguerMenu({
  setShowMenu,
  showMenu
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
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-violet-primary/95 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {ROUTES_RECRUITER.map((route) => (
            <MenuItem>
              <NavLink
                to={route.value}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                {getIcon(route.value)}
                {route.label}
              </NavLink>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}