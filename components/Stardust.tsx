/*
 * 금빛 별가루 + 반짝이는 별 + 가운데 타원.
 * seed가 같으면 항상 같은 모양이 나와서, 서버와 브라우저 화면이 어긋나지 않습니다.
 */

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

function bezier(p0: Pt, p1: Pt, p2: Pt, t: number): { p: Pt; n: Pt } {
  const u = 1 - t;
  const x = u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0];
  const y = u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1];
  const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  const len = Math.hypot(dx, dy) || 1;
  return { p: [x, y], n: [-dy / len, dx / len] };
}

function sparkle(cx: number, cy: number, r: number) {
  const k = r * 0.16;
  return `M${cx} ${cy - r}L${cx + k} ${cy - k}L${cx + r} ${cy}L${cx + k} ${cy + k}L${cx} ${cy + r}L${cx - k} ${cy + k}L${cx - r} ${cy}L${cx - k} ${cy - k}Z`;
}

/** w x h 좌표계(기본 100 x 130 세로형) 위의 장식 레이어. 부모를 꽉 채웁니다. */
export function Stardust({
  seed = 7,
  density = 1,
  oval = true,
  w = 100,
  h = 130,
}: {
  seed?: number;
  density?: number;
  oval?: boolean;
  w?: number;
  h?: number;
}) {
  const r = rng(seed);
  const gauss = () => (r() + r() + r() - 1.5) / 1.5;
  const scale = Math.sqrt((w * h) / 13000);

  const swirls: [Pt, Pt, Pt][] = [
    [[0.3 * w, 0.05 * h], [1.04 * w, 0.06 * h], [0.86 * w, 0.48 * h]],
    [[0.14 * w, 0.48 * h], [-0.06 * w, 0.91 * h], [0.7 * w, 0.97 * h]],
  ];
  const dots: { x: number; y: number; s: number; o: number }[] = [];
  const perSwirl = Math.round(130 * density);
  for (const [p0, p1, p2] of swirls) {
    for (let i = 0; i < perSwirl; i++) {
      const t = r();
      const { p, n } = bezier(p0, p1, p2, t);
      const spread = (7 * Math.sin(Math.PI * t) + 1.5) * scale;
      const off = gauss() * spread;
      dots.push({ x: p[0] + n[0] * off, y: p[1] + n[1] * off, s: (0.18 + r() * 0.42) * scale, o: 0.35 + r() * 0.6 });
    }
  }
  const ry = Math.min(0.42 * h, 0.38 * w);
  const rx = ry * 0.71;
  // 타원 안(글씨 자리)에는 별을 두지 않음
  const outsideOval = (x: number, y: number) => !oval || ((x - w / 2) / (rx + 2 * scale)) ** 2 + ((y - h * 0.48) / (ry + 2 * scale)) ** 2 > 1;
  const stars = Array.from({ length: Math.round(22 * density) }, () => ({ x: r() * w, y: r() * h, s: (0.15 + r() * 0.3) * scale })).filter((p) =>
    outsideOval(p.x, p.y),
  );
  const twinkles = Array.from({ length: 9 }, () => ({ x: (0.06 + r() * 0.88) * w, y: (0.05 + r() * 0.9) * h, s: (1.1 + r() * 1.6) * scale })).filter((p) =>
    outsideOval(p.x, p.y),
  );

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {oval && <ellipse cx={w / 2} cy={h * 0.48} rx={rx} ry={ry} fill="var(--color-night)" />}
      {stars.map((s, i) => (
        <circle key={`s${i}`} cx={s.x} cy={s.y} r={s.s} fill="#efe6cf" opacity="0.55" />
      ))}
      {dots.filter((d) => outsideOval(d.x, d.y) || r() < 0.15).map((d, i) => (
        <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.s} fill="#dcc8a0" opacity={d.o} />
      ))}
      {twinkles.map((t, i) => (
        <path key={`t${i}`} d={sparkle(t.x, t.y, t.s)} fill="#f1e4c4" opacity="0.9" />
      ))}
    </svg>
  );
}

/** 초대장 같은 표지: 남색 바탕 + 별가루 + 타원 안 제목 */
export function InviteCover({
  title,
  seed,
  className = "",
  small = false,
  kicker,
}: {
  title: string;
  seed: number;
  className?: string;
  small?: boolean;
  kicker?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-deep ${className}`}>
      <Stardust seed={seed} density={small ? 0.6 : 1} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[26%] pb-[6%] text-center">
        {kicker && <span className="mb-2 font-serif text-[11px] italic tracking-wide text-gold/80">{kicker}</span>}
        <span className={`font-serif font-medium leading-snug text-gold-light ${small ? "text-[13px]" : "text-[19px]"}`}>{title}</span>
      </div>
    </div>
  );
}

/** 글자열로 항상 같은 별가루 모양 번호 만들기 */
export function seedOf(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
