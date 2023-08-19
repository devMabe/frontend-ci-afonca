import { useState } from "react"
import { Link } from "react-router-dom"

function Table({ users, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOflastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOflastItem - itemsPerPage
  const currentUsers = users.slice(indexOfFirstItem, indexOflastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold capitalize p-7 hidden">Usuarios registrados</h1>
      <div className=" w-[90%] bg-gray-900 m-auto rounded-xl p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-white capitalize">Usuarios</h2>
            <p className="text-gray-300">
              Una lista de todos los usuarios de su cuenta, con su nombre,
              cargo, correo electrónico y función.
            </p>
          </div>
          <div>
            <Link to="/dashboard/users/create">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm p-2">
                Agregar
              </button>
            </Link>
          </div>
        </div>

        <table className="w-full text-center">
          <thead className="font-bold capitalize  text-white">
            <tr className="border-b">
              <th className="hidden">Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Fecha-nacimiento</th>
              <th>Role</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="text-gray-300 border-b">
                <td className="px-1 py-4 hidden">{user.id}</td>
                <td className="px-1 py-4">{user.firstName}</td>
                <td className="px-1 py-4">{user.lastName}</td>
                <td className="px-1 py-4">{user.email}</td>
                <td className="px-1 py-4">{user.dob ?? "Sin fecha"}</td>
                <td className="px-1 py-4">{user.roles}</td>
                <td className="px-1 py-4">
                  {user.enable ? "Activo" : "Bloqueado"}
                </td>
                <td className="p-2">
                  <Link
                    to={`/dashboard/users/${user.id}/edit`}
                    className="text-indigo-500 font-semibold hover:underline hover:text-indigo-400"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* controles paginacion */}
        <div className="flex justify-center items-center mt-4">
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg mx-1 ${
                  currentPage === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Table
