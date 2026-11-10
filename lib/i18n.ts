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
    wordmark: "Aruven",
    tagline: "아는 것을, 사는 것으로",
    description:
      "아루벤은 아는 것은 많지만 삶에서 체화가 안 되는 사람들을 위한 실전 마음훈련입니다. 매일의 짧은 훈련과 실제 상황 과제로 아는 것을 몸에 익힙니다.",
    nav: { explore: "탐색", courses: "훈련", my: "마이", library: "서재", search: "검색" },
    common: { viewAll: "모두 보기", provider: "아루벤", course: "코스", ebook: "전자책", free: "무료" },
    home: {
      heroEyebrow: "ARUVEN · PRACTICAL MIND TRAINING",
      heroTitle: "아는 것을,\n사는 것으로",
      heroBody: "책과 강의로 이미 많이 알고 있지만, 막상 삶에서는 잘 안 되나요? 아루벤은 아는 것을 몸에 익히는 실전 마음훈련입니다.",
      ctaStart: "첫 훈련 시작하기",
      ctaLibrary: "무료 전자책",
      quoteLabel: "오늘의 문장",
      quote: "아는 것은 지도이고, 사는 것은 걸음입니다.",
      quoteSource: "『아는데 왜 안 될까』 중에서",
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
      instructor: "트레이너",
      instructorBody: "아루벤 트레이너 · 아는 것을 함께 연습하는 동반자",
      progress: "진도",
      allCategories: "전체",
      catalogTitle: "훈련",
      inProgress: "이어하기",
      catalogBody: "이해에서 멈추지 않고, 실제 상황에서 해보는 훈련 코스들입니다.",
    },
    lesson: {
      markComplete: "완료로 표시",
      completed: "완료됨",
      prev: "이전",
      next: "다음",
      backToCourse: "코스로 돌아가기",
      practice: "오늘의 실전 과제",
      videoSoon: "영상은 준비 중입니다",
      type: { video: "영상", reading: "읽기", practice: "훈련" },
      breath: { inhale: "들이쉬기", hold: "머물기", exhale: "내쉬기", start: "멈춤 훈련 시작", stop: "그만하기" },
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
      streak: "연속 훈련",
      dayUnit: "일",
      lessonsDone: "완료 레슨",
      activeCourses: "진행 중",
      recent: "최근 4주",
      settings: "설정",
      language: "언어",
      resume: "이어가기",
      overall: "전체 진도",
      title: "나의 훈련",
      note: "지금은 진도가 이 브라우저에만 저장됩니다. 회원 기능이 추가되면 어느 기기에서든 이어볼 수 있어요.",
      empty: "아직 시작한 코스가 없어요.",
      emptyBody: "마음에 드는 코스를 골라 첫 레슨을 시작해 보세요.",
      browse: "강의 탐색하기",
      reset: "기록 초기화",
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
      suggestionList: ["체화", "감정", "관계", "멈춤"],
      empty: "검색 결과가 없어요.",
      results: "검색 결과 {n}개",
    },
    footer: {
      about: "아루벤은 아는 것을 삶으로 옮기는 실전 마음훈련 공간입니다.",
      contact: "문의 양식은 준비 중입니다.",
    },
  },
  en: {
    brand: "Aruven",
    wordmark: "Aruven",
    tagline: "From knowing, to living",
    description:
      "Aruven is practical mind training for people who know a lot but haven't yet lived it. Short daily drills and real-life assignments turn what you know into how you live.",
    nav: { explore: "Explore", courses: "Training", my: "My", library: "Library", search: "Search" },
    common: { viewAll: "View all", provider: "Aruven", course: "Course", ebook: "Ebook", free: "Free" },
    home: {
      heroEyebrow: "ARUVEN · PRACTICAL MIND TRAINING",
      heroTitle: "From knowing,\nto living",
      heroBody: "You've read the books and heard the talks, but life still feels the same? Aruven is practical mind training that turns what you know into how you live.",
      ctaStart: "Start your first drill",
      ctaLibrary: "Free ebooks",
      quoteLabel: "Words for today",
      quote: "Knowing is the map; living is the walk.",
      quoteSource: "from I Know, So Why Can't I?",
      eyebrows: { topics: "TOPICS", start: "BEGIN HERE", all: "ALL COURSES", ebooks: "FREE LIBRARY" },
      title: "Explore",
      topics: "Topics",
      bannerBrand: "Aruven OPEN",
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
      instructor: "Trainer",
      instructorBody: "Aruven Trainer · a partner who practices with you",
      progress: "Progress",
      allCategories: "All",
      catalogTitle: "Training",
      inProgress: "Continue",
      catalogBody: "Training courses that go beyond understanding into real-life practice.",
    },
    lesson: {
      markComplete: "Mark as complete",
      completed: "Completed",
      prev: "Previous",
      next: "Next",
      backToCourse: "Back to course",
      practice: "Today's real-life assignment",
      videoSoon: "Video coming soon",
      type: { video: "Video", reading: "Reading", practice: "Drill" },
      breath: { inhale: "Breathe in", hold: "Hold", exhale: "Breathe out", start: "Start pause drill", stop: "Stop" },
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
      streak: "Day streak",
      dayUnit: "",
      lessonsDone: "Lessons done",
      activeCourses: "In progress",
      recent: "Last 4 weeks",
      settings: "Settings",
      language: "Language",
      resume: "Resume",
      overall: "Overall",
      title: "My Training",
      note: "For now, progress is saved only in this browser. Once accounts are added, it will sync across devices.",
      empty: "You haven't started a course yet.",
      emptyBody: "Pick a course you like and start the first lesson.",
      browse: "Explore courses",
      reset: "Reset records",
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
      suggestionList: ["embodiment", "emotion", "relationship", "pause"],
      empty: "No results found.",
      results: "{n} results",
    },
    footer: {
      about: "Aruven is a practical mind training space for turning what you know into how you live.",
      contact: "A contact form is coming soon.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
