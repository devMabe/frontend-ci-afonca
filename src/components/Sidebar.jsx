import { RiUserSettingsLine, RiLogoutBoxRLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { removeToken } from "../utils/user.util"

function Sidebar() {
  return (
    <>
      {/* sidebar */}
      <div className="flex justify-between flex-col h-[540px]">
        {/* menu */}
        <nav>
          <ul>
            <li>
              <Link
                to="/dashboard/users"
                className="flex items-center gap-4 hover:bg-gray-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
              >
                <RiUserSettingsLine />
                Usuarios
              </Link>
            </li>
          </ul>
        </nav>
        {/* logout */}
        <div className="flex flex-col">
          <button onClick={removeToken}>
            <a
              href="/login"
              className="flex items-center gap-4 hover:bg-gray-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <RiLogoutBoxRLine />
              Cerrar sesión
            </a>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
