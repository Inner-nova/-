import type { L10n } from "./i18n";

/*
 * 예시 콘텐츠입니다. 지금은 코드 안에 들어 있지만,
 * 회원·관리자 기능을 붙일 때 데이터베이스(Supabase)로 옮겨 관리자 화면에서 편집하게 됩니다.
 *
 * 아루벤의 방향: 아는 것은 많은데 삶에서 체화가 안 되는 사람들을 위한 실전 마음훈련.
 * 모든 레슨은 "이해"보다 "오늘 실제로 해보기"로 끝납니다.
 */

export type LessonType = "video" | "reading" | "practice";

export type Lesson = {
  id: string;
  title: L10n;
  type: LessonType;
  minutes: number;
  body: { ko: string[]; en: string[] };
  /** 오늘의 실전 과제 */
  practice?: L10n;
  /** true면 레슨 안에 호흡(멈춤) 도구를 보여줍니다 */
  breathGuide?: boolean;
};

export type Module = { title: L10n; lessons: Lesson[] };

export type Category = "embodiment" | "emotion" | "relationship";

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
  embodiment: { ko: "체화 기초", en: "Embodiment" },
  emotion: { ko: "감정 훈련", en: "Emotional Training" },
  relationship: { ko: "관계 실전", en: "Relationships" },
};

