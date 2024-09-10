"use server";

import { redirect } from "next/navigation";

const signup = async (prevState: any, formData: FormData) => {
  // 폼 이벤트는 use server 선언

  // 유효성 검사
  if (!formData.get("id")) {
    return { message: "아이디를 입력해주세요." };
  }
  if (!formData.get("name")) {
    return { message: "닉네임을 입력해주세요." };
  }
  if (!formData.get("password")) {
    return { message: "비밀번호를 입력해주세요." };
  }
  if (!formData.get("image")) {
    return { message: "프로필 사진을 입력해주세요." };
  }

  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", // 쿠키 전달
      }
    );

    // 403 에러 테스트
    if (response.status === 403) {
      return { message: "user_exists" };
    }

    // shouldRedirect가 true일때만 redirect 되게 하기위함
    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    // return { message: null };
  }

  if (shouldRedirect) {
    // 홈으로 리다이렉트
    redirect("/home");
  }
};
export default signup;
