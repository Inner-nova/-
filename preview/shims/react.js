// 미리보기 전용: CDN에서 불러온 전역 React를 모듈처럼 씁니다.
const R = window.React;
export default R;
export const {
  Children,
  Fragment,
  Suspense,
  createElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} = R;
