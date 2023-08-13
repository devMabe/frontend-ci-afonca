import React from "react"
import Sidebar from "../components/Sidebar"
import Logo from "../components/Logo"
import Header from "../components/Header"
import { isLoggedUser } from "../utils/user.util"

function Dashboard() {
  const isLogged = isLoggedUser()

  const redirect = () =>
    setTimeout(() => {
      location.href = "/login"
    }, 400)

  return isLogged ? (
    <div className="min-h-screen grid grid-cols-6">
      <div className=" col-span-1 bg-black">
        <div className="p-2">
          <Logo />
          <Sidebar />
        </div>
      </div>
      <div className="col-span-5">
        <Header />
      </div>
    </div>
  ) : (
    <div className="bg-black h-screen text-white text-center flex justify-center items-center text-4xl">
      Redirigiendo...
      {redirect()}
    </div>
  )
}

export default Dashboard
