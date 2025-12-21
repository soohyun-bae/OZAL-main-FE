export const getMe = async (req, res) => {
  const {userId} = req.user;

  const result = await getMeQuery(userId)

  if(result.row.length === 0) {
    return res.status(404).json({message: '가입되지 않은 사용자입니다.'});
  }

  res.json(result.row[0]);
}