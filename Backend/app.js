import dotenv from 'dotenv';
dotenv.config()

import cors from 'cors';
import express from 'express';
import { kakaoRouter } from './src/routes/login/kakao.js';
import { userRouter } from './src/routes/user/user.js';

const app = express()
const port = 3000


app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

app.use('/login', kakaoRouter)

app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
