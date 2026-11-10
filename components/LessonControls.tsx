"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/progress";
import { CheckIcon } from "./Icons";

export { LessonCheck } from "./CourseProgress";

export function LessonCompleteBar({
  courseSlug,
  lessonId,
  labels,
}: {
  courseSlug: string;
  lessonId: string;
  labels: { mark: string; done: string };
}) {
  const { progress, setComplete, visit } = useProgress();
  const done = !!progress[courseSlug]?.done.includes(lessonId);

  useEffect(() => {
    visit(courseSlug, lessonId);
  }, [courseSlug, lessonId, visit]);

  return (
    <button
      type="button"
      onClick={() => setComplete(courseSlug, lessonId, !done)}
      aria-pressed={done}
      className={`mt-10 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[16px] font-bold transition ${
        done ? "border-2 border-primary/40 bg-primary-soft text-primary" : "bg-primary text-white hover:bg-primary-dark"
      }`}
    >
      {done && <CheckIcon size={18} strokeWidth={3} />}
      {done ? labels.done : labels.mark}
    </button>
  );
}
