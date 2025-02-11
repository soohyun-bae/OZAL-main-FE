import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const KakaoCallback = () => {
  console.log('rendering KakaoCallback component')
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log('받은 인증 코드:', code);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberUser = false; // 일단 false로

  useEffect(() => {
    console.log('useEffect start')
    if (code) {
      console.log('kakao login api start');
      axios
        .post("http://127.0.0.1:8000/ozal/auth/login/kakao/", { code }, {withCredentials: true})
        .then((response) => {
          console.log("response data:", response);
          const { token, user } = response.data;
          dispatch(setUser({ token, user, rememberUser }));
          navigate("/");
        })
        .catch((error) => {
          console.error("kaakao login error:", error);
        });
    }
  }, [code, dispatch, navigate]);
  return <div></div>;
};

export default KakaoCallback;