export const courses: Course[] = [
  {
    slug: "knowing-to-living",
    title: { ko: "아는 것과 사는 것 사이", en: "Between Knowing and Living" },
    subtitle: { ko: "머리의 지식을 몸의 습관으로", en: "Turning what you know into how you live" },
    description: {
      ko: "책도 많이 읽고 강의도 많이 들었는데, 막상 삶에서는 그대로인 분을 위한 2주 과정입니다. 왜 지식이 변화로 이어지지 않는지 이해하고, 하루 한 번의 작은 실전으로 체화를 시작합니다.",
      en: "A two-week course for people who have read the books and heard the talks, yet find life unchanged. Understand why knowledge doesn't become change, and begin embodying it through one small real-life practice a day.",
    },
    category: "embodiment",
    level: "beginner",
    hue: 262,
    outcomes: [
      { ko: "아는 것과 하는 것의 간격을 정확히 보기", en: "See the exact gap between knowing and doing" },
      { ko: "나를 반복해서 무너뜨리는 패턴 찾기", en: "Identify the patterns that keep tripping you up" },
      { ko: "3번의 숨으로 자동 반응 멈추기", en: "Pause automatic reactions in three breaths" },
      { ko: "매일 1회 실전과 기록 습관 만들기", en: "Build a habit of one daily practice and a short log" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 왜 알아도 안 될까", en: "Week 1 · Why knowing isn't enough" },
        lessons: [
          {
            id: "knowledge-trap",
            title: { ko: "머리로 아는 것의 함정", en: "The trap of knowing in your head" },
            type: "video",
            minutes: 9,
            body: {
              ko: [
                "'화내지 말아야지', '비교하지 말아야지'. 우리는 이미 답을 알고 있습니다. 그런데 순간이 오면 몸이 먼저 반응합니다. 지식은 머리에 저장되지만, 반응은 몸에 저장되어 있기 때문입니다.",
                "그래서 더 많이 아는 것으로는 바뀌지 않습니다. 필요한 것은 실제 상황에서 다르게 반응해 보는 경험이고, 그 경험이 반복될 때 비로소 몸이 새 길을 기억합니다. 이 코스는 그 반복을 설계하는 과정입니다.",
              ],
              en: [
                "'Don't get angry.' 'Don't compare.' We already know the answers. Yet when the moment comes, the body reacts first. Knowledge is stored in the head, but reactions are stored in the body.",
                "So knowing more doesn't change us. What changes us is the experience of responding differently in a real situation, repeated until the body remembers the new path. This course is about designing that repetition.",
              ],
            },
            practice: {
              ko: "오늘 '알면서도 또 그랬다'고 느낀 순간 하나를 그대로 적어보세요. 판단 없이, 사실만.",
              en: "Write down one moment today when you thought, 'I knew better, and did it anyway.' Facts only, no judgment.",
            },
          },
          {
            id: "pattern-map",
            title: { ko: "내 패턴 지도 그리기", en: "Mapping your patterns" },
            type: "practice",
            minutes: 12,
            body: {
              ko: [
                "무너지는 순간에는 늘 비슷한 순서가 있습니다. 상황(무엇이 일어났나) → 몸의 신호(어디가 조여 왔나) → 생각(머릿속 문장) → 행동(실제로 한 것).",
                "지난 일주일 중 반복된 장면 두세 개를 이 네 칸으로 나눠 적어보세요. 패턴이 보이는 순간, 그 패턴은 더 이상 완전히 자동이 아닙니다.",
              ],
              en: [
                "Every time we fall apart, there's a similar sequence: situation (what happened) → body signal (where it tightened) → thought (the sentence in your head) → action (what you actually did).",
                "Take two or three repeated scenes from the past week and break each into these four boxes. Once you can see a pattern, it is no longer fully automatic.",
              ],
            },
            practice: {
              ko: "가장 자주 반복되는 패턴 하나에 이름을 붙여보세요. 예: '인정받고 싶은 버튼'.",
              en: "Give your most frequent pattern a name, like 'the approval button'.",
            },
          },
        ],
      },
      {
        title: { ko: "2주차 · 하루 한 번의 실전", en: "Week 2 · One real practice a day" },
        lessons: [
          {
            id: "three-breath-pause",
            title: { ko: "3번의 숨으로 멈추기", en: "The three-breath pause" },
            type: "practice",
            minutes: 8,
            breathGuide: true,
            body: {
              ko: [
                "자동 반응과 선택된 대응 사이에는 아주 짧은 틈이 있습니다. 훈련의 목표는 그 틈을 3번의 숨만큼 넓히는 것입니다.",
                "아래 호흡 도구로 지금 연습해 보세요. 몸에 익혀두면, 실제 상황에서 '잠깐'이라는 신호만으로 이 리듬이 돌아옵니다.",
              ],
              en: [
                "Between an automatic reaction and a chosen response, there is a tiny gap. The goal of this drill is to widen that gap to three breaths.",
                "Practice now with the breathing tool below. Once your body learns it, the rhythm returns in real situations with a simple cue: 'pause'.",
              ],
            },
            practice: {
              ko: "오늘 짜증이 올라오는 순간 한 번, 말하기 전에 3번 숨 쉬기. 성공 여부보다 시도 자체를 기록하세요.",
              en: "Once today, when irritation rises, take three breaths before speaking. Log the attempt, not the result.",
            },
          },
          {
            id: "practice-log",
            title: { ko: "무너진 날의 복기법", en: "Reviewing the days you slip" },
            type: "reading",
            minutes: 7,
            body: {
              ko: [
                "실전 훈련에서 실패는 데이터입니다. 무너진 날을 자책으로 끝내면 같은 자리에서 또 넘어집니다. 대신 세 가지만 물어보세요. 언제 처음 신호가 왔나? 그때 무엇을 할 수 있었나? 다음엔 무엇을 하나만 바꿀까?",
                "이 복기가 쌓이면, 다음 순간의 틈이 조금씩 빨리 보이기 시작합니다. 체화는 완벽한 하루가 아니라 짧아지는 회복 시간으로 측정됩니다.",
              ],
              en: [
                "In practical training, failure is data. If a bad day ends in self-blame, you'll trip in the same spot again. Instead, ask three questions: When did the first signal come? What could I have done then? What one thing will I change next time?",
                "As these reviews add up, you start to see the gap sooner. Embodiment isn't measured by perfect days, but by how quickly you recover.",
              ],
            },
            practice: {
              ko: "자기 전 3분, 오늘의 한 장면을 세 질문으로 복기해 보세요.",
              en: "Before bed, spend three minutes reviewing one scene from today with the three questions.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "when-emotions-rise",
    title: { ko: "감정이 올라오는 순간", en: "When Emotions Rise" },
    subtitle: { ko: "반응하는 대신 대응하는 훈련", en: "Training to respond instead of react" },
    description: {
      ko: "분노, 불안, 서운함이 올라오는 바로 그 순간을 위한 실전 훈련입니다. 감정을 없애는 것이 아니라, 감정에 끌려가지 않고 선택할 수 있는 힘을 기릅니다.",
      en: "Practical training for the exact moment anger, anxiety, or hurt rises. Not to get rid of emotions, but to build the capacity to choose instead of being swept away.",
    },
    category: "emotion",
    level: "beginner",
    hue: 300,
    outcomes: [
      { ko: "감정이 올라오는 첫 신호를 몸에서 알아차리기", en: "Notice the first bodily signal of an emotion" },
      { ko: "감정에 이름 붙여 강도를 낮추기", en: "Lower intensity by naming the emotion" },
      { ko: "실제 갈등 상황에서 쓰는 90초 규칙", en: "A 90-second rule for real conflicts" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 반응과 대응 사이", en: "Week 1 · Between reaction and response" },
        lessons: [
          {
            id: "first-signal",
            title: { ko: "감정의 첫 신호 잡기", en: "Catching the first signal" },
            type: "video",
            minutes: 10,
            body: {
              ko: [
                "감정은 생각보다 몸에서 먼저 시작됩니다. 턱에 힘이 들어가고, 가슴이 답답해지고, 목소리가 빨라집니다. 이 신호를 늦게 알아차릴수록 이미 행동은 끝나 있습니다.",
                "이번 레슨의 목표는 내 감정의 '조기 경보'를 찾는 것입니다. 사람마다 위치가 다릅니다. 내 몸이 가장 먼저 보내는 신호 하나를 정해두세요.",
              ],
              en: [
                "Emotions start in the body before the mind. The jaw tightens, the chest constricts, speech speeds up. The later you notice, the more likely the action is already done.",
                "This lesson's goal is to find your emotional early-warning signal. It's different for everyone. Choose the one signal your body sends first.",
              ],
            },
            practice: {
              ko: "오늘 감정이 올라올 때마다 '지금 몸 어디?'라고만 물어보세요. 다섯 번이 목표입니다.",
              en: "Each time an emotion rises today, just ask, 'Where in my body?' Aim for five times.",
            },
          },
          {
            id: "name-it",
            title: { ko: "이름 붙이면 작아진다", en: "Name it to tame it" },
            type: "practice",
            minutes: 8,
            breathGuide: true,
            body: {
              ko: [
                "'짜증나'보다 '무시당한 것 같아서 서운하다'처럼 정확하게 이름 붙일수록, 감정의 강도는 내려갑니다. 감정에 휩쓸린 상태에서 감정을 바라보는 상태로 한 걸음 물러나는 것입니다.",
                "호흡 도구를 켜고, 숨을 내쉴 때마다 지금 느끼는 감정의 이름을 속으로 말해보세요.",
              ],
              en: [
                "The more precisely you name a feeling, like 'hurt because I felt ignored' instead of 'annoyed', the lower its intensity. You step back from being inside the emotion to observing it.",
                "Turn on the breathing tool, and silently name what you feel on each exhale.",
              ],
            },
          },
        ],
      },
      {
        title: { ko: "2주차 · 실전 상황 연습", en: "Week 2 · Real-situation drills" },
        lessons: [
          {
            id: "ninety-seconds",
            title: { ko: "화가 날 때의 90초 규칙", en: "The 90-second rule for anger" },
            type: "reading",
            minutes: 6,
            body: {
              ko: [
                "강한 감정의 첫 파도는 생각보다 짧습니다. 그 파도에 이야기를 계속 붙이지 않으면, 몸의 반응은 비교적 빨리 가라앉습니다. 문제는 우리가 그 사이에 말하고, 보내고, 결정한다는 것입니다.",
                "규칙은 단순합니다. 강한 감정이 올라오면 90초 동안은 말하지도, 보내지도, 결정하지도 않는다. 그 시간 동안 몸의 감각만 지켜봅니다.",
              ],
              en: [
                "The first wave of a strong emotion is shorter than we think. If we stop feeding it with stories, the body's reaction settles relatively quickly. The trouble is that we speak, send, and decide during that wave.",
                "The rule is simple: when a strong emotion rises, for 90 seconds you don't speak, send, or decide. You only watch the sensations in your body.",
              ],
            },
            practice: {
              ko: "이번 주 한 번, 메시지를 보내기 전 90초 규칙을 적용해 보세요.",
              en: "Once this week, apply the 90-second rule before sending a message.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "grounded-in-relationships",
    title: { ko: "관계 속에서 무너지지 않기", en: "Staying Grounded in Relationships" },
    subtitle: { ko: "혼자일 땐 되는데, 사람 앞에서 안 될 때", en: "When it works alone but fails with people" },
    description: {
      ko: "혼자 있을 때는 평온한데 가족, 연인, 동료 앞에서는 다시 예전으로 돌아가나요? 체화 기초를 마친 분을 위한 중급 과정으로, 가장 어려운 실전 무대인 관계 속에서 훈련합니다.",
      en: "Calm when alone, but back to old patterns with family, partners, or coworkers? An intermediate course for those who finished the foundations, training on the hardest stage of all: relationships.",
    },
    category: "relationship",
    level: "intermediate",
    hue: 215,
    outcomes: [
      { ko: "관계에서 반복되는 내 역할 알아차리기", en: "Recognize the role you keep playing in relationships" },
      { ko: "말하기 전 한 번 멈추는 대화 습관", en: "A conversational habit of pausing once before speaking" },
      { ko: "하루의 대화를 복기하고 다시 시도하기", en: "Review the day's conversations and try again" },
    ],
    modules: [
      {
        title: { ko: "1주차 · 사람 앞에서의 훈련", en: "Week 1 · Training in front of people" },
        lessons: [
          {
            id: "my-role",
            title: { ko: "관계 속 나의 자동 역할", en: "Your automatic role in relationships" },
            type: "video",
            minutes: 11,
            body: {
              ko: [
                "누군가 앞에서 우리는 자주 같은 역할로 돌아갑니다. 맞춰주는 사람, 해결하려는 사람, 피하는 사람, 이기려는 사람. 이 역할은 오래전 나를 지켜준 방식이었지만, 지금은 관계를 같은 자리에 묶어둡니다.",
                "이번 주에는 상대를 바꾸려 하기 전에, 그 사람 앞에서 내가 어떤 역할로 들어가는지만 관찰합니다.",
              ],
              en: [
                "Around certain people, we keep slipping into the same role: the pleaser, the fixer, the avoider, the winner. Each role once protected us, but now it keeps relationships stuck in place.",
                "This week, before trying to change anyone, simply observe which role you step into with each person.",
              ],
            },
            practice: {
              ko: "가까운 사람 세 명을 떠올리고, 각 사람 앞에서의 내 역할을 한 단어로 적어보세요.",
              en: "Think of three people close to you and write one word for your role with each.",
            },
          },
          {
            id: "pause-before-speaking",
            title: { ko: "말하기 전에 한 번 멈추기", en: "One pause before speaking" },
            type: "practice",
            minutes: 10,
            breathGuide: true,
            body: {
              ko: [
                "대화가 뜨거워지는 순간, 한 번의 숨은 생각보다 많은 것을 바꿉니다. 말의 속도가 느려지고, 내가 정말 하고 싶은 말이 무엇인지 들리기 시작합니다.",
                "호흡 도구로 '한 숨 멈춤'을 몸에 익혀두세요. 실제 대화에서는 상대가 눈치채지 못할 만큼 짧아도 충분합니다.",
              ],
              en: [
                "When a conversation heats up, a single breath changes more than you'd expect. Your pace slows, and you start to hear what you actually want to say.",
                "Use the breathing tool to make the one-breath pause second nature. In a real conversation, it can be so brief no one notices.",
              ],
            },
          },
          {
            id: "conversation-review",
            title: { ko: "오늘의 대화 복기", en: "Reviewing today's conversations" },
            type: "reading",
            minutes: 8,
            body: {
              ko: [
                "관계 훈련의 진짜 연습장은 대화가 끝난 뒤입니다. 아쉬웠던 대화 하나를 골라, 내가 실제로 한 말과 하고 싶었던 말을 나란히 적어보세요.",
                "그 차이가 바로 다음 훈련 목표입니다. 내일 같은 사람과 비슷한 순간이 오면, 하고 싶었던 말의 첫 문장만이라도 시도해 봅니다.",
              ],
              en: [
                "The real practice ground for relationships is after the conversation ends. Pick one conversation you regret, and write what you actually said next to what you wished you'd said.",
                "That difference is your next training goal. Tomorrow, when a similar moment comes with the same person, try just the first sentence of what you wanted to say.",
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
    slug: "i-know-but",
    title: { ko: "아는데 왜 안 될까", en: "I Know, So Why Can't I?" },
    subtitle: { ko: "지식이 체화로 넘어가는 다리", en: "The bridge from knowledge to embodiment" },
    hue: 245,
    chapters: [
      {
        title: { ko: "지식은 지도일 뿐", en: "Knowledge is only a map" },
        body: {
          ko: [
            "우리는 마음에 관한 좋은 문장을 수없이 알고 있습니다. 하지만 지도를 많이 모은다고 산을 오른 것은 아닙니다. 지식은 방향을 알려줄 뿐, 걸음은 대신 걸어주지 않습니다.",
            "이 책은 지도를 더 주지 않습니다. 대신 이미 가진 지도를 들고, 오늘 한 걸음을 어떻게 내딛을지 이야기합니다.",
          ],
          en: [
            "We know countless good sentences about the mind. But collecting maps is not the same as climbing the mountain. Knowledge points the way; it doesn't walk for you.",
            "This book won't give you more maps. It's about taking the maps you already have and deciding how to take one step today.",
          ],
        },
      },
      {
        title: { ko: "체화는 반복으로 온다", en: "Embodiment comes through repetition" },
        body: {
          ko: [
            "한 번의 깨달음은 강렬하지만 금방 흐려집니다. 몸이 기억하는 것은 강도가 아니라 횟수입니다. 작고 쉬운 연습을 매일 하는 사람이, 가끔 큰 결심을 하는 사람보다 멀리 갑니다.",
            "그래서 훈련은 작아야 합니다. 너무 쉬워서 빠뜨리기 어려울 만큼.",
          ],
          en: [
            "A single insight is vivid but fades fast. The body remembers frequency, not intensity. Someone who does a small, easy practice daily goes further than someone who makes big resolutions now and then.",
            "So training has to be small. So easy it's hard to skip.",
          ],
        },
      },
      {
        title: { ko: "작게 시작하기", en: "Start small" },
        body: {
          ko: [
            "오늘 할 일은 하나입니다. 하루 중 이미 반복되는 행동(문 열기, 메시지 보내기, 커피 마시기) 하나를 정하고, 그 직전에 숨 한 번을 붙이세요.",
          ],
          en: [
            "Today there's only one task. Choose an action you already repeat daily (opening a door, sending a message, making coffee) and attach one breath right before it.",
          ],
        },
      },
    ],
  },
  {
    slug: "field-notes",
    title: { ko: "실전 마음훈련 노트", en: "Mind Training Field Notes" },
    subtitle: { ko: "매일 쓰는 체크인과 복기 양식", en: "Daily check-in and review templates" },
    hue: 320,
    chapters: [
      {
        title: { ko: "하루 3번 체크인", en: "Three check-ins a day" },
        body: {
          ko: [
            "아침, 점심, 저녁에 각각 30초씩 멈추고 세 가지를 확인합니다. 지금 몸은 어떤가? 지금 마음은 어떤가? 지금 나는 무엇을 선택하고 있나?",
            "답을 잘 쓰는 것이 목적이 아닙니다. 하루 중 세 번, 자동 모드에서 빠져나오는 것 자체가 훈련입니다.",
          ],
          en: [
            "Morning, midday, and evening, pause for 30 seconds and check three things: How is my body? How is my mind? What am I choosing right now?",
            "The goal isn't good answers. Stepping out of autopilot three times a day is the training itself.",
          ],
        },
      },
      {
        title: { ko: "무너진 날의 복기 양식", en: "A review template for hard days" },
        body: {
          ko: [
            "1. 장면: 무슨 일이 있었나 (한 줄)  2. 첫 신호: 몸에서 처음 느낀 것  3. 그때의 선택지: 할 수 있었던 다른 행동  4. 다음 실험: 다음엔 무엇 하나를 바꿔볼까",
            "몇 주가 지나면 같은 장면이 반복되는 것이 보입니다. 패턴이 보이면, 이미 절반은 바뀐 것입니다.",
          ],
          en: [
            "1. Scene: what happened (one line)  2. First signal: what you first felt in your body  3. Options: what else you could have done  4. Next experiment: one thing to change next time",
            "After a few weeks, you'll see the same scenes repeating. Once you see the pattern, you're already halfway to changing it.",
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
