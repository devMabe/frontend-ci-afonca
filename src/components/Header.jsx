import { Link } from "react-router-dom"
import { userLogged } from "../utils/user.util"

function Header() {
  const user = userLogged()

  return (
    <header className="flex items-center justify-between p-4 ">
      <form className="w-[28%]">
        <div className="relative w-full bg-gray-200 rounded-lg">
          <h2 className="font-bold p-2">
            Ingresaste como:{" "}
            {user?.roles === "ADMIN" ? "Administrador 👨‍💻" : "Operador 🧑‍💻"}
          </h2>
        </div>
      </form>
      {/* Nofiticaciones */}
      <nav className="w-[70%] flex justify-end">
        <ul className="flex items-center">
          <li>
            <Link className="flex items-center gap-1 font-bold bg-gray-200 p-2 rounded-lg">
              Hola 👋 {user?.firstName} {user?.lastName}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
