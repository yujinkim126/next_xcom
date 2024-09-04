import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", () => {
    // DB에서 유저 정보를 가져와서 보내주는 곳 (지금은 하드코딩)
    return HttpResponse.json(
      {
        userId: 1,
        nickname: "yujinzzang",
        id: "yujin126",
        image: "/5Udwvgim.jpg",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw.cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  http.post("/api/logout", () => {
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookie": "connect.sid=; HttpOnly; Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/users", async () => {
    console.log("회원가입");
    return HttpResponse.text(JSON.stringify("user_exists"), {
      status: 403,
    });
    // return HttpResponse.text(JSON.stringify("ok"), {
    //   headers: {
    //     "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
    //   },
    // });
  }),
];
