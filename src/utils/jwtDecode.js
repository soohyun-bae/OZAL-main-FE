import { jwtDecode } from "jwt-decode";

export function checkJWTExp(token) {
  try {
    const decode = jwtDecode(token)
    const currentTime = Date.now() / 1000;
    return decode.exp < currentTime;
  } catch (error) {
    return true;
  }
}