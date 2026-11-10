export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** 한/영 두 언어로 쓰는 텍스트 */
export type L10n = Record<Locale, string>;

export function tr(text: L10n, locale: Locale) {
  return text[locale];
}

const dictionaries = {
  ko: {
    brand: "아루벤",
    tagline: "마음을 비우고, 나에게 돌아오는 배움",
    nav: { courses: "강의", library: "전자책 서재", my: "내 학습" },
    home: {
      heroTitle: "고요 속에서\n나를 다시 만나는 시간",
      heroBody:
        "아루벤은 명상, 비움, 내면 탐구를 단계별로 배우는 영성 교육 공간입니다. 누구나 무료 전자책과 강의로 시작할 수 있어요.",
      ctaCourses: "강의 둘러보기",
      ctaLibrary: "무료 전자책 읽기",
      featured: "추천 강의",
      featuredBody: "처음이라면 호흡 명상 입문부터 시작해 보세요.",
      libraryTitle: "무료 전자책 서재",
      libraryBody: "언제든 꺼내 읽을 수 있는 짧은 글들을 모았습니다.",
      howTitle: "이렇게 배워요",
      steps: [
        { t: "코스 선택", d: "관심 있는 주제의 코스를 고르세요." },
        { t: "주차별 학습", d: "짧은 레슨과 실천 과제로 하루 10~15분씩." },
        { t: "진도 기록", d: "완료한 레슨이 기록되고, 언제든 이어서 볼 수 있어요." },
      ],
      viewAll: "전체 보기",
    },
    course: {
      level: { beginner: "입문", intermediate: "중급" },
      lessons: "레슨",
      minutes: "분",
      modules: "주차",
      start: "수강 시작하기",
      continue: "이어서 학습하기",
      free: "무료",
      outcomes: "이 코스에서 얻는 것",
      curriculum: "커리큘럼",
      instructor: "안내자",
      progress: "진도",
      allCategories: "전체",
      catalogTitle: "강의 둘러보기",
      catalogBody: "내 속도에 맞춰 단계별로 배우는 코스들입니다.",
    },
    lesson: {
      markComplete: "완료로 표시",
      completed: "완료됨",
      prev: "이전 레슨",
      next: "다음 레슨",
      backToCourse: "코스로 돌아가기",
      practice: "오늘의 실천",
      videoSoon: "영상은 준비 중입니다",
      type: { video: "영상", reading: "읽기", practice: "실습" },
      breath: { inhale: "들이쉬기", hold: "머물기", exhale: "내쉬기", start: "호흡 안내 시작", stop: "멈추기" },
    },
    library: {
      title: "무료 전자책 서재",
      body: "로그인 없이 누구나 읽을 수 있어요.",
      read: "바로 읽기",
      chapters: "장",
      pages: "분 분량",
      back: "서재로 돌아가기",
      toc: "목차",
    },
    my: {
      title: "내 학습",
      note: "지금은 진도가 이 브라우저에만 저장됩니다. 회원 기능이 추가되면 계정에 저장되어 어느 기기에서든 이어볼 수 있어요.",
      empty: "아직 시작한 코스가 없어요.",
      browse: "강의 둘러보기",
      reset: "진도 초기화",
      done: "수료",
    },
    footer: {
      about: "아루벤은 누구나 편안하게 배우는 영성 교육 공간입니다.",
      contact: "문의는 준비 중인 문의 양식으로 받을 예정입니다.",
    },
  },
  en: {
    brand: "Aruben",
    tagline: "Learning to let go and return to yourself",
    nav: { courses: "Courses", library: "Library", my: "My Learning" },
    home: {
      heroTitle: "A quiet place\nto meet yourself again",
      heroBody:
        "Aruben is a spiritual learning space for meditation, letting go, and inner inquiry, step by step. Start anytime with free ebooks and courses.",
      ctaCourses: "Browse courses",
      ctaLibrary: "Read free ebooks",
      featured: "Featured courses",
      featuredBody: "New here? Begin with Breath Meditation Basics.",
      libraryTitle: "Free ebook library",
      libraryBody: "Short readings you can return to anytime.",
      howTitle: "How it works",
      steps: [
        { t: "Choose a course", d: "Pick a topic that speaks to you." },
        { t: "Learn week by week", d: "Short lessons and practices, 10–15 minutes a day." },
        { t: "Track your progress", d: "Completed lessons are saved so you can pick up anytime." },
      ],
      viewAll: "View all",
    },
    course: {
      level: { beginner: "Beginner", intermediate: "Intermediate" },
      lessons: "lessons",
      minutes: "min",
      modules: "Week",
      start: "Start course",
      continue: "Continue learning",
      free: "Free",
      outcomes: "What you'll gain",
      curriculum: "Curriculum",
      instructor: "Guide",
      progress: "Progress",
      allCategories: "All",
      catalogTitle: "Browse courses",
      catalogBody: "Step-by-step courses you can take at your own pace.",
    },
    lesson: {
      markComplete: "Mark as complete",
      completed: "Completed",
      prev: "Previous",
      next: "Next lesson",
      backToCourse: "Back to course",
      practice: "Today's practice",
      videoSoon: "Video coming soon",
      type: { video: "Video", reading: "Reading", practice: "Practice" },
      breath: { inhale: "Breathe in", hold: "Hold", exhale: "Breathe out", start: "Start breathing guide", stop: "Stop" },
    },
    library: {
      title: "Free ebook library",
      body: "Free for everyone, no sign-in needed.",
      read: "Read now",
      chapters: "chapters",
      pages: "min read",
      back: "Back to library",
      toc: "Contents",
    },
    my: {
      title: "My Learning",
      note: "For now, progress is saved only in this browser. Once accounts are added, it will sync across your devices.",
      empty: "You haven't started a course yet.",
      browse: "Browse courses",
      reset: "Reset progress",
      done: "Completed",
    },
    footer: {
      about: "Aruben is a gentle space for spiritual learning, open to everyone.",
      contact: "A contact form is coming soon.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
