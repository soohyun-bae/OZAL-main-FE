import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLogin } from "../RTK/authThunk";

const KakaoCallback = () => {
  console.log('rendering KakaoCallback component')
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log('받은 인증 코드:', code);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const rememberUser = false; // 일단 false로

  useEffect(() => {
    console.log('useEffect start')
    if (code) {
      dispatch(kakaoLogin(code))
        .unwrap()
        .then(() => {
          navigate('/mypage')
        })
        .catch((error) => {
          console.error('login fail:', error);
        });
    }
  }, [code, dispatch, navigate]);

  return <div></div>;
};

export default KakaoCallback;
