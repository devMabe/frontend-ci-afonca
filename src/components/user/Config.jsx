import Header from "../Header"
import Logo from "../Logo"
import Sidebar from "../Sidebar"

function Config() {
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
        Estoy en desarrollo
      </div>
    </div>
  )
}

export default Config
