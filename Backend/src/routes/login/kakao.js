import { Router } from "express";
import { kakaoLogin, redirectToKakao } from "../../controllers/login/kakao.js";

export const kakaoRouter = Router();

kakaoRouter.get('/kakao', redirectToKakao)
kakaoRouter.get('/callback/kakao', kakaoLogin)