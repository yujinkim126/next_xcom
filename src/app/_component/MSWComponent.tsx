"use client";
import { useEffect } from "react";

const MSWComponent = () => {
  useEffect(() => {
    const initializeMSW = async () => {
      if (
        // 넣지 않으면 서버에서도 동작해서 에러 발생
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        const { worker } = await import("@/mocks/browser");
        worker.start({
          onUnhandledRequest: "bypass", // 가로채지 않은 요청은 서버로 전달
        });
        console.log("[MSW] Mocking enabled.");
      }
    };

    initializeMSW(); // 비동기 초기화 함수 호출
  }, []);

  return null;
};

export default MSWComponent;
