import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as K from "./constants";

export const BACKGROUND = "#070914";
export type Screen = "title" | "howto" | "playing" | "paused" | "gameover";
export type SaucerEdge = "left" | "right";
export type FieldEdge = "top" | "bottom" | "left" | "right";
export interface ShipState {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly angle: number;
  readonly thrusting: boolean;
  readonly invuln: number;
  readonly collision: boolean;
  readonly fireCooldown: number;
}
export interface BulletState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
}
export interface RockState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly size: K.RockSize;
  readonly spin: number;
  readonly health: number;
  readonly flash: number;
}
export interface SaucerState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly mind: boolean;
  readonly gun: boolean;
  readonly travel: boolean;
  readonly weave: 1 | -1;
  readonly fireClock: number;
  readonly weaveClock: number;
  readonly age: number;
}
export interface TorpedoState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly heading: number;
  readonly life: number;
  readonly homing: boolean;
}
export interface ShatterState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly ship: ShipState;
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly RockState[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly tickClock: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
export interface Rect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}
export interface Snapshot {
  readonly version: number;
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly muted: boolean;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly ship: ShipState & { readonly speed: number };
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly (RockState & { readonly radius: number })[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly torpedoReady: boolean;
  readonly simTime: number;
}
export interface ShatterDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<ShatterState>): ShatterState;
  snapshot(s: DeepReadonly<ShatterState>): Snapshot;
  reconcile(s: DeepReadonly<ShatterState>): ShatterState;
  menuItemRect(s: DeepReadonly<ShatterState>, i: number): Rect | null;
  setScreen(s: DeepReadonly<ShatterState>, v: Screen): ShatterState;
  setMenuIndex(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setScore(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setLives(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWave(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWaveBanner(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWaveSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerDue(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipPosition(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipAngle(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipInvuln(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setFireCooldown(s: DeepReadonly<ShatterState>, n: number): ShatterState;
  setShipCollision(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  addBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addEnemyBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeEnemyBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearEnemyBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addRock(
    s: DeepReadonly<ShatterState>,
    size: K.RockSize,
    x: number,
    y: number,
  ): ShatterState;
  setRockVelocity(
    s: DeepReadonly<ShatterState>,
    id: number,
    x: number,
    y: number,
  ): ShatterState;
  setRockHealth(
    s: DeepReadonly<ShatterState>,
    id: number,
    hp: number,
  ): ShatterState;
  removeRock(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearRocks(s: DeepReadonly<ShatterState>): ShatterState;
  addSaucer(s: DeepReadonly<ShatterState>, x: number, y: number): ShatterState;
  setSaucerVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setSaucerWeave(s: DeepReadonly<ShatterState>, v: 1 | -1): ShatterState;
  removeSaucer(s: DeepReadonly<ShatterState>): ShatterState;
  setSaucerMind(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerGun(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerTravel(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setNextSaucerEdge(
    s: DeepReadonly<ShatterState>,
    v: SaucerEdge | null,
  ): ShatterState;
  setNextSaucerRow(
    s: DeepReadonly<ShatterState>,
    v: number | null,
  ): ShatterState;
  setNextSaucerAim(
    s: DeepReadonly<ShatterState>,
    v: number | null,
  ): ShatterState;
  setNextRockSpeed(
    s: DeepReadonly<ShatterState>,
    v: number | null,
  ): ShatterState;
  setNextRecycleEdge(
    s: DeepReadonly<ShatterState>,
    v: FieldEdge | null,
  ): ShatterState;
  setTorpedoCharge(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  addTorpedo(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    h: number,
  ): ShatterState;
  setTorpedoHeading(
    s: DeepReadonly<ShatterState>,
    id: number,
    h: number,
  ): ShatterState;
  setTorpedoHoming(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: boolean,
  ): ShatterState;
  removeTorpedo(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearTorpedoes(s: DeepReadonly<ShatterState>): ShatterState;
}
const wrap = (n: number, m: number) => ((n % m) + m) % m;
const d = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  let x = b.x - a.x,
    y = b.y - a.y;
  if (x > K.FIELD_W / 2) x -= K.FIELD_W;
  if (x < -K.FIELD_W / 2) x += K.FIELD_W;
  if (y > K.FIELD_H / 2) y -= K.FIELD_H;
  if (y < -K.FIELD_H / 2) y += K.FIELD_H;
  return { x, y };
};
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(d(a, b).x, d(a, b).y);
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const ang = () => rnd(-Math.PI, Math.PI);
const rad = (r: K.RockSize) => K.ROCK_RADIUS[r];
const ship = (): ShipState => ({
  x: K.SAFE_X,
  y: K.SAFE_Y,
  vx: 0,
  vy: 0,
  angle: K.FACE_UP,
  thrusting: false,
  invuln: 0,
  collision: true,
  fireCooldown: 0,
});
const fresh = (): ShatterState => ({
  screen: "title",
  menuIndex: 0,
  score: 0,
  lives: K.START_LIVES,
  wave: 0,
  waveBanner: 0,
  ship: ship(),
  bullets: [],
  rocks: [],
  saucer: null,
  enemyBullets: [],
  torpedoes: [],
  torpedoCharge: 1,
  waveSpawning: true,
  saucerSpawning: true,
  saucerClock: 0,
  saucerDue: K.SAUCER_FIRST_DELAY,
  nextSaucerEdge: null,
  nextSaucerRow: null,
  nextSaucerAim: null,
  nextRockSpeed: null,
  nextRecycleEdge: null,
  tickClock: 0,
  nextId: 1,
  simTime: 0,
  muted: false,
});
const copy = (s: DeepReadonly<ShatterState>): ShatterState =>
  ({
    ...s,
    ship: { ...s.ship },
    bullets: s.bullets.map((x) => ({ ...x })),
    rocks: s.rocks.map((x) => ({ ...x })),
    enemyBullets: s.enemyBullets.map((x) => ({ ...x })),
    torpedoes: s.torpedoes.map((x) => ({ ...x })),
    saucer: s.saucer ? { ...s.saucer } : null,
  }) as ShatterState;
const alloc = (s: ShatterState): [ShatterState, number] => [
  { ...s, nextId: s.nextId + 1 },
  s.nextId,
];
function gravity(x: number, y: number) {
  const dx = K.STAR_X - x,
    dy = K.STAR_Y - y,
    l = Math.hypot(dx, dy),
    a = K.MU / Math.max(l, K.SOFTEN) ** 2;
  return l ? { x: (dx / l) * a, y: (dy / l) * a } : { x: 0, y: 0 };
}
function ball(b: BulletState, dt: number): BulletState {
  const g = gravity(b.x, b.y);
  return {
    ...b,
    x: wrap(b.x + (b.vx + g.x * dt) * dt, K.FIELD_W),
    y: wrap(b.y + (b.vy + g.y * dt) * dt, K.FIELD_H),
    vx: b.vx + g.x * dt,
    vy: b.vy + g.y * dt,
    life: b.life - dt,
  };
}
function rock(r: RockState, dt: number): RockState {
  const g = gravity(r.x, r.y);
  return {
    ...r,
    x: wrap(r.x + (r.vx + g.x * dt) * dt, K.FIELD_W),
    y: wrap(r.y + (r.vy + g.y * dt) * dt, K.FIELD_H),
    vx: r.vx + g.x * dt,
    vy: r.vy + g.y * dt,
    spin: r.spin + dt * 0.6,
    flash: Math.max(0, r.flash - dt),
  };
}
function points(s: ShatterState, n: number, api: UpdateApi) {
  const old = Math.floor(s.score / K.EXTRA_LIFE_STEP),
    score = s.score + n,
    add = Math.floor(score / K.EXTRA_LIFE_STEP) - old;
  if (add) api.audio.play(K.CUES.extraLife);
  return { ...s, score, lives: s.lives + add };
}
function split(
  s: ShatterState,
  r: RockState,
  h: number,
  torp: boolean,
  api: UpdateApi,
) {
  let out = points(
    { ...s, rocks: s.rocks.filter((x) => x.id !== r.id) },
    r.size === "large"
      ? K.SCORE_LARGE
      : r.size === "medium"
        ? K.SCORE_MEDIUM
        : K.SCORE_SMALL,
    api,
  );
  api.audio.play(K.CUES.shatter);
  const child = K.ROCK_CHILD[r.size];
  if (!child) return out;
  const kick = torp ? K.TORPEDO_SCATTER : K.SPLIT_KICK,
    dx = Math.cos(torp ? h : h + Math.PI / 2) * kick,
    dy = Math.sin(torp ? h : h + Math.PI / 2) * kick,
    rs = [...out.rocks];
  for (const sign of [-1, 1]) {
    const [n, id] = alloc(out);
    out = n;
    rs.push({
      id,
      x: r.x,
      y: r.y,
      vx: r.vx + dx * sign,
      vy: r.vy + dy * sign,
      size: child,
      spin: ang(),
      health: K.ROCK_HEALTH[child],
      flash: 0,
    });
  }
  return { ...out, rocks: rs };
}
function addWave(s: ShatterState) {
  let out = s;
  const rs = [...s.rocks];
  const mult =
    1 + Math.min(K.WAVE_SPEED_CAP, K.WAVE_SPEED_STEP * Math.max(0, s.wave - 1));
  for (let i = 0; i < K.WAVE_BASE_ROCKS + s.wave; i++) {
    let x, y;
    do {
      x = rnd(50, 1230);
      y = rnd(50, 670);
    } while (
      dist({ x, y }, s.ship) < K.WAVE_MIN_SHIP_DIST ||
      dist({ x, y }, { x: K.STAR_X, y: K.STAR_Y }) < K.WAVE_MIN_STAR_DIST
    );
    const speed =
      out.nextRockSpeed ?? rnd(K.ROCK_SPEED_MIN.large, K.ROCK_SPEED_MAX.large);
    out = { ...out, nextRockSpeed: null };
    const [n, id] = alloc(out);
    out = n;
    const a = ang();
    rs.push({
      id,
      x,
      y,
      vx: Math.cos(a) * speed * mult,
      vy: Math.sin(a) * speed * mult,
      size: "large",
      spin: ang(),
      health: 3,
      flash: 0,
    });
  }
  return { ...out, rocks: rs };
}
function step(s0: ShatterState, api: UpdateApi): ShatterState {
  const s = copy(s0);
  let q = s.ship;
  const turn = api.input.value("right") - api.input.value("left");
  const th = api.input.value("up") > 0;
  const a = q.angle + turn * K.SHIP_TURN * K.TICK_DT;
  let vx = q.vx + (th ? Math.cos(a) * K.SHIP_THRUST * K.TICK_DT : 0);
  let vy = q.vy + (th ? Math.sin(a) * K.SHIP_THRUST * K.TICK_DT : 0);
  if (!th) {
    const z = Math.pow(0.5, K.TICK_DT / K.SHIP_DRAG_HALFLIFE);
    vx *= z;
    vy *= z;
  }
  const sp = Math.hypot(vx, vy);
  if (sp > K.SHIP_MAX) {
    vx = (vx / sp) * K.SHIP_MAX;
    vy = (vy / sp) * K.SHIP_MAX;
  }
  q = {
    ...q,
    x: wrap(q.x + vx * K.TICK_DT, K.FIELD_W),
    y: wrap(q.y + vy * K.TICK_DT, K.FIELD_H),
    vx,
    vy,
    angle: a,
    thrusting: th,
    invuln: Math.max(0, q.invuln - K.TICK_DT),
    fireCooldown: Math.max(0, q.fireCooldown - 1),
  };
  if (th && !s.ship.thrusting) api.audio.loop(K.CUES.thrust);
  if (!th && s.ship.thrusting) api.audio.stop(K.CUES.thrust);
  const bs = s.bullets
      .map((x) => ball(x, K.TICK_DT))
      .filter(
        (x) => x.life > 0 && dist(x, { x: K.STAR_X, y: K.STAR_Y }) > K.CORE_R,
      ),
    eb = s.enemyBullets
      .map((x) => ball(x, K.TICK_DT))
      .filter(
        (x) => x.life > 0 && dist(x, { x: K.STAR_X, y: K.STAR_Y }) > K.CORE_R,
      ),
    rs = s.rocks.map((x) => rock(x, K.TICK_DT));
  const ts = s.torpedoes
    .map((t) => ({
      ...t,
      x: wrap(t.x + t.vx * K.TICK_DT, K.FIELD_W),
      y: wrap(t.y + t.vy * K.TICK_DT, K.FIELD_H),
      life: t.life - K.TICK_DT,
    }))
    .filter(
      (t) => t.life > 0 && dist(t, { x: K.STAR_X, y: K.STAR_Y }) > K.CORE_R,
    );
  const sau = s.saucer
    ? {
        ...s.saucer,
        x: s.saucer.x + s.saucer.vx * K.TICK_DT,
        y: wrap(s.saucer.y + s.saucer.vy * K.TICK_DT, K.FIELD_H),
        age: s.saucer.age + K.TICK_DT,
        fireClock: s.saucer.fireClock - K.TICK_DT,
        weaveClock: s.saucer.weaveClock - K.TICK_DT,
      }
    : null;
  let out: ShatterState = {
    ...s,
    ship: q,
    bullets: bs,
    enemyBullets: eb,
    rocks: rs,
    torpedoes: ts,
    saucer: sau,
    simTime: s.simTime + K.TICK_DT,
    torpedoCharge: Math.min(
      1,
      s.torpedoCharge + K.TICK_DT / K.TORPEDO_RECHARGE,
    ),
    waveBanner: Math.max(0, s.waveBanner - K.TICK_DT),
    saucerClock: s.saucer ? s.saucerClock : s.saucerClock + K.TICK_DT,
  };
  for (const t of [...out.torpedoes]) {
    const hit = out.rocks.find((r) => dist(t, r) <= K.TORPEDO_R + rad(r.size));
    if (hit) {
      out = split(out, hit, t.heading, true, api);
      out = { ...out, torpedoes: out.torpedoes.filter((x) => x.id !== t.id) };
    }
  }
  for (const b of [...out.bullets]) {
    const hit = out.rocks.find((r) => dist(b, r) <= K.BULLET_R + rad(r.size));
    if (hit) {
      const hp = hit.health - 1;
      out = {
        ...out,
        bullets: out.bullets.filter((x) => x.id !== b.id),
        rocks: hp
          ? out.rocks.map((r) =>
              r.id === hit.id
                ? { ...r, health: hp, flash: K.HIT_FLASH_TIME }
                : r,
            )
          : out.rocks,
      };
      if (hp) api.audio.play(K.CUES.shatter);
      else out = split(out, hit, Math.atan2(b.vy, b.vx), false, api);
    }
  }
  if (dist(out.ship, { x: K.STAR_X, y: K.STAR_Y }) < K.CORE_R + K.SHIP_R) {
    const dx = out.ship.x - K.STAR_X,
      dy = out.ship.y - K.STAR_Y,
      l = Math.hypot(dx, dy) || 1;
    out = {
      ...out,
      ship: {
        ...out.ship,
        x: K.STAR_X + (dx / l) * (K.CORE_R + K.SHIP_R),
        y: K.STAR_Y + (dy / l) * (K.CORE_R + K.SHIP_R),
      },
    };
  }
  if (
    out.ship.collision &&
    out.ship.invuln <= 0 &&
    (out.rocks.some((r) => dist(out.ship, r) <= K.SHIP_R + rad(r.size)) ||
      (out.saucer && dist(out.ship, out.saucer) <= K.SHIP_R + K.SAUCER_R) ||
      out.enemyBullets.some(
        (b) => dist(out.ship, b) <= K.SHIP_R + K.SAUCER_BULLET_R,
      ))
  ) {
    api.audio.play(K.CUES.death);
    if (out.lives <= 1) return { ...out, lives: 0, screen: "gameover" };
    out = {
      ...out,
      lives: out.lives - 1,
      ship: { ...ship(), invuln: K.INVULN_TIME },
      torpedoCharge: 1,
      torpedoes: [],
    };
  }
  if (
    out.waveSpawning &&
    out.waveBanner === 0 &&
    out.rocks.length === 0 &&
    out.wave > 0
  )
    out = { ...out, wave: out.wave + 1, waveBanner: K.WAVE_BANNER_TIME };
  if (
    out.waveSpawning &&
    out.waveBanner === 0 &&
    out.rocks.length === 0 &&
    out.wave > 0
  )
    out = addWave(out);
  if (out.saucerSpawning && !out.saucer && out.saucerClock >= out.saucerDue) {
    const e = out.nextSaucerEdge ?? (Math.random() < 0.5 ? "left" : "right"),
      row = out.nextSaucerRow ?? rnd(20, 700);
    const [n, id] = alloc(out);
    out = {
      ...n,
      saucer: {
        id,
        x: e === "left" ? -20 : 1300,
        y: row,
        vx: e === "left" ? K.SAUCER_SPEED : -K.SAUCER_SPEED,
        vy: 0,
        mind: true,
        gun: true,
        travel: true,
        weave: 1,
        fireClock: K.SAUCER_FIRE_INTERVAL,
        weaveClock: K.SAUCER_WEAVE_INTERVAL,
        age: 0,
      },
      saucerClock: 0,
      nextSaucerEdge: null,
      nextSaucerRow: null,
    };
    api.audio.play(K.CUES.saucer);
  }
  if (out.saucer && out.saucer.age >= K.SAUCER_LIFETIME)
    out = {
      ...out,
      saucer: null,
      saucerClock: 0,
      saucerDue: rnd(K.SAUCER_GAP_MIN, K.SAUCER_GAP_MAX),
    };
  return out;
}
const menuN = (s: DeepReadonly<ShatterState>) =>
  s.screen === "title" || s.screen === "gameover"
    ? 2
    : s.screen === "paused"
      ? 3
      : 0;
const rect = (s: DeepReadonly<ShatterState>, i: number): Rect | null =>
  i >= 0 && i < menuN(s) ? { x: 420, y: 370 + i * 58, w: 440, h: 46 } : null;
function debug(): ShatterDebugApi {
  const api: ShatterDebugApi = {
    version: K.SHATTER_DEBUG_VERSION,
    reset: () => fresh(),
    snapshot: (s) => ({
      version: 1,
      screen: s.screen,
      menuIndex: s.menuIndex,
      score: s.score,
      lives: s.lives,
      wave: s.wave,
      waveBanner: s.waveBanner,
      muted: s.muted,
      waveSpawning: s.waveSpawning,
      saucerSpawning: s.saucerSpawning,
      saucerClock: s.saucerClock,
      saucerDue: s.saucerDue,
      nextSaucerEdge: s.nextSaucerEdge,
      nextSaucerRow: s.nextSaucerRow,
      nextSaucerAim: s.nextSaucerAim,
      nextRockSpeed: s.nextRockSpeed,
      nextRecycleEdge: s.nextRecycleEdge,
      ship: { ...s.ship, speed: Math.hypot(s.ship.vx, s.ship.vy) },
      bullets: s.bullets.map((x) => ({ ...x })),
      rocks: s.rocks.map((x) => ({ ...x, radius: rad(x.size) })),
      saucer: s.saucer ? { ...s.saucer } : null,
      enemyBullets: s.enemyBullets.map((x) => ({ ...x })),
      torpedoes: s.torpedoes.map((x) => ({ ...x })),
      torpedoCharge: s.torpedoCharge,
      torpedoReady: s.torpedoCharge === 1,
      simTime: s.simTime,
    }),
    reconcile: (s) => copy(s),
    menuItemRect: rect,
    setScreen: (s, v) => ({ ...s, screen: v }),
    setMenuIndex: (s, n) => ({ ...s, menuIndex: n }),
    setScore: (s, n) => ({ ...s, score: n }),
    setLives: (s, n) => ({ ...s, lives: n }),
    setWave: (s, n) => ({ ...s, wave: n }),
    setWaveBanner: (s, n) => ({ ...s, waveBanner: n }),
    setWaveSpawning: (s, v) => ({ ...s, waveSpawning: v }),
    setSaucerSpawning: (s, v) => ({ ...s, saucerSpawning: v }),
    setSaucerDue: (s, n) => ({ ...s, saucerDue: n }),
    setShipPosition: (s, x, y) => ({ ...s, ship: { ...s.ship, x, y } }),
    setShipVelocity: (s, x, y) => ({ ...s, ship: { ...s.ship, vx: x, vy: y } }),
    setShipAngle: (s, n) => ({ ...s, ship: { ...s.ship, angle: n } }),
    setShipInvuln: (s, n) => ({ ...s, ship: { ...s.ship, invuln: n } }),
    setFireCooldown: (s, n) => ({ ...s, ship: { ...s.ship, fireCooldown: n } }),
    setShipCollision: (s, v) => ({ ...s, ship: { ...s.ship, collision: v } }),
    addBullet: (s, x, y, vx, vy) => {
      const [n, i] = alloc(copy(s));
      return {
        ...n,
        bullets: [...n.bullets, { id: i, x, y, vx, vy, life: K.BULLET_LIFE }],
      };
    },
    removeBullet: (s, n) => ({
      ...s,
      bullets: s.bullets.filter((x) => x.id !== n),
    }),
    clearBullets: (s) => ({ ...s, bullets: [] }),
    addEnemyBullet: (s, x, y, vx, vy) => {
      const [n, i] = alloc(copy(s));
      return {
        ...n,
        enemyBullets: [
          ...n.enemyBullets,
          { id: i, x, y, vx, vy, life: K.SAUCER_BULLET_LIFE },
        ],
      };
    },
    removeEnemyBullet: (s, n) => ({
      ...s,
      enemyBullets: s.enemyBullets.filter((x) => x.id !== n),
    }),
    clearEnemyBullets: (s) => ({ ...s, enemyBullets: [] }),
    addRock: (s, size, x, y) => {
      const [n, i] = alloc(copy(s));
      return {
        ...n,
        rocks: [
          ...n.rocks,
          {
            id: i,
            x,
            y,
            vx: 0,
            vy: 0,
            size,
            spin: 0,
            health: K.ROCK_HEALTH[size],
            flash: 0,
          },
        ],
      };
    },
    setRockVelocity: (s, n, x, y) => ({
      ...s,
      rocks: s.rocks.map((r) => (r.id === n ? { ...r, vx: x, vy: y } : r)),
    }),
    setRockHealth: (s, n, hp) => ({
      ...s,
      rocks: s.rocks.map((r) => (r.id === n ? { ...r, health: hp } : r)),
    }),
    removeRock: (s, n) => ({ ...s, rocks: s.rocks.filter((r) => r.id !== n) }),
    clearRocks: (s) => ({ ...s, rocks: [] }),
    addSaucer: (s, x, y) => {
      const [n, i] = alloc(copy(s));
      return {
        ...n,
        saucer: {
          id: i,
          x,
          y,
          vx: K.SAUCER_SPEED,
          vy: 0,
          mind: true,
          gun: true,
          travel: true,
          weave: 1,
          fireClock: K.SAUCER_FIRE_INTERVAL,
          weaveClock: K.SAUCER_WEAVE_INTERVAL,
          age: 0,
        },
      };
    },
    setSaucerVelocity: (s, x, y) => ({
      ...s,
      saucer: s.saucer ? { ...s.saucer, vx: x, vy: y } : null,
    }),
    setSaucerWeave: (s, v) => ({
      ...s,
      saucer: s.saucer ? { ...s.saucer, weave: v } : null,
    }),
    removeSaucer: (s) => ({ ...s, saucer: null }),
    setSaucerMind: (s, v) => ({
      ...s,
      saucer: s.saucer ? { ...s.saucer, mind: v } : null,
    }),
    setSaucerGun: (s, v) => ({
      ...s,
      saucer: s.saucer ? { ...s.saucer, gun: v } : null,
    }),
    setSaucerTravel: (s, v) => ({
      ...s,
      saucer: s.saucer ? { ...s.saucer, travel: v } : null,
    }),
    setNextSaucerEdge: (s, v) => ({ ...s, nextSaucerEdge: v }),
    setNextSaucerRow: (s, v) => ({ ...s, nextSaucerRow: v }),
    setNextSaucerAim: (s, v) => ({ ...s, nextSaucerAim: v }),
    setNextRockSpeed: (s, v) => ({ ...s, nextRockSpeed: v }),
    setNextRecycleEdge: (s, v) => ({ ...s, nextRecycleEdge: v }),
    setTorpedoCharge: (s, v) => ({ ...s, torpedoCharge: v }),
    addTorpedo: (s, x, y, h) => {
      const [n, i] = alloc(copy(s));
      return {
        ...n,
        torpedoes: [
          ...n.torpedoes,
          {
            id: i,
            x,
            y,
            vx: Math.cos(h) * K.TORPEDO_SPEED,
            vy: Math.sin(h) * K.TORPEDO_SPEED,
            heading: h,
            life: K.TORPEDO_LIFE,
            homing: true,
          },
        ],
      };
    },
    setTorpedoHeading: (s, n, h) => ({
      ...s,
      torpedoes: s.torpedoes.map((t) =>
        t.id === n
          ? {
              ...t,
              heading: h,
              vx: Math.cos(h) * K.TORPEDO_SPEED,
              vy: Math.sin(h) * K.TORPEDO_SPEED,
            }
          : t,
      ),
    }),
    setTorpedoHoming: (s, n, v) => ({
      ...s,
      torpedoes: s.torpedoes.map((t) => (t.id === n ? { ...t, homing: v } : t)),
    }),
    removeTorpedo: (s, n) => ({
      ...s,
      torpedoes: s.torpedoes.filter((t) => t.id !== n),
    }),
    clearTorpedoes: (s) => ({ ...s, torpedoes: [] }),
  };
  return api;
}
const txt = (
  c: CanvasRenderingContext2D,
  t: string,
  x: number,
  y: number,
  size: number,
  col = "#dce9ff",
  align: CanvasTextAlign = "left",
) => {
  c.font = `600 ${size}px ui-monospace,monospace`;
  c.fillStyle = col;
  c.textAlign = align;
  c.fillText(t, x, y);
};
const draw = (
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  f: (x: number, y: number) => void,
) => {
  void c;
  for (const dx of [-K.FIELD_W, 0, K.FIELD_W])
    for (const dy of [-K.FIELD_H, 0, K.FIELD_H])
      if (Math.abs(dx) < 100 || Math.abs(dy) < 100) f(x + dx, y + dy);
};
export const game: Game<ShatterState, ShatterDebugApi> = {
  initialize(api: InitApi<ShatterState>) {
    for (const a of K.ACTIONS) api.input.register(a, K.BINDINGS[a]);
    for (const [n, f] of [
      [K.CUES.fire, 720],
      [K.CUES.shatter, 180],
      [K.CUES.thrust, 80],
      [K.CUES.saucer, 240],
      [K.CUES.death, 180],
      [K.CUES.extraLife, 520],
    ] as const)
      api.audio.define(n, {
        wave: "sine",
        freq: f,
        durationMs: n === K.CUES.thrust ? 100 : 120,
        gain: 0.12,
      });
    for (const [n, fn] of [
      ["screen", (s: ShatterState) => s.screen],
      ["score", (s: ShatterState) => s.score],
      ["lives", (s: ShatterState) => s.lives],
      ["wave", (s: ShatterState) => s.wave],
      [
        "ship",
        (s: ShatterState) => `${s.ship.x.toFixed(0)},${s.ship.y.toFixed(0)}`,
      ],
      ["rocks", (s: ShatterState) => s.rocks.length],
      ["bullets", (s: ShatterState) => s.bullets.length],
      ["saucer", (s: ShatterState) => (s.saucer ? "yes" : "none")],
      ["torpedo", (s: ShatterState) => s.torpedoCharge],
      ["simTime", (s: ShatterState) => s.simTime],
    ] as const)
      api.diagnostics.register(n, fn);
    return [fresh(), debug()];
  },
  update(state: DeepReadonly<ShatterState>, api: UpdateApi, dt: number) {
    let s = copy(state);
    s = { ...s, muted: api.audio.muted() };
    if (api.input.pressed("mute")) {
      api.audio.setMuted(!s.muted);
      s = { ...s, muted: !s.muted };
    }
    if (s.screen !== "playing") {
      if (
        s.screen === "paused" &&
        (api.input.pressed("pause") || api.input.pressed("back"))
      )
        return { ...s, screen: "playing" };
      if (
        s.screen === "howto" &&
        (api.input.pressed("back") || api.input.pressed("confirm"))
      )
        return { ...s, screen: "title", menuIndex: 1 };
      if (s.screen !== "howto") {
        const move = api.input.pressed("down")
          ? 1
          : api.input.pressed("up")
            ? -1
            : 0;
        if (move)
          s = { ...s, menuIndex: (s.menuIndex + move + menuN(s)) % menuN(s) };
        if (api.input.pressed("confirm")) {
          if (s.screen === "title" && s.menuIndex === 0)
            s = { ...fresh(), screen: "playing", wave: 1 };
          else if (s.screen === "title") s = { ...s, screen: "howto" };
          else if (s.screen === "paused" && s.menuIndex === 1)
            s = { ...fresh(), screen: "playing", wave: 1 };
          else if (s.screen === "paused" && s.menuIndex === 2) s = fresh();
          else if (s.screen === "gameover" && s.menuIndex === 0)
            s = { ...fresh(), screen: "playing", wave: 1 };
          else if (s.screen === "gameover") s = fresh();
        }
      }
      return s;
    }
    if (api.input.pressed("pause")) return { ...s, screen: "paused" };
    const fire = api.input.value("a") > 0 || api.input.pressed("a");
    let launch = api.input.pressed("b");
    const ticks = Math.floor((s.tickClock + Math.max(dt, 0)) * K.TICK_HZ);
    s = { ...s, tickClock: s.tickClock + Math.max(dt, 0) - ticks * K.TICK_DT };
    for (let i = 0; i < ticks; i++) {
      if (
        fire &&
        s.ship.fireCooldown <= 0 &&
        s.bullets.length < K.MAX_BULLETS
      ) {
        const [n, id] = alloc(s);
        s = {
          ...n,
          bullets: [
            ...n.bullets,
            {
              id,
              x: s.ship.x + Math.cos(s.ship.angle) * K.SHIP_R,
              y: s.ship.y + Math.sin(s.ship.angle) * K.SHIP_R,
              vx: s.ship.vx + Math.cos(s.ship.angle) * K.MUZZLE_SPEED,
              vy: s.ship.vy + Math.sin(s.ship.angle) * K.MUZZLE_SPEED,
              life: K.BULLET_LIFE,
            },
          ],
          ship: { ...n.ship, fireCooldown: K.FIRE_INTERVAL_TICKS },
        };
        api.audio.play(K.CUES.fire);
      }
      if (launch && s.torpedoCharge === 1 && s.torpedoes.length === 0) {
        const [n, id] = alloc(s);
        s = {
          ...n,
          torpedoes: [
            ...n.torpedoes,
            {
              id,
              x: s.ship.x + Math.cos(s.ship.angle) * K.SHIP_R,
              y: s.ship.y + Math.sin(s.ship.angle) * K.SHIP_R,
              vx: Math.cos(s.ship.angle) * K.TORPEDO_SPEED,
              vy: Math.sin(s.ship.angle) * K.TORPEDO_SPEED,
              heading: s.ship.angle,
              life: K.TORPEDO_LIFE,
              homing: true,
            },
          ],
          torpedoCharge: 0,
        };
        launch = false;
      }
      s = step(s, api);
    }
    return s;
  },
  render(state: DeepReadonly<ShatterState>, api: RenderApi) {
    const c = api.ctx;
    c.fillStyle = BACKGROUND;
    c.fillRect(0, 0, K.FIELD_W, K.FIELD_H);
    const g = c.createRadialGradient(
      K.STAR_X,
      K.STAR_Y,
      10,
      K.STAR_X,
      K.STAR_Y,
      K.HALO_R * 1.5,
    );
    g.addColorStop(0, "#ffe07a");
    g.addColorStop(0.2, "#d8794b66");
    g.addColorStop(1, "#0000");
    c.fillStyle = g;
    c.beginPath();
    c.arc(K.STAR_X, K.STAR_Y, K.HALO_R * 1.5, 0, 7);
    c.fill();
    c.fillStyle = "#ffe17a";
    c.beginPath();
    c.arc(K.STAR_X, K.STAR_Y, K.CORE_R, 0, 7);
    c.fill();
    for (const r of state.rocks)
      draw(c, r.x, r.y, (x, y) => {
        c.strokeStyle = r.flash ? "#fff" : "#aebed0";
        c.lineWidth = 3;
        c.beginPath();
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4,
            rr =
              K.ROCK_RADIUS[r.size] * (0.82 + 0.16 * Math.sin(i * 5 + r.spin));
          c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
        }
        c.closePath();
        c.stroke();
      });
    for (const b of state.bullets)
      draw(c, b.x, b.y, (x, y) => {
        c.fillStyle = "#b5efff";
        c.beginPath();
        c.arc(x, y, 3, 0, 7);
        c.fill();
      });
    for (const t of state.torpedoes)
      draw(c, t.x, t.y, (x, y) => {
        c.fillStyle = "#fff2a8";
        c.beginPath();
        c.arc(x, y, 6, 0, 7);
        c.fill();
      });
    if (state.saucer)
      draw(c, state.saucer.x, state.saucer.y, (x, y) => {
        c.fillStyle = "#e78cff";
        c.beginPath();
        c.ellipse(x, y, 24, 9, 0, 0, 7);
        c.fill();
      });
    draw(c, state.ship.x, state.ship.y, (x, y) => {
      c.save();
      c.translate(x, y);
      c.rotate(state.ship.angle);
      c.strokeStyle = "#82eaff";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(18, 0);
      c.lineTo(-13, -11);
      c.lineTo(-8, 0);
      c.lineTo(-13, 11);
      c.closePath();
      c.stroke();
      c.restore();
    });
    if (state.screen !== "playing") {
      c.fillStyle = "#050817bb";
      c.fillRect(0, 0, K.FIELD_W, K.FIELD_H);
      txt(c, "SHATTER", 640, 170, 84, "#eaf6ff", "center");
      txt(c, "GRAVITY WELL SHOOTER", 640, 205, 16, "#f2a1ff", "center");
      if (state.screen === "howto") {
        txt(
          c,
          "Shoot every rock through its fragments.",
          640,
          300,
          20,
          "#dce9ff",
          "center",
        );
        txt(
          c,
          "The star bends shots, but never your ship.",
          640,
          335,
          20,
          "#dce9ff",
          "center",
        );
        txt(
          c,
          "ARROWS / WASD fly   SPACE fire   F torpedo   M mute",
          640,
          470,
          15,
          "#91aac7",
          "center",
        );
      } else {
        const items =
          state.screen === "title"
            ? ["PLAY", "HOW TO PLAY"]
            : state.screen === "paused"
              ? ["RESUME", "RESTART", "QUIT TO MENU"]
              : ["PLAY AGAIN", "MENU"];
        for (let i = 0; i < items.length; i++)
          txt(
            c,
            items[i],
            640,
            400 + i * 58,
            22,
            i === state.menuIndex ? "#f8e895" : "#8ea7c0",
            "center",
          );
      }
    } else {
      txt(c, String(state.score).padStart(6, "0"), 30, 42, 28);
      txt(
        c,
        `TORPEDO ${Math.round(state.torpedoCharge * 100)}%`,
        30,
        70,
        13,
        "#9fb8d4",
      );
    }
  },
};
