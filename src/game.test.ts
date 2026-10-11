import { describe, expect, it } from "vitest";
import type { InitApi } from "@clockwyrks/simple-2d";
import { game } from "./game";

async function setup() {
  const registered = new Map<string, unknown>();
  const api = {
    input: {
      register: (name: string, binding: unknown) =>
        registered.set(name, binding),
      layout: () => null,
    },
    audio: { define: () => undefined, load: async () => undefined },
    assets: {
      loadImage: async () => ({}),
      loadAudio: async () => ({}),
      load: async () => new Blob(),
      resolve: (path: string) => path,
    },
    diagnostics: { register: () => undefined },
    events: {},
    viewport: () => ({ width: 1280, height: 720, scale: 1, x: 0, y: 0 }),
  } as unknown as InitApi<never>;
  const [state, debug] = await game.initialize(api as InitApi<never>);
  return { state, debug, registered };
}

describe("Shatter debug surface", () => {
  it("initializes the title state and all actions", async () => {
    const { state, debug, registered } = await setup();
    expect(state.screen).toBe("title");
    expect(debug.snapshot(state).torpedoReady).toBe(true);
    expect(registered.size).toBe(10);
  });

  it("poses entities without advancing the simulation", async () => {
    const { state, debug } = await setup();
    const withRock = debug.addRock(state, "large", 200, 200);
    const withBullet = debug.addBullet(withRock, 300, 300, 10, 0);
    const snapshot = debug.snapshot(withBullet);
    expect(snapshot.rocks[0].radius).toBe(46);
    expect(snapshot.bullets).toHaveLength(1);
    expect(snapshot.simTime).toBe(0);
  });
});
