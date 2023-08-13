import React from "react"
import Logo from "../components/Logo"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function Home() {
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
        Bienvenido...
      </div>
    </div>
  )
}

export default Home
