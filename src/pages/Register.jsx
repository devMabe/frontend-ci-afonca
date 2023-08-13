import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useRegisterUserMutation } from "../redux/store"
import "react-toastify/dist/ReactToastify.css"
import { FaSpinner } from "react-icons/fa/"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

function Register() {
  const [registerUser] = useRegisterUserMutation()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    const { username, firstName, lastName, password } = data
    registerUser({
      email: username,
      firstName,
      lastName,
      password,
    }).then((response) => {
      if (response.error) {
        setIsLoading(false)
        toast.error(`¡${response.error.data.message}!`, {
          position: "top-center",
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
        localStorage.setItem("access_token", response.data.accessToken)
        const redirect = () =>
          setTimeout(() => {
            setIsLoading(false)
            location.href = "/dashboard"
          }, 1000)

        redirect()
        setIsLoading(false)
      }
    })
  })

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-8 border rounded shadow-black bg-white">
          <h1 className="font-bold text-center text-3xl mb-4">CI Afonca </h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Correo Electrónico
                <input
                  id="username"
                  type="email"
                  className="w-full px-4 py-2 border rounded"
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
              <label className="block font-bold" htmlFor="username">
                Nombre
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-4 py-2 border rounded"
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
                  className="w-full px-4 py-2 border rounded"
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
              <label className="block font-bold" htmlFor="password">
                Contraseña
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded"
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
            <div className="mb-4">
              <label className="block font-bold" htmlFor="password">
                Confirmar contraseña
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 border rounded"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "*Confirmar contraseña es requerido",
                    },
                    minLength: {
                      value: 6,
                      message: "*Debe contener al menos 6 caracteres",
                    },
                    validate: (value) => {
                      if (value === watch("password")) {
                        return true
                      } else {
                        return "*Las contraseñas no coinciden"
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-800">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white rounded p-2 my-2 hover:bg-gray-800"
            >
              {isLoading ? "Registrando..." : "Crear cuenta"}
            </button>
            <Link to="/login" className="text-center text-gray-700 underline">
              ¿Ya tiene cuenta? Inicie aquí
            </Link>
          </form>
        </div>
      </div>
      <div className="flex-grow  bg-gray-950 shadow-transparent"></div>
      <div
        className={`fixed top-0 left-0 w-full h-full ${
          isLoading
            ? "flex items-center justify-center bg-black bg-opacity-50"
            : "hidden"
        }`}
      >
        {" "}
        <FaSpinner className="animate-spin  text-black text-4xl" />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
