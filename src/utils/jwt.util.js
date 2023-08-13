import * as jwt from "jsonwebtoken"

export async function decodeToken(token) {
  const decoded = jwt.decode(token)
  console.log(decoded)
  return decoded
}

export default decodeToken
