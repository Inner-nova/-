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

/** "{a}개 중 {b}개" 같은 문구에 값 채우기 */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));
}

const dictionaries = {
  ko: {
    brand: "아루벤",
    tagline: "마음을 비우고, 나에게 돌아오는 배움",
    description:
      "아루벤은 명상, 비움, 내면 탐구를 단계별로 배우는 영성 교육 공간입니다. 누구나 무료 전자책과 강의로 시작할 수 있어요.",
    nav: { explore: "탐색", courses: "강의", my: "학습", library: "서재", search: "검색" },
    common: { viewAll: "모두 보기", provider: "아루벤", course: "코스", ebook: "전자책", free: "무료" },
    home: {
      heroEyebrow: "ARUBEN · SPIRITUAL ACADEMY",
      heroTitle: "고요 속에서,\n나에게 돌아오는 시간",
      heroBody: "명상과 비움, 내면 탐구를 단계별로 배우는 영성 교육 공간. 모든 강의와 전자책을 무료로 시작할 수 있어요.",
      ctaStart: "첫 강의 시작하기",
      ctaLibrary: "무료 전자책",
      quoteLabel: "오늘의 문장",
      quote: "그릇이 쓸모 있는 것은 비어 있기 때문입니다.",
      quoteSource: "『비움 노트』 중에서",
      eyebrows: { topics: "TOPICS", start: "BEGIN HERE", all: "ALL COURSES", ebooks: "FREE LIBRARY" },
      title: "탐색",
      topics: "주제",
      bannerBrand: "아루벤 OPEN",
      bannerBody: "모든 강의와 전자책, 무료",
      bannerCta: "자세히 알아보기",
      startHere: "처음 시작하기",
      allCourses: "전체 강의",
      ebooks: "무료 전자책",
    },
    course: {
      level: { beginner: "입문", intermediate: "중급" },
      lessons: "레슨",
      minutes: "분",
      weeks: "주 과정",
      start: "수강 시작하기",
      continue: "이어서 학습하기",
      outcomes: "이 코스에서 얻는 것",
      curriculum: "커리큘럼",
      instructor: "안내자",
      instructorBody: "아루벤 안내자 · 명상과 비움을 함께 걷는 동반자",
      progress: "진도",
      allCategories: "전체",
      catalogTitle: "강의",
      catalogBody: "내 속도에 맞춰 단계별로 배우는 코스들입니다.",
    },
    lesson: {
      markComplete: "완료로 표시",
      completed: "완료됨",
      prev: "이전",
      next: "다음",
      backToCourse: "코스로 돌아가기",
      practice: "오늘의 실천",
      videoSoon: "영상은 준비 중입니다",
      type: { video: "영상", reading: "읽기", practice: "실습" },
      breath: { inhale: "들이쉬기", hold: "머물기", exhale: "내쉬기", start: "호흡 안내 시작", stop: "멈추기" },
    },
    library: {
      title: "서재",
      body: "로그인 없이 누구나 읽을 수 있는 무료 전자책입니다.",
      read: "바로 읽기",
      chapters: "장",
      readTime: "{n}분 분량",
      back: "서재로 돌아가기",
      toc: "목차",
    },
    my: {
      eyebrow: "MY JOURNEY",
      resume: "이어가기",
      overall: "전체 진도",
      title: "나의 학습",
      note: "지금은 진도가 이 브라우저에만 저장됩니다. 회원 기능이 추가되면 어느 기기에서든 이어볼 수 있어요.",
      empty: "아직 시작한 코스가 없어요.",
      emptyBody: "마음에 드는 코스를 골라 첫 레슨을 시작해 보세요.",
      browse: "강의 탐색하기",
      reset: "진도 초기화",
      remaining: "레슨 {total}개 중 {left}개 남음",
      notStarted: "시작되지 않음",
      completed: "완료됨",
      percent: "{n}% 완료",
      start: "시작하기",
      continue: "이어가기",
      collapse: "접기",
      expand: "펼치기",
    },
    search: {
      title: "검색",
      placeholder: "강의, 전자책 검색",
      suggestions: "추천 검색어",
      suggestionList: ["명상", "호흡", "비움", "직관"],
      empty: "검색 결과가 없어요.",
      results: "검색 결과 {n}개",
    },
    footer: {
      about: "아루벤은 누구나 편안하게 배우는 영성 교육 공간입니다.",
      contact: "문의 양식은 준비 중입니다.",
    },
  },
  en: {
    brand: "Aruben",
    tagline: "Learning to let go and return to yourself",
    description:
      "Aruben is a spiritual learning space for meditation, letting go, and inner inquiry, step by step. Start anytime with free ebooks and courses.",
    nav: { explore: "Explore", courses: "Courses", my: "Learning", library: "Library", search: "Search" },
    common: { viewAll: "View all", provider: "Aruben", course: "Course", ebook: "Ebook", free: "Free" },
    home: {
      heroEyebrow: "ARUBEN · SPIRITUAL ACADEMY",
      heroTitle: "In stillness,\nreturn to yourself",
      heroBody: "A spiritual learning space for meditation, letting go, and inner inquiry, step by step. Every course and ebook is free to begin.",
      ctaStart: "Start your first course",
      ctaLibrary: "Free ebooks",
      quoteLabel: "Words for today",
      quote: "A bowl is useful because it is empty.",
      quoteSource: "from Notes on Emptiness",
      eyebrows: { topics: "TOPICS", start: "BEGIN HERE", all: "ALL COURSES", ebooks: "FREE LIBRARY" },
      title: "Explore",
      topics: "Topics",
      bannerBrand: "Aruben OPEN",
      bannerBody: "Every course and ebook, free",
      bannerCta: "Learn more",
      startHere: "Start here",
      allCourses: "All courses",
      ebooks: "Free ebooks",
    },
    course: {
      level: { beginner: "Beginner", intermediate: "Intermediate" },
      lessons: "lessons",
      minutes: "min",
      weeks: "weeks",
      start: "Start course",
      continue: "Continue",
      outcomes: "What you'll gain",
      curriculum: "Curriculum",
      instructor: "Guide",
      instructorBody: "Aruben Guide · a companion on the path of stillness",
      progress: "Progress",
      allCategories: "All",
      catalogTitle: "Courses",
      catalogBody: "Step-by-step courses you can take at your own pace.",
    },
    lesson: {
      markComplete: "Mark as complete",
      completed: "Completed",
      prev: "Previous",
      next: "Next",
      backToCourse: "Back to course",
      practice: "Today's practice",
      videoSoon: "Video coming soon",
      type: { video: "Video", reading: "Reading", practice: "Practice" },
      breath: { inhale: "Breathe in", hold: "Hold", exhale: "Breathe out", start: "Start breathing guide", stop: "Stop" },
    },
    library: {
      title: "Library",
      body: "Free ebooks for everyone, no sign-in needed.",
      read: "Read now",
      chapters: "chapters",
      readTime: "{n} min read",
      back: "Back to library",
      toc: "Contents",
    },
    my: {
      eyebrow: "MY JOURNEY",
      resume: "Resume",
      overall: "Overall",
      title: "My Learning",
      note: "For now, progress is saved only in this browser. Once accounts are added, it will sync across devices.",
      empty: "You haven't started a course yet.",
      emptyBody: "Pick a course you like and start the first lesson.",
      browse: "Explore courses",
      reset: "Reset progress",
      remaining: "{left} of {total} lessons left",
      notStarted: "Not started",
      completed: "Completed",
      percent: "{n}% complete",
      start: "Begin",
      continue: "Resume",
      collapse: "Collapse",
      expand: "Expand",
    },
    search: {
      title: "Search",
      placeholder: "Search courses and ebooks",
      suggestions: "Suggestions",
      suggestionList: ["meditation", "breath", "letting go", "intuition"],
      empty: "No results found.",
      results: "{n} results",
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
