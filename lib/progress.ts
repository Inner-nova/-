"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
 * 학습 진도 저장소 (예시 버전: 브라우저 localStorage 사용).
 * 회원 기능을 붙이면 이 파일만 Supabase 저장 방식으로 바꾸면 됩니다.
 */

type Progress = Record<string, { done: string[]; last?: string }>;

const KEY = "aruben:progress:v1";
const DAYS_KEY = "aruben:days:v1";
const EMPTY: Progress = {};
const EMPTY_DAYS: string[] = [];
const listeners = new Set<() => void>();
let cache: Progress | null = null;
let daysCache: string[] | null = null;

function load<T>(key: string, fallback: T, valid: (v: unknown) => boolean): T {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return valid(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 저장 불가 환경(사생활 보호 모드 등)에서는 화면에서만 유지 */
  }
}

function read(): Progress {
  if (!cache) cache = load<Progress>(KEY, {}, (v) => !!v && typeof v === "object" && !Array.isArray(v));
  return cache;
}

function readDays(): string[] {
  if (!daysCache) daysCache = load<string[]>(DAYS_KEY, [], Array.isArray);
  return daysCache;
}

function notify() {
  listeners.forEach((l) => l());
}

function write(next: Progress) {
  cache = next;
  save(KEY, next);
  notify();
}

function writeDays(next: string[]) {
  daysCache = next;
  save(DAYS_KEY, next);
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cache = null;
    if (e.key === DAYS_KEY) daysCache = null;
    if (e.key === KEY || e.key === DAYS_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** 이 기기의 현지 날짜 (YYYY-MM-DD) */
export function dayKey(date = new Date()) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
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
    // 레슨을 완료한 날은 "훈련한 날"로 기록
    if (complete) {
      const today = dayKey();
      const days = readDays();
      if (!days.includes(today)) writeDays([...days, today].slice(-400));
    }
  }, []);

  const visit = useCallback((course: string, lesson: string) => {
    const cur = read();
    const entry = cur[course] ?? { done: [] };
    if (entry.last === lesson) return;
    write({ ...cur, [course]: { ...entry, last: lesson } });
  }, []);

  const reset = useCallback(() => {
    write({});
    writeDays([]);
  }, []);

  return { progress, setComplete, visit, reset };
}

/** 훈련한 날짜 목록 */
export function useTrainingDays() {
  return useSyncExternalStore(subscribe, readDays, () => EMPTY_DAYS);
}

/** 오늘(또는 오늘 아직 안 했으면 어제)부터 거꾸로 이어진 연속 훈련 일수 */
export function streakOf(days: string[], today = new Date()) {
  const set = new Set(days);
  const cursor = new Date(today);
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (set.has(dayKey(cursor))) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}
