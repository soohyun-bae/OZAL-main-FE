import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLogin } from "../RTK/authThunk";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      dispatch(kakaoLogin(code))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setTimeout(() => {
            navigate("/");
          }, 1000); // 2초 후 메인 페이지로 이동
          alert("로그인 중 오류가 발생했습니다.");
        });
    }
  }, [code, dispatch, navigate]);

  return null;
};

export default KakaoCallback;
