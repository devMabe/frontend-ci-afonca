import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Logo from "../Logo"
import Sidebar from "../Sidebar"
import Header from "../Header"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { RiArrowLeftLine } from "react-icons/ri"
import { useCreateUserMutation } from "../../redux/store"

function formatDateForInput(date) {
  const [year, month, day] = date.split("-")
  return `${day}-${month}-${year}`
}

function Create() {
  const [registerUser] = useCreateUserMutation()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    const { username, firstName, lastName, dob, password } = data
    const dateFormat = formatDateForInput(dob)

    registerUser({
      email: username,
      firstName,
      lastName,
      dob: dateFormat,
      password,
    }).then((response) => {
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
        {/* formulario crear  */}
        <div className="flex flex-col justify-center w-full items-center h-[80%]">
          <h1 className="uppercase font-bold underline p-2">
            Registrar usuario
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
                  className="w-full px-4 py-2 border border-gray-900 text-black rounded outline-none"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "*Correo electrónico es requerido",
                    },
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,4}$/,
                      message: "*Correo no válido",
                    },
                  })}
                />
                {errors.username && (
                  <span className="text-red-800">
                    {errors.username.message}
                  </span>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold " htmlFor="username">
                Nombre
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-900 text-black outline-none rounded"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "*Nombre es requerido",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="text-red-800">
                    {errors.firstName.message}
                  </span>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Apellido
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-900 text-black  outline-none rounded"
                  name="lastName"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "*Apellido es requerido",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-800">
                    {errors.lastName.message}
                  </span>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Fecha de nacimiento
                <input
                  id="dob"
                  type="date"
                  className="w-full px-4 py-2 border border-gray-900 text-black rounded outline-none"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "*Fecha de nacimiento es requerido",
                    },
                  })}
                />
                {errors.dob && (
                  <span className="text-red-800">{errors.dob.message}</span>
                )}
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold " htmlFor="password">
                Contraseña
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-900 text-black  outline-none rounded"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "*Contraseña es requerido",
                    },
                    minLength: {
                      value: 6,
                      message: "*Debe contener al menos 6 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-800">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full  text-white rounded p-2 my-2 bg-gray-900 hover:bg-gray-800"
            >
              {isLoading ? "Guardando..." : "Guardar"}
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

export default Create
