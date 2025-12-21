import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

export const LoginSuccess = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams();

  useEffect(() => {
    const accessToken = params.get('token');
    if (!accessToken) {
      navigate('/')
      return <div> 실패</div>
    }

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      window.location.href = '/';
      return <div>토큰 받기 성공</div>
    }
  }, [])

  return null;
}