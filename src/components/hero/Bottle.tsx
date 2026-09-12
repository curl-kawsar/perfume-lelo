"use client";

import { useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import { MathUtils } from "three";

type BottleProps = {
  /** Cursor-follow and idle sway are switched off when motion is reduced. */
  reducedMotion: boolean;
  /** Transmission samples. Lowered on weaker devices. */
  samples: number;
};

/**
 * A flacon built from primitives rather than a loaded model: a transmissive
 * glass body over a tinted volume of juice, capped by three chrome staves.
 * When real .glb models arrive, this becomes the fallback for products that
 * do not ship one.
 */
export function Bottle({ reducedMotion, samples }: BottleProps) {
  const group = useRef<Group>(null);

  // Drag state lives in refs so dragging never triggers a React render.
  const dragging = useRef(false);
  const spin = useRef(0);
  const lastX = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Frame-rate independent easing.
    const ease = 1 - Math.pow(0.001, delta);

    if (reducedMotion) {
      g.rotation.y = spin.current;
      g.rotation.x = 0;
      g.position.y = 0;
      return;
    }

    if (!dragging.current) {
      // The bottle turns toward the cursor, then unwinds back to front-facing.
      const { x, y } = state.pointer;
      spin.current = MathUtils.lerp(spin.current, x * 0.42, ease * 0.6);
      g.rotation.x = MathUtils.lerp(g.rotation.x, -y * 0.14, ease * 0.6);
    }

    g.rotation.y = spin.current;

    // Slow levitation. One cycle every ~7s, barely perceptible.
    const t = state.clock.elapsedTime;
    g.position.y = Math.sin(t * 0.9) * 0.045;
    if (!dragging.current) {
      g.rotation.z = Math.sin(t * 0.7) * 0.012;
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (reducedMotion) return;
    e.stopPropagation();
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    spin.current += (e.clientX - lastX.current) * 0.01;
    lastX.current = e.clientX;
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    document.body.style.cursor = "";
  };

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerOver={() => {
        if (!dragging.current && !reducedMotion) {
          document.body.style.cursor = "grab";
        }
      }}
      onPointerOut={() => {
        if (!dragging.current) document.body.style.cursor = "";
      }}
    >
      {/* Juice. The only saturated thing on the page — a pale tea note,
          sitting a little over half full. */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.02, 0.78, 0.33]} />
        <meshPhysicalMaterial
          color="#dccaa6"
          transmission={0.92}
          thickness={1.6}
          roughness={0.08}
          ior={1.38}
          attenuationColor="#c6ad81"
          attenuationDistance={2.4}
        />
      </mesh>

      {/* Glass body */}
      <RoundedBox args={[1.16, 1.5, 0.46]} radius={0.055} smoothness={6}>
        <MeshTransmissionMaterial
          samples={samples}
          resolution={256}
          thickness={0.62}
          roughness={0.03}
          ior={1.52}
          chromaticAberration={0.055}
          anisotropicBlur={0.3}
          distortion={0.12}
          distortionScale={0.25}
          temporalDistortion={0}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.04}
          attenuationColor="#dfe6e9"
          attenuationDistance={3}
          color="#ffffff"
        />
      </RoundedBox>

      {/* Neck */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.15, 0.19, 0.22, 48]} />
        <MeshTransmissionMaterial
          samples={Math.max(2, samples - 4)}
          resolution={128}
          thickness={0.3}
          roughness={0.05}
          ior={1.52}
          chromaticAberration={0.03}
          transmission={1}
        />
      </mesh>

      {/* Chrome collar */}
      <mesh position={[0, 0.99, 0]}>
        <cylinderGeometry args={[0.215, 0.215, 0.075, 48]} />
        <meshStandardMaterial
          color="#c3cace"
          metalness={1}
          roughness={0.14}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Cap: three chrome staves with a sliver of shadow between them. */}
      {[-0.157, 0, 0.157].map((x, i) => (
        <RoundedBox
          key={x}
          args={[0.138, 0.44, 0.3]}
          radius={0.014}
          smoothness={4}
          position={[x, 1.245, 0]}
        >
          <meshStandardMaterial
            color={i === 1 ? "#e6eaec" : "#b6bec3"}
            metalness={1}
            roughness={i === 1 ? 0.08 : 0.2}
            envMapIntensity={1.7}
          />
        </RoundedBox>
      ))}
    </group>
  );
}
