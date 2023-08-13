import { useState } from "react"
import { useResetPasswordUserMutation } from "../redux/store"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaSpinner } from "react-icons/fa/"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [resetPassword] = useResetPasswordUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    const { email } = data
    resetPassword({ email }).then((response) => {
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
      } else {
        toast.success(
          `¡Se ha enviado un código de reseteo al correo ${email} !`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              setTimeout(() => {
                setIsLoading(false)
                location.href = "/confirm-password"
              }, 2000)
            },
          }
        )
      }
    })
  })

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-8 border rounded shadow-black bg-white">
          <h1 className="font-bold text-center text-3xl mb-4">
            CI Afonca - olvidaste tu contraseña
          </h1>
          <p className="p-5 font-light">
            Recupera el control de tu cuenta en unos simples pasos. Olvidar tu
            contraseña ya no es un problema. Sigue nuestro proceso seguro de
            restablecimiento de contraseña y vuelve a acceder a tu cuenta en
            minutos. Tu seguridad es nuestra prioridad.
          </p>
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white rounded p-2 my-2  hover:bg-gray-800"
            >
              {isLoading ? "Enviando código..." : "Enviar código"}
            </button>
            <Link
              className="w-full block text-center bg-black text-white rounded p-2 my-2  hover:bg-gray-800 text-sm"
              to="/login"
            >
              Cancelar
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

export default ResetPassword
