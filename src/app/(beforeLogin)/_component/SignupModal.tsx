import style from "./signup.module.css";
import BackButton from "./BackButton";
import { redirect } from "next/navigation";

export default function SignupModal() {
  const submit = async (formData: FormData) => {
    // 폼 이벤트는 use server 선언
    "use server";

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
    }

    if (shouldRedirect) {
      // 홈으로 리다이렉트
      redirect("/home");
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
