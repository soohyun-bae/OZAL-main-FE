import jwt_decode from "jwt-decode";

export function checkJWTExp(token) {
  try {
    const decode = jwt_decode(token)
    const currentTime = Date.now() / 1000;
    return decode.exp < currentTime;
  } catch (error) {
    return true;
  }
}