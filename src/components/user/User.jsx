import React, { useMemo, useState } from "react"
import Logo from "../Logo"
import Sidebar from "../Sidebar"
import Header from "../Header"
import Table from "../Table"
import { useUsers } from "../../hooks/hooks"

function User() {
  const { users } = useUsers()
  const itemsPerPage = 5

  const tableComponent = useMemo(() => {
    if (users) {
      return <Table users={users} itemsPerPage={itemsPerPage} />
    }

    return null
  }, [users])

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
        {tableComponent}
      </div>
    </div>
  )
}

export default User
