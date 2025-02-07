import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (code) {
      axios
        .post("http://ozal/auth/login/kakao", { code })
        .then((response) => {
          console.log(response)
          const { token, user } = response.data;
          const rememberUser = false;

          dispatch(setUser({ token, user, rememberUser }));
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
