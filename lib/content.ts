import type { L10n } from "./i18n";

/*
 * 예시 콘텐츠입니다. 지금은 코드 안에 들어 있지만,
 * 회원·관리자 기능을 붙일 때 데이터베이스(Supabase)로 옮겨 관리자 화면에서 편집하게 됩니다.
 */

export type LessonType = "video" | "reading" | "practice";

export type Lesson = {
  id: string;
  title: L10n;
  type: LessonType;
  minutes: number;
  body: { ko: string[]; en: string[] };
  practice?: L10n;
  /** true면 레슨 안에 호흡 안내 도구를 보여줍니다 */
  breathGuide?: boolean;
};

export type Module = { title: L10n; lessons: Lesson[] };

export type Category = "meditation" | "letting-go" | "inquiry";

export type Course = {
  slug: string;
  title: L10n;
  subtitle: L10n;
  description: L10n;
  category: Category;
  level: "beginner" | "intermediate";
  hue: number;
  outcomes: L10n[];
  modules: Module[];
};

export const categories: Record<Category, L10n> = {
  meditation: { ko: "명상", en: "Meditation" },
  "letting-go": { ko: "비움", en: "Letting Go" },
  inquiry: { ko: "내면 탐구", en: "Inner Inquiry" },
};

export const courses: Course[] = [
  {
    slug: "breath-meditation",
    title: { ko: "호흡 명상 입문", en: "Breath Meditation Basics" },
    subtitle: { ko: "숨 하나로 지금 여기에 돌아오기", en: "Returning to the present, one breath at a time" },
    description: {
      ko: "명상이 처음인 분을 위한 2주 과정입니다. 바른 자세, 호흡 관찰, 흩어진 마음을 다시 데려오는 방법을 하루 10분씩 익힙니다.",
      en: "A two-week course for complete beginners. In ten minutes a day, learn posture, breath awareness, and how to gently bring a wandering mind back.",
    },
    category: "meditation",
    level: "beginner",
    hue: 250,
    outcomes: [
      { ko: "편안하고 안정된 명상 자세 잡기", en: "Find a comfortable, stable sitting posture" },
      { ko: "호흡을 바꾸지 않고 바라보는 법", en: "Observe the breath without controlling it" },
      { ko: "잡념이 올라올 때 부드럽게 돌아오는 법", en: "Return gently when thoughts arise" },
      { ko: "일상 속 1분 명상 습관 만들기", en: "Build a one-minute daily meditation habit" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 앉는 법, 숨 쉬는 법", en: "Week 1 · How to sit, how to breathe" },
        lessons: [
          {
            id: "why-breath",
            title: { ko: "왜 호흡에서 시작할까", en: "Why begin with the breath" },
            type: "video",
            minutes: 8,
            body: {
              ko: [
                "호흡은 언제나 지금 이 순간에만 일어납니다. 어제의 숨을 쉴 수도, 내일의 숨을 미리 쉴 수도 없지요. 그래서 호흡은 마음을 '지금'으로 데려오는 가장 가까운 문입니다.",
                "명상은 무언가를 새로 만들어내는 일이 아니라, 이미 여기 있는 것을 알아차리는 일입니다. 이 코스에서는 숨을 억지로 조절하지 않고, 있는 그대로 바라보는 연습부터 시작합니다.",
              ],
              en: [
                "The breath only ever happens now. You cannot breathe yesterday's breath, nor tomorrow's. That makes it the closest doorway back to the present moment.",
                "Meditation is not about creating something new; it's about noticing what is already here. In this course we begin by watching the breath as it is, without forcing it.",
              ],
            },
            practice: {
              ko: "오늘 하루 세 번, 하던 일을 멈추고 숨 세 번을 천천히 느껴보세요.",
              en: "Three times today, pause what you're doing and feel three slow breaths.",
            },
          },
          {
            id: "posture",
            title: { ko: "편안한 자세 만들기", en: "Finding a comfortable posture" },
            type: "reading",
            minutes: 6,
            body: {
              ko: [
                "의자에 앉아도, 바닥에 앉아도 좋습니다. 중요한 것은 척추가 부드럽게 세워지고 어깨와 턱의 힘이 풀려 있는 것입니다.",
                "손은 무릎이나 허벅지 위에 편하게 올려두고, 눈은 감거나 시선을 1~2미터 앞 바닥에 가볍게 내려놓으세요. 정답 자세는 없습니다. 10분 동안 편안히 머물 수 있는 자세가 가장 좋은 자세입니다.",
              ],
              en: [
                "Sit on a chair or on the floor; either is fine. What matters is that your spine is gently upright and your shoulders and jaw are relaxed.",
                "Rest your hands on your knees or thighs. Close your eyes, or let your gaze rest softly on the floor a few feet ahead. There is no perfect posture; the best one is the one you can rest in for ten minutes.",
              ],
            },
            practice: {
              ko: "몸을 위에서 아래로 훑으며 힘이 들어간 곳을 하나씩 풀어보세요.",
              en: "Scan your body from head to toe and soften each place that feels tense.",
            },
          },
        ],
      },
      {
        title: { ko: "2주차 · 머무는 연습", en: "Week 2 · Practicing staying" },
        lessons: [
          {
            id: "counting-breath",
            title: { ko: "숨 세기 명상", en: "Counting the breath" },
            type: "practice",
            minutes: 10,
            breathGuide: true,
            body: {
              ko: [
                "들이쉬고 내쉬는 한 번을 '하나'로 세고, 열까지 센 뒤 다시 하나로 돌아갑니다. 중간에 숫자를 잊어도 괜찮습니다. 알아차린 순간 다시 하나부터 시작하면 됩니다.",
                "아래 호흡 안내를 켜고 원이 커질 때 들이쉬고, 작아질 때 내쉬어 보세요.",
              ],
              en: [
                "Count one full in-and-out breath as 'one', up to ten, then start again. If you lose count, that's fine. The moment you notice, simply begin again at one.",
                "Turn on the breathing guide below: breathe in as the circle grows, out as it shrinks.",
              ],
            },
            practice: {
              ko: "아침에 일어나 5분 동안 숨 세기 명상을 해보세요.",
              en: "Try five minutes of counting breaths after you wake up.",
            },
          },
          {
            id: "wandering-mind",
            title: { ko: "잡념과 친구가 되기", en: "Befriending the wandering mind" },
            type: "reading",
            minutes: 7,
            body: {
              ko: [
                "명상 중 생각이 떠오르는 것은 실패가 아닙니다. 마음은 원래 움직이는 것이고, 생각이 떠났다는 것을 알아차리는 그 순간이 바로 명상입니다.",
                "생각에 이름을 붙여보세요. '계획', '걱정', '기억'. 그리고 구름이 지나가듯 흘려보내고 다시 숨으로 돌아옵니다.",
              ],
              en: [
                "Thoughts arising during meditation is not failure. The mind naturally moves, and the very moment you notice it has wandered is meditation itself.",
                "Try gently labeling thoughts: 'planning', 'worrying', 'remembering'. Let them pass like clouds, and return to the breath.",
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "art-of-letting-go",
    title: { ko: "비움의 기술", en: "The Art of Letting Go" },
    subtitle: { ko: "움켜쥔 손을 펴는 연습", en: "Practicing an open hand" },
    description: {
      ko: "생각, 감정, 물건, 관계에서 붙잡고 있는 것을 살펴보고 가볍게 내려놓는 법을 배웁니다. 비움은 잃는 것이 아니라 자리를 내어주는 일입니다.",
      en: "Look at what you hold onto in thoughts, emotions, things, and relationships, and learn to set it down lightly. Letting go is not losing; it is making room.",
    },
    category: "letting-go",
    level: "beginner",
    hue: 35,
    outcomes: [
      { ko: "내가 붙잡고 있는 것을 알아차리기", en: "Recognize what you are holding onto" },
      { ko: "감정을 억누르지 않고 흘려보내기", en: "Release emotions without suppressing them" },
      { ko: "일상의 작은 비움 실천", en: "Small daily practices of letting go" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 붙잡음 알아차리기", en: "Week 1 · Noticing what we grasp" },
        lessons: [
          {
            id: "what-we-hold",
            title: { ko: "우리는 무엇을 쥐고 있나", en: "What are we holding?" },
            type: "video",
            minutes: 9,
            body: {
              ko: [
                "주먹을 꽉 쥐어보세요. 그리고 천천히 펴보세요. 손바닥에 남는 감각을 느껴봅니다. 마음도 이와 같습니다. 무언가를 오래 쥐고 있으면 그 긴장이 익숙해져서 쥐고 있다는 사실조차 잊게 됩니다.",
                "이번 레슨에서는 하루 동안 내가 어떤 생각, 감정, 기대를 붙잡고 있는지 가만히 살펴봅니다.",
              ],
              en: [
                "Make a tight fist. Now slowly open it, and feel the sensation left in your palm. The mind is like this. When we hold something long enough, the tension becomes familiar and we forget we're holding at all.",
                "In this lesson, we quietly observe which thoughts, feelings, and expectations we hold throughout the day.",
              ],
            },
            practice: {
              ko: "잠들기 전, 오늘 붙잡고 있던 것 세 가지를 적어보세요.",
              en: "Before sleep, write down three things you held onto today.",
            },
          },
          {
            id: "feeling-flow",
            title: { ko: "감정이 지나가게 두기", en: "Letting feelings pass through" },
            type: "practice",
            minutes: 10,
            breathGuide: true,
            body: {
              ko: [
                "감정이 올라오면 이야기를 붙이기 전에 몸에서 그 감정이 어디에 있는지 먼저 찾아보세요. 가슴이 조이는지, 배가 뜨거운지.",
                "그 자리에 숨을 보내며 '이것도 지나간다'고 조용히 말해봅니다. 감정은 밀어내지 않을 때 더 빨리 흘러갑니다.",
              ],
              en: [
                "When a feeling arises, before adding a story to it, find where it lives in your body. A tight chest? Warmth in the belly?",
                "Breathe into that place and quietly say, 'This too will pass.' Feelings move through faster when we stop pushing them away.",
              ],
            },
          },
        ],
      },
      {
        title: { ko: "2주차 · 가벼워지는 삶", en: "Week 2 · Living lighter" },
        lessons: [
          {
            id: "empty-space",
            title: { ko: "빈자리의 힘", en: "The power of empty space" },
            type: "reading",
            minutes: 6,
            body: {
              ko: [
                "그릇이 쓸모 있는 것은 비어 있기 때문입니다. 마음에도 빈자리가 있어야 새로운 것이 들어올 수 있습니다.",
                "이번 주에는 책상 한 칸, 휴대폰 알림 하나, 미뤄둔 약속 하나처럼 아주 작은 것부터 비워봅니다.",
              ],
              en: [
                "A bowl is useful because it is empty. The heart, too, needs empty space for something new to enter.",
                "This week, empty something very small: one drawer, one notification, one postponed obligation.",
              ],
            },
            practice: {
              ko: "오늘 하나를 비우고, 그 뒤 마음이 어떻게 달라졌는지 적어보세요.",
              en: "Empty one thing today, then note how your mind feels afterward.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "inner-compass",
    title: { ko: "내면의 나침반", en: "Your Inner Compass" },
    subtitle: { ko: "나는 누구인가를 묻는 여정", en: "A journey into 'Who am I?'" },
    description: {
      ko: "명상의 기초를 익힌 분을 위한 중급 과정입니다. 자기 탐구 질문, 침묵 속 머물기, 직관을 듣는 법을 통해 삶의 방향을 안에서 찾습니다.",
      en: "An intermediate course for those with a basic meditation practice. Through self-inquiry, resting in silence, and listening to intuition, find direction from within.",
    },
    category: "inquiry",
    level: "intermediate",
    hue: 160,
    outcomes: [
      { ko: "자기 탐구 질문을 일상에서 활용하기", en: "Use self-inquiry questions in daily life" },
      { ko: "생각과 알아차림을 구분하기", en: "Distinguish thoughts from awareness" },
      { ko: "직관의 목소리에 귀 기울이기", en: "Listen to the voice of intuition" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 묻는 법", en: "Week 1 · The art of asking" },
        lessons: [
          {
            id: "who-am-i",
            title: { ko: "'나는 누구인가' 묻기", en: "Asking 'Who am I?'" },
            type: "video",
            minutes: 12,
            body: {
              ko: [
                "이 질문은 답을 찾기 위한 질문이 아니라, 생각 너머를 가리키는 손가락입니다. 이름, 직업, 역할을 하나씩 내려놓고 나면 무엇이 남는지 바라봅니다.",
                "답이 떠오르면 '그것을 알고 있는 것은 누구인가?' 하고 한 번 더 물어보세요.",
              ],
              en: [
                "This question isn't meant to produce an answer; it is a finger pointing beyond thought. Set down your name, job, and roles one by one, and see what remains.",
                "When an answer appears, ask once more: 'Who is aware of this?'",
              ],
            },
            practice: {
              ko: "10분간 조용히 앉아 이 질문을 품고 머물러 보세요.",
              en: "Sit quietly for ten minutes, holding this question.",
            },
          },
          {
            id: "silence",
            title: { ko: "침묵 속에 머물기", en: "Resting in silence" },
            type: "practice",
            minutes: 15,
            breathGuide: true,
            body: {
              ko: [
                "소리와 소리 사이, 생각과 생각 사이의 틈을 알아차려 봅니다. 그 틈은 비어 있지만 살아 있습니다.",
                "호흡 안내를 따라 숨이 바뀌는 순간의 고요에 머물러 보세요.",
              ],
              en: [
                "Notice the gap between sounds, between thoughts. That gap is empty, yet alive.",
                "Follow the breathing guide and rest in the stillness where one breath turns into the next.",
              ],
            },
          },
          {
            id: "intuition",
            title: { ko: "직관의 목소리", en: "The voice of intuition" },
            type: "reading",
            minutes: 8,
            body: {
              ko: [
                "직관은 크게 외치지 않습니다. 두려움의 목소리가 급하고 시끄럽다면, 직관은 조용하고 단순하며 몸이 편안해지는 느낌과 함께 옵니다.",
                "중요한 결정을 앞두고 있다면 각 선택지를 떠올릴 때 몸이 어떻게 반응하는지 살펴보세요.",
              ],
              en: [
                "Intuition rarely shouts. Where fear is urgent and loud, intuition is quiet, simple, and comes with a sense of ease in the body.",
                "Facing a decision, imagine each option and notice how your body responds.",
              ],
            },
          },
        ],
      },
    ],
  },
];

export type Ebook = {
  slug: string;
  title: L10n;
  subtitle: L10n;
  hue: number;
  chapters: { title: L10n; body: { ko: string[]; en: string[] } }[];
};

export const ebooks: Ebook[] = [
  {
    slug: "daily-stillness",
    title: { ko: "매일의 고요", en: "Daily Stillness" },
    subtitle: { ko: "바쁜 하루 속 1분 명상 안내서", en: "A guide to one-minute meditations in busy days" },
    hue: 220,
    chapters: [
      {
        title: { ko: "고요는 멀리 있지 않다", en: "Stillness is not far away" },
        body: {
          ko: [
            "우리는 고요를 찾기 위해 산이나 절, 긴 휴가를 떠올립니다. 하지만 고요는 장소가 아니라 주의의 방향입니다.",
            "엘리베이터를 기다리는 30초, 커피가 내려지는 1분. 하루에는 이미 수많은 작은 빈틈이 있습니다. 이 책은 그 틈을 고요로 바꾸는 방법을 이야기합니다.",
          ],
          en: [
            "We imagine stillness requires mountains, temples, or long vacations. But stillness is not a place; it is a direction of attention.",
            "Thirty seconds waiting for an elevator, one minute while coffee brews. Our days are already full of small gaps. This book is about turning those gaps into stillness.",
          ],
        },
      },
      {
        title: { ko: "1분 명상 세 가지", en: "Three one-minute meditations" },
        body: {
          ko: [
            "첫째, 발바닥 명상: 서 있는 곳에서 발바닥이 땅에 닿는 감각을 느낍니다.",
            "둘째, 소리 명상: 눈을 감고 가장 먼 소리부터 가장 가까운 소리까지 차례로 듣습니다.",
            "셋째, 세 번의 숨: 들이쉬며 '여기', 내쉬며 '지금'이라고 마음속으로 말합니다.",
          ],
          en: [
            "First, the soles of the feet: wherever you stand, feel your feet touching the ground.",
            "Second, listening: close your eyes and hear sounds from the farthest to the nearest.",
            "Third, three breaths: inhale saying 'here', exhale saying 'now', silently.",
          ],
        },
      },
      {
        title: { ko: "습관으로 만들기", en: "Making it a habit" },
        body: {
          ko: [
            "새 습관은 이미 있는 습관에 붙일 때 오래갑니다. 양치 후, 컴퓨터를 켠 직후, 현관문을 열기 전처럼 매일 하는 행동 뒤에 1분 명상을 붙여보세요.",
          ],
          en: [
            "New habits last when attached to existing ones. Try adding a one-minute meditation right after brushing your teeth, turning on your computer, or before opening your front door.",
          ],
        },
      },
    ],
  },
  {
    slug: "notes-on-emptiness",
    title: { ko: "비움 노트", en: "Notes on Emptiness" },
    subtitle: { ko: "내려놓을수록 채워지는 이야기", en: "Stories of being filled by letting go" },
    hue: 30,
    chapters: [
      {
        title: { ko: "가득 찬 찻잔", en: "The full teacup" },
        body: {
          ko: [
            "이미 가득 찬 찻잔에는 차를 더 부을 수 없습니다. 배우고 싶다면 먼저 내가 안다고 믿는 것을 조금 비워야 합니다.",
            "비움은 모른다는 것을 허락하는 용기입니다.",
          ],
          en: [
            "You cannot pour more tea into a cup that is already full. To learn, we must first empty a little of what we believe we know.",
            "Emptiness is the courage to allow not-knowing.",
          ],
        },
      },
      {
        title: { ko: "내려놓기 연습 노트", en: "A practice journal for letting go" },
        body: {
          ko: [
            "매일 저녁 세 줄을 적어보세요. 오늘 붙잡았던 것, 그것을 붙잡은 이유, 내일 조금 내려놓을 수 있는 방법.",
            "몇 주가 지나면 반복되는 패턴이 보이기 시작합니다. 패턴을 보는 것만으로도 그 힘은 약해집니다.",
          ],
          en: [
            "Each evening, write three lines: what you held onto today, why you held it, and how you might loosen your grip tomorrow.",
            "After a few weeks, patterns begin to appear. Simply seeing a pattern weakens its hold.",
          ],
        },
      },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function getEbook(slug: string) {
  return ebooks.find((e) => e.slug === slug);
}

export function flatLessons(course: Course) {
  return course.modules.flatMap((m) => m.lessons);
}

export function totalMinutes(course: Course) {
  return flatLessons(course).reduce((sum, l) => sum + l.minutes, 0);
}

export function ebookMinutes(ebook: Ebook) {
  const chars = ebook.chapters.flatMap((c) => c.body.ko).join("").length;
  return Math.max(3, Math.round(chars / 300));
}
