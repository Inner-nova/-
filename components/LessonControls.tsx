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
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={() => setComplete(courseSlug, lessonId, !done)}
        aria-pressed={done}
        className={done ? "btn-ghost !px-6 !py-3 !text-[15px] text-gold" : "btn-primary"}
      >
        <CheckIcon size={17} strokeWidth={2.4} />
        {done ? labels.done : labels.mark}
      </button>
    </div>
  );
}
