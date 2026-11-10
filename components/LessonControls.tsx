"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/progress";

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
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={() => setComplete(courseSlug, lessonId, !done)}
        aria-pressed={done}
        className={`flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition ${
          done ? "bg-sage text-white hover:bg-sage/85" : "bg-ink text-white hover:bg-ink/85"
        }`}
      >
        {done ? "✓ " + labels.done : labels.mark}
      </button>
    </div>
  );
}
