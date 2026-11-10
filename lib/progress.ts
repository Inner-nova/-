"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
 * 학습 진도 저장소 (예시 버전: 브라우저 localStorage 사용).
 * 회원 기능을 붙이면 이 파일만 Supabase 저장 방식으로 바꾸면 됩니다.
 */

type Progress = Record<string, { done: string[]; last?: string }>;

const KEY = "aruben:progress:v1";
const EMPTY: Progress = {};
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    cache = parsed && typeof parsed === "object" ? (parsed as Progress) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* 저장 불가 환경(사생활 보호 모드 등)에서는 화면에서만 유지 */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);

  const setComplete = useCallback((course: string, lesson: string, complete: boolean) => {
    const cur = read();
    const entry = cur[course] ?? { done: [] };
    const done = complete
      ? Array.from(new Set([...entry.done, lesson]))
      : entry.done.filter((id) => id !== lesson);
    write({ ...cur, [course]: { ...entry, done } });
  }, []);

  const visit = useCallback((course: string, lesson: string) => {
    const cur = read();
    const entry = cur[course] ?? { done: [] };
    if (entry.last === lesson) return;
    write({ ...cur, [course]: { ...entry, last: lesson } });
  }, []);

  const reset = useCallback(() => write({}), []);

  return { progress, setComplete, visit, reset };
}
