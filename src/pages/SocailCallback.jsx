import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import backendAPI from "../utils/backendAPI.js";
import { useDispatch } from "react-redux";
import { setUser } from "../RTK/authSlice.js";

export const SocailCallback = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams();

  useEffect( () => {
    const accessToken = params.get('token');

    if (!accessToken) {
      navigate('/')
      return;
    }

    const login = async () => {
      try {
        localStorage.setItem('accessToken', accessToken)
        const getMeResponse = await backendAPI.get('/me')

        dispatch(setUser({
          user: getMeResponse.data.user,
          providers: getMeResponse.data.provider
        }))
        navigate('/')
      } catch (error) {
        console.log('로그인 처리 실패', error);
        localStorage.removeItem('accessToken');
        navigate('/')
      }
    }

    login()
  }, [])

  return null;
}