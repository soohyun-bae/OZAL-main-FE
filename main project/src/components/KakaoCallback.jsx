import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  console.log('rendering KakaoCallback component')
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log('받은 인증 코드:', code);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect start')
    if (code) {
      console.log('kakao login api start');
      axios
        .post("http://127.0.0.1:8000/ozal/auth/login/kakao/", { code }, {withCredentials: true})
        .then((response) => {
          console.log("response data:", response);
          const { token, user } = response.data;
          if(!token || !user) {
            console.error('X token or user');
            return;
          }

          dispatch(setUser({ token, user }));
          
          // if(rememberUser) {
          //   localStorage.setItem('token', token);
          //   localStorage.setItem('auth', JSON.stringify({user: simplifiedUser}));
          //   sessionStorage.removeItem('token')
          // } else {
            // sessionStorage.setItem('token', token);
            // sessionStorage.setItem('auth', JSON.stringify({user: simplifiedUser}));
            // localStorage.removeItem('token')
            // localStorage.removeItem('auth');
          // }
          navigate('/')
        })
        .catch((error) => {
          console.error("kaakao login error:", error);
        });
    }
  }, [code, dispatch, navigate]);
  return <div></div>;
};

export default KakaoCallback;
