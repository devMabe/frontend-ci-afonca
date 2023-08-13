import { useState } from "react"
import { useLoginUserMutation } from "../redux/store"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaSpinner } from "react-icons/fa/"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

function Login() {
  const [loginUser] = useLoginUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    const { email, password } = data
    loginUser({ username: email, password }).then((response) => {
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
        const userData = response.data.userData
        localStorage.setItem("access_token", response.data.accessToken)
        localStorage.setItem("user_data", JSON.stringify(userData))

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
          <h1 className="font-bold text-center text-3xl mb-4">CI Afonca</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="username">
                Correo electrónico
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  {...register("email", {
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
                {errors.email && (
                  <span className="text-red-800">{errors.email.message}</span>
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
                      message: "*La contraseña es requerida",
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
              className="w-full bg-black text-white rounded p-2 my-2 hover:bg-gray-800"
            >
              {isLoading ? "Iniciando..." : "Iniciar sesión"}
            </button>

            <Link
              to="/register"
              className="text-center text-gray-700 underline"
            >
              ¿No tienes cuenta? Crea una aquí
            </Link>
            <br />
            <Link
              to="/reset-password"
              className="text-center text-gray-700 underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </form>
        </div>
      </div>
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
      <div className="flex-grow bg-gray-950 shadow-transparent">
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
