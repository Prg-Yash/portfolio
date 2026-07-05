import * as THREE from "three";

export const createGlowParticleTexture = (): THREE.CanvasTexture => {
  const canvasSprite = document.createElement("canvas");
  canvasSprite.width = 64;
  canvasSprite.height = 64;
  const ctx = canvasSprite.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.85)");
    grad.addColorStop(0.8, "rgba(255,255,255,0.15)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvasSprite);
};

export const updateParticleColors = (
  colArr: Float32Array,
  sizeArr: Float32Array,
  baseSizes: Float32Array,
  particleCount: number,
  currentColor: THREE.Color,
  isShockwaveOrWarp: boolean
): void => {
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    if (isShockwaveOrWarp) {
      colArr[i3] = i % 2 === 0 ? 0.0 : 1.0; // Cyan/Magenta pulse
      colArr[i3 + 1] = i % 2 === 0 ? 0.94 : 0.0;
      colArr[i3 + 2] = 1.0;
      sizeArr[i] = Math.min(2.5, (baseSizes[i] || 0.8) * 1.8);
    } else {
      colArr[i3] = currentColor.r + Math.sin(i) * 0.05;
      colArr[i3 + 1] = currentColor.g + Math.cos(i) * 0.05;
      colArr[i3 + 2] = currentColor.b + Math.sin(i * 2) * 0.05;
      sizeArr[i] = baseSizes[i] || 0.8;
    }
  }
};
