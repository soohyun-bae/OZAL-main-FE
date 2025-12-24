import { db } from "../db/index.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";

export const kakaoLoginQuery = async (kakaoUser) => {
  const providerId = kakaoUser.id

  const checkRegister = await db.query(
    `
    SELECT user_id FROM user_auth
    WHERE provider='KAKAO' AND provider_id=$1
    `,
    [providerId]
  );

  let userId;

  if (checkRegister.rows.length === 0) {
    const insertUser = await db.query(
      `
      INSERT INTO users (nickname, email, profile_image, name)
      VALUES ($1, $2, $3, $4) RETURNING id
      `,
      [
        kakaoUser.kakao_account.profile.nickname,
        kakaoUser.kakao_account.email,
        kakaoUser.kakao_account.profile.profile_image_url,
        kakaoUser.kakao_account.name
      ]
    )

    userId = insertUser.rows[0].id;

    await db.query(
      `
      INSERT INTO user_auth (user_id, provider, provider_id)
      VALUES ($1, 'KAKAO', $2)
      `,
      [userId, providerId]
    )
  } else {
    userId = checkRegister.rows[0].user_id
  }

  return {
    accessToken: createAccessToken(userId),
    refreshToken: createRefreshToken(userId)
  }
}

export const getMeQuery = async (userId) => {
  const provider = await db.query(
    `
    SELECT provider
    FROM user_auth
    WHERE user_id = $1
    `,
    [userId]
  )

  const meData = await db.query(
    `
    SELECT id, nickname, email, profile_image, name
    FROM users
    WHERE id = $1
    `,
    [userId]
  )

  return {
    user: meData.rows[0],
    providers: provider?.rows?.map((row) => row.provider)
  }
}