"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Bottle } from "./Bottle";

/** Matches the CSS breakpoint where the hero switches to a stacked layout. */
const COMPACT = "(max-width: 768px)";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function BottleScene() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery(COMPACT);

  // Transmission is the expensive pass. Phones get a cheaper one.
  const samples = compact ? 4 : 10;

  return (
    <Canvas
      camera={{ position: [0, 0.12, 5.3], fov: 32 }}
      dpr={[1, compact ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <Bottle reducedMotion={reducedMotion} samples={samples} />

        {/* Grounds the bottle on the sweep. Without this it floats in a void. */}
        <ContactShadows
          position={[0, -0.94, 0]}
          opacity={0.42}
          scale={5}
          blur={2.6}
          far={1.6}
          resolution={512}
          color="#8d979d"
        />

        {/* A softbox rig rather than a downloaded HDRI: nothing to fetch, and
            the highlights are placed deliberately on the glass edges. */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={4}
            position={[0, 3.2, 1.5]}
            scale={[8, 3, 1]}
            rotation={[-Math.PI / 2.4, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[-3.4, 0.4, 1.2]}
            scale={[2.5, 5, 1]}
            rotation={[0, Math.PI / 2.6, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[3.4, 0.2, 1]}
            scale={[2, 5, 1]}
            rotation={[0, -Math.PI / 2.6, 0]}
          />
          <Lightformer
            form="circle"
            intensity={1.4}
            position={[0, -2.4, 1.8]}
            scale={4}
            rotation={[Math.PI / 2, 0, 0]}
          />
          {/* Warm rim from behind, so the juice reads as liquid. */}
          <Lightformer
            form="rect"
            intensity={1.1}
            color="#f2e4cc"
            position={[0.8, 0.2, -2.4]}
            scale={[3, 3, 1]}
          />
        </Environment>

        <ambientLight intensity={0.45} />
        <directionalLight position={[2.5, 4, 3]} intensity={0.9} />
      </Suspense>
    </Canvas>
  );
}
