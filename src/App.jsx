import ConfirmPassword from "./pages/ConfirmPassword"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import User from "./components/user/User"
import Config from "./components/user/Config"
import Home from "./pages/Home"
import Create from "./components/user/Create"
import Edit from "./components/user/Edit"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/reset-password" Component={ResetPassword} />
        <Route path="/confirm-password" Component={ConfirmPassword} />
        <Route path="/dashboard/*" Component={Dashboard} />
        <Route path="/dashboard/" Component={Home} />
        <Route path="/dashboard/users" Component={User} />
        <Route path="/dashboard/users/create" Component={Create} />
        <Route path="/dashboard/users/:id/edit" Component={Edit} />
        <Route path="/dashboard/configuracion" Component={Config} />
        <Route path="/" Component={Login} />
      </Routes>
    </Router>
  )
}

export default App
