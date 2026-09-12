"use client";

import dynamic from "next/dynamic";

/**
 * WebGL never runs on the server, and the three.js bundle stays out of the
 * initial payload — the headline paints before the canvas arrives.
 */
const BottleScene = dynamic(
  () => import("./BottleScene").then((m) => m.BottleScene),
  { ssr: false },
);

export function SceneLayer() {
  return <BottleScene />;
}
