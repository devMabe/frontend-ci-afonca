import { RiArrowDownSLine, RiSearchLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { userLogged } from "../utils/user.util"

function Header() {
  const user = userLogged()

  return (
    <header className="flex items-center justify-between p-4 ">
      <form className="w-[30%]">
        <div className="relative w-full">
          <RiSearchLine className="absolute left-2 top-3" />
          <input
            type="text"
            className="bg-gray-100 py-2 pl-8 pr-4 outline-none rounded-lg w-full"
            placeholder="Buscar..."
          />
        </div>
      </form>
      {/* Nofiticaciones */}
      <nav className="w-[70%] flex justify-end">
        <ul className="flex items-center">
          <li>
            <Link className="flex items-center gap-1 font-bold bg-gray-200 p-2 rounded-lg">
              {user?.firstName} {user?.lastName} <RiArrowDownSLine />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
