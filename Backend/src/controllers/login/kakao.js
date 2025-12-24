import { kakaoLoginQuery } from "../../repositories/user.js";
import { getAuthorizeUrl, getKakaoToken, getKakaoUser } from "../../services/login/kakao.js";


export const redirectToKakao = (req, res) => {
  const getAuthorize = getAuthorizeUrl()
  res.redirect(getAuthorize)
}

export const kakaoLogin = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: '인가 코드가 없습니다.'
      })
    }

    const kakaoToken = await getKakaoToken(code)
    const kakaoUser = await getKakaoUser(kakaoToken)

    const { accessToken, refreshToken } = await kakaoLoginQuery(kakaoUser)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      // secure: true,
    })

    res.redirect(`${process.env.FRONTEND_BASE_URL}/login/callback?token=${accessToken}`)
  }
  catch (error) {
    res.status(401).json({ message: '카카오 로그인 실패' })
  }
}