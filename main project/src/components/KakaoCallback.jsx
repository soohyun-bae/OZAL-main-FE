import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const rememberUser = false; // 일단 false로

  useEffect(() => {
    if (code) {
      axios
        .post("http://localhost:8000/ozal/auth/login/kakao/", { code })
        .then((response) => {
          const { token, user } = response.data;
          dispatch(setUser({ token, user, rememberUser }));
          navigate('/')
        })
        .catch((error) => {
          console.error("kaakao login error:", error);
        });
    }
  }, [code, dispatch, navigate, rememberUser]);
  return <div></div>;
};

export default KakaoCallback;
