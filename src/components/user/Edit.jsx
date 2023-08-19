import React, { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser } from "../../hooks/hooks"
import { useForm } from "react-hook-form"
import Logo from "../Logo"
import Sidebar from "../Sidebar"
import Header from "../Header"
import { RiArrowLeftLine } from "react-icons/ri"
import { useUpdateUserMutation } from "../../redux/store"
import { ToastContainer, toast } from "react-toastify"

function formatDateForInput(date) {
  const [year, month, day] = date.split("-")
  return `${day}-${month}-${year}`
}

function formatDateForRed(date) {
  if (date) {
    const [day, month, year] = date.split("-")
    return `${year}-${month}-${day}`
  }
}

function Edit() {
  const [updateUser] = useUpdateUserMutation()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { user } = useUser(id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    const { firstName, lastName, dob } = data
    const dateFormat = formatDateForInput(dob)
    let id = window.location.href.split(/\/([^/]+)\/edit$/)[1]
    let userData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(dob && { dob: dateFormat }),
    }

    updateUser({ id, userData }).then((response) => {
      if (response.error) {
        setIsLoading(false)
        toast.error(`¡${response.error.data.message}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }

      if (response.data) {
        const redirect = () =>
          setTimeout(() => {
            setIsLoading(false)
            location.href = "/dashboard/users"
          }, 1000)

        redirect()
        setIsLoading(false)
      }
      setIsLoading(false)
    })
  })

  return (
    <div className="min-h-screen grid grid-cols-6">
      <div className=" col-span-1 bg-black">
        <div className="p-2">
          <Logo />
          <Sidebar />
        </div>
      </div>
      <div className="col-span-5">
        <Header />
        {/* formulario actualizar  */}
        <div className="flex flex-col justify-center w-full items-center h-[80%]">
          <h1 className="uppercase font-bold underline p-2">
            Actualizar usuario
          </h1>
          <form
            onSubmit={onSubmit}
            className=" border-2  p-3 rounded-xl w-1/2 "
          >
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Correo Electrónico
                <input
                  id="username"
                  type="email"
                  readOnly
                  defaultValue={user ? user.email : ""}
                  className="w-full px-4 py-2 border border-gray-900 text-black rounded outline-none"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold " htmlFor="username">
                Nombre
                <input
                  id="firstName"
                  type="text"
                  defaultValue={user ? user.firstName : ""}
                  className="w-full px-4 py-2 border border-gray-900 text-black outline-none rounded"
                  {...register("firstName")}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Apellido
                <input
                  id="lastName"
                  defaultValue={user ? user.lastName : ""}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-900 text-black  outline-none rounded"
                  {...register("lastName")}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Fecha de nacimiento
                <input
                  id="dob"
                  type="date"
                  defaultValue={user ? formatDateForRed(user.dob) : ""}
                  className="w-full px-4 py-2 border border-gray-900 text-black rounded outline-none"
                  {...register("dob")}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full  text-white rounded p-2 my-2 bg-gray-900 hover:bg-gray-800"
            >
              {isLoading ? "Actualizando..." : "Actualizar"}
            </button>
            <Link
              to="/dashboard/users"
              className="text-center text-gray-900  hover:text-black hover:underline text-xl"
            >
              <RiArrowLeftLine className="inline-block" />
              Regresar
            </Link>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Edit
