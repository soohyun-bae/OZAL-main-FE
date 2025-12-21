import { KAKAO_AUTHORIZE_URL, KAKAO_TOKEN_URL, KAKAO_USER_URL } from "../../config/login.js";

export const getAuthorizeUrl = () => {
  return (
    `${KAKAO_AUTHORIZE_URL}?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`
  )
}

export const getKakaoToken = async (code) => {
  const tokenResponse = await fetch(KAKAO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: code,
      client_secret: process.env.KAKAO_CLIENT_SECRET
    })
  })

  const tokenData = await tokenResponse.json()
  return tokenData.access_token;
}

export const getKakaoUser = async (accessToken) => {
  const userResponse = await fetch(KAKAO_USER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': `Bearer ${accessToken}`
    },
  })

  const userData = await userResponse.json()
  return userData;
}