// 미리보기 전용: Next.js 라우터 대신 페이지 안에서만 주소를 바꾸는 간단한 라우터.
import { useSyncExternalStore } from "react";

let current = "/ko";
const listeners = new Set();

export function getUrl() {
  return current;
}

export function navigate(url, { replace = false } = {}) {
  if (url.startsWith("#")) {
    document.getElementById(url.slice(1))?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const prevPath = current.split("?")[0];
  current = url;
  listeners.forEach((l) => l());
  if (!replace && prevPath !== url.split("?")[0]) window.scrollTo(0, 0);
}

export function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useUrl() {
  return useSyncExternalStore(subscribe, getUrl, getUrl);
}

export function usePathname() {
  return useUrl().split("?")[0];
}

export function useSearchParams() {
  const q = useUrl().split("?")[1] ?? "";
  return new URLSearchParams(q);
}

export function useRouter() {
  return {
    push: (u) => navigate(u),
    replace: (u) => navigate(u, { replace: true }),
    back: () => history.back(),
  };
}

export class NotFoundError extends Error {}
export function notFound() {
  throw new NotFoundError("not found");
}
