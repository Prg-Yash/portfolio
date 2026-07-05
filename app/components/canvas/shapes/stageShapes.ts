export type ShapeGenerator = (index: number, totalCount: number) => [number, number, number];

// Stage 0: VOID / HERO — Ethereal humanoid silhouette suspended in the void (matching banner.webp)
const generateVoidShape: ShapeGenerator = (i, totalCount) => {
  const t = Math.random();
  const y = (t - 0.5) * 6.0;
  let radius = 0.5;
  if (y > 1.8) radius = 0.5;
  else if (y > 0.6) radius = 1.35;
  else if (y > -1.0) radius = 0.75;
  else radius = 1.0;

  const angle = Math.random() * Math.PI * 2;
  const isHalo = Math.random() > 0.75;
  const r = isHalo ? radius * (1.2 + Math.random() * 1.5) : Math.sqrt(Math.random()) * radius;
  return [r * Math.cos(angle) + (isHalo ? (Math.random() - 0.5) * 1.5 : 0), y, r * Math.sin(angle) * 0.6];
};

// Stage 1: AWAKENING — Humanoid torso / ascending column
const generateAwakeningShape: ShapeGenerator = (i) => {
  const t = Math.random();
  const y = (t - 0.5) * 5.0;
  let radius = 0.6;
  if (y > 1.5) radius = 0.45;
  else if (y > 0.5) radius = 1.2;
  else if (y > -1.0) radius = 0.7;
  else radius = 0.9;

  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * radius;
  return [r * Math.cos(angle), y, r * Math.sin(angle) * 0.5];
};

// Stage 2: CURIOSITY — 3 Orbital satellite rings & outward sparks
const generateCuriosityShape: ShapeGenerator = (i) => {
  const ring = i % 3;
  const angle = Math.random() * Math.PI * 2;
  const r = 1.5 + ring * 0.8;
  if (ring === 0) return [r * Math.cos(angle), r * Math.sin(angle) * 0.3, r * Math.sin(angle)];
  if (ring === 1) return [r * Math.cos(angle) * 0.3, r * Math.sin(angle), r * Math.cos(angle)];
  return [r * Math.cos(angle), r * Math.sin(angle), (Math.random() - 0.5) * 0.5];
};

// Stage 3: LEARNING — Structured geometric neural grid / constellation cube
const generateLearningShape: ShapeGenerator = (i, totalCount) => {
  const side = Math.ceil(Math.cbrt(totalCount));
  const x = (i % side) / side - 0.5;
  const y = (Math.floor(i / side) % side) / side - 0.5;
  const z = (Math.floor(i / (side * side)) % side) / side - 0.5;
  return [x * 3.5, y * 3.5, z * 3.5];
};

// Stage 4: CREATION — Dynamic double-helix / expanding galactic spiral
const generateCreationShape: ShapeGenerator = (i, totalCount) => {
  const t = (i / totalCount) * Math.PI * 10;
  const r = 0.5 + (i / totalCount) * 2.5;
  const arm = i % 2 === 0 ? 0 : Math.PI;
  return [r * Math.cos(t + arm), (i / totalCount - 0.5) * 4.0, r * Math.sin(t + arm)];
};

// Stage 5: FAILURE — Shattered, chaotic dispersed debris cloud
const generateFailureShape: ShapeGenerator = () => {
  const r = 2.0 + Math.random() * 3.0;
  const u = Math.random() * Math.PI * 2;
  const v = Math.acos(2 * Math.random() - 1);
  return [r * Math.sin(v) * Math.cos(u), r * Math.sin(v) * Math.sin(u) * 0.5 - 1.0, r * Math.cos(v)];
};

// Stage 6: TRANSFORMATION — Reassembling crystalline octahedron / sacred geometry
const generateTransformationShape: ShapeGenerator = (i, totalCount) => {
  const t = (i / totalCount) * Math.PI * 2;
  const r = 2.0 * Math.sin((i % 10) * 0.3);
  return [r * Math.cos(t), ((i % 20) - 10) * 0.2, r * Math.sin(t)];
};

// Stage 7: WISDOM — Calm, harmonious concentric torus rings
const generateWisdomShape: ShapeGenerator = () => {
  const u = Math.random() * Math.PI * 2;
  const v = Math.random() * Math.PI * 2;
  const R = 2.2;
  const r = 0.6;
  return [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u) * 0.4, r * Math.sin(v)];
};

// Stage 8: LEGACY — Expansive glowing constellation filling viewport
const generateLegacyShape: ShapeGenerator = () => {
  const u = Math.random() * Math.PI * 2;
  const v = Math.acos(2 * Math.random() - 1);
  const r = 1.5 + Math.random() * 2.5;
  return [r * Math.sin(v) * Math.cos(u), r * Math.sin(v) * Math.sin(u), r * Math.cos(v)];
};

export const STAGE_SHAPES: ShapeGenerator[] = [
  generateVoidShape,
  generateAwakeningShape,
  generateCuriosityShape,
  generateLearningShape,
  generateCreationShape,
  generateFailureShape,
  generateTransformationShape,
  generateWisdomShape,
  generateLegacyShape,
];

export const buildStageShapes = (particleCount: number): Float32Array[] => {
  const shapes: Float32Array[] = [];
  for (let s = 0; s < STAGE_SHAPES.length; s++) {
    const generator = STAGE_SHAPES[s];
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const [x, y, z] = generator(i, particleCount);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    shapes.push(arr);
  }
  return shapes;
};
