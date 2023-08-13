import { useState } from "react"
import { useConfirmPasswordUserMutation } from "../redux/store"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaSpinner } from "react-icons/fa/"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function ConfirmPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword] = useConfirmPasswordUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    console.log(data)
    const { password, resetcode } = data
    confirmPassword({ newPassword: password, resetCode: resetcode }).then(
      (response) => {
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
            `¡Se ha realizado el cambio de contraseña exitosamente!`,
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
                  location.href = "/login"
                }, 2000)
              },
            }
          )
        }
      }
    )
  })
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-8 border rounded shadow-black bg-white">
          <h1 className="font-bold text-center text-3xl mb-4">
            CI Afonca - nueva contraseña
          </h1>
          <p className="p-5 font-light">
            Para poder cambiar tu contraseña es necesario que ingreses el cógido
            que se te envio por correo
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block font-bold" htmlFor="resetcode">
                Código
                <input
                  id="resetcode"
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  {...register("resetcode", {
                    required: {
                      value: true,
                      message: "*Código es requerido",
                    },
                    minLength: {
                      value: 12,
                      message: "*Código debe ser de 12 caracteres",
                    },
                    maxLength: {
                      value: 12,
                      message: "*Código no puede pasar los 12 caracteres",
                    },
                  })}
                />
                {errors.resetcode && (
                  <span className="text-red-800">
                    {errors.resetcode.message}
                  </span>
                )}
              </label>
            </div>
            {watch("resetcode")?.length === 12 ? (
              <div className="mb-4">
                <label className="block font-bold" htmlFor="password">
                  Nueva contraseña
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
            ) : null}
            {watch("resetcode")?.length === 12 ? (
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
            ) : null}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white rounded p-2 my-2 hover:bg-gray-800"
            >
              {isLoading ? "Cambiando contraseña..." : "Cambiar contraseña"}
            </button>
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

export default ConfirmPassword
