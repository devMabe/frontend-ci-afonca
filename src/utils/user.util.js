export const removeToken = () => {
  localStorage.setItem("access_token", "")
  localStorage.setItem("user_data", "")
}

export const userLogged = () => {
  const user = localStorage.getItem("user_data")
  if (user) return JSON.parse(user)
}

export const isLoggedUser = () => {
  const token = localStorage.getItem("access_token")
  if (token) {

    return token ?? true
  }
}