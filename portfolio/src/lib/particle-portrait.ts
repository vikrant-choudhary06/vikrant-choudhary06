// Draws the hero portrait as a field of GPU particles (Three.js points).
// HeroMotion decides where the picture sits each frame; this module only
// samples the image once and renders points towards that frame.

export interface ParticleFrame {
  /** Where the image content is drawn, in viewport pixels. */
  rect: { x: number; y: number; width: number; height: number };
  /** The portrait's own box, used to clip and fade like the real image's CSS mask. */
  box: { x: number; y: number; width: number; height: number };
  /** 0 = facing forward, 1 = mirrored (the portrait flips on its way to About). */
  flip: number;
  /** 0 = particles sit on the face, 1 = fully burst apart. */
  scatter: number;
  /** 0 → 1 while the opening assembly plays. */
  intro: number;
  /** Overall particle opacity. */
  opacity: number;
  time: number;
}

export interface ParticlePortrait {
  render(frame: ParticleFrame): void;
  resize(): void;
  dispose(): void;
}

const VERTEX = /* glsl */ `
  uniform vec2 uViewport;
  uniform vec4 uRect;
  uniform vec4 uBox;
  uniform float uFlip, uScatter, uIntro, uTime, uSize, uDpr;
  attribute vec2 aUv;
  attribute vec4 aColor;
  attribute vec4 aSeed;
  varying vec4 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = vec2(mix(aUv.x, 1.0 - aUv.x, uFlip), aUv.y);
    vec2 home = uRect.xy + uv * uRect.zw;

    // Opening: every particle starts somewhere random on screen and flies home, staggered.
    float t = clamp((uIntro * 1.6 - aSeed.w * 0.6), 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec2 pos = mix(aSeed.xy * uViewport, home, t);

    // Scroll: burst outwards along a per-particle direction, with a slow drift on top.
    vec2 dir = normalize(aSeed.xy - 0.5 + 0.0001);
    pos += dir * uScatter * (140.0 + aSeed.z * 420.0);
    pos += vec2(sin(uTime * 1.1 + aSeed.w * 40.0), cos(uTime * 0.9 + aSeed.z * 40.0)) * uScatter * 26.0;

    gl_Position = vec4(pos.x / uViewport.x * 2.0 - 1.0, 1.0 - pos.y / uViewport.y * 2.0, 0.0, 1.0);
    gl_PointSize = uSize * uDpr * (1.0 + uScatter * 0.8);

    // At rest, match the real image: clipped to its box and fading out at the bottom.
    vec2 inBox = (home - uBox.xy) / uBox.zw;
    float inside = step(0.0, inBox.x) * step(inBox.x, 1.0) * step(0.0, inBox.y) * step(inBox.y, 1.0);
    float rest = inside * (1.0 - smoothstep(0.82, 1.0, inBox.y));
    vAlpha = t * mix(rest, 1.0, smoothstep(0.0, 0.25, uScatter));
    vColor = aColor;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  varying vec4 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(vColor.rgb, vColor.a * vAlpha * uOpacity);
  }
`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function createParticlePortrait(
  canvas: HTMLCanvasElement,
  src: string,
  count: number,
): Promise<ParticlePortrait> {
  const [T, image] = await Promise.all([import("three"), loadImage(src)]);

  // Sample the image on a grid sized so that the opaque pixels give roughly `count` points.
  const opaqueShare = 0.58;
  const grid = Math.round(Math.sqrt(count / opaqueShare));
  const sampler = document.createElement("canvas");
  sampler.width = sampler.height = grid;
  const context = sampler.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("2D canvas unavailable");
  context.drawImage(image, 0, 0, grid, grid);
  const pixels = context.getImageData(0, 0, grid, grid).data;

  const uvs: number[] = [];
  const colors: number[] = [];
  const seeds: number[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const i = (y * grid + x) * 4;
      const alpha = pixels[i + 3] / 255;
      if (alpha < 0.45) continue;
      // Jitter within 70% of the cell: enough to break the lattice (no moire), small
      // enough to keep edges crisp.
      uvs.push((x + 0.5 + (Math.random() - 0.5) * 0.7) / grid, (y + 0.5 + (Math.random() - 0.5) * 0.7) / grid);
      colors.push(pixels[i] / 255, pixels[i + 1] / 255, pixels[i + 2] / 255, alpha);
      seeds.push(Math.random(), Math.random(), Math.random(), Math.random());
    }
  }

  const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const geometry = new T.BufferGeometry();
  const total = uvs.length / 2;
  geometry.setAttribute("position", new T.BufferAttribute(new Float32Array(total * 3), 3));
  geometry.setAttribute("aUv", new T.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setAttribute("aColor", new T.BufferAttribute(new Float32Array(colors), 4));
  geometry.setAttribute("aSeed", new T.BufferAttribute(new Float32Array(seeds), 4));

  const uniforms = {
    uViewport: { value: new T.Vector2(1, 1) },
    uRect: { value: new T.Vector4() },
    uBox: { value: new T.Vector4(0, 0, 1, 1) },
    uFlip: { value: 0 },
    uScatter: { value: 0 },
    uIntro: { value: 0 },
    uTime: { value: 0 },
    uSize: { value: 2 },
    uDpr: { value: dpr },
    uOpacity: { value: 1 },
  };
  const material = new T.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const points = new T.Points(geometry, material);
  points.frustumCulled = false;
  const scene = new T.Scene();
  scene.add(points);
  const camera = new T.Camera();

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    uniforms.uViewport.value.set(window.innerWidth, window.innerHeight);
  };
  resize();

  return {
    resize,
    render(frame) {
      const { rect, box } = frame;
      uniforms.uRect.value.set(rect.x, rect.y, rect.width, rect.height);
      uniforms.uBox.value.set(box.x, box.y, Math.max(1, box.width), Math.max(1, box.height));
      uniforms.uFlip.value = frame.flip;
      uniforms.uScatter.value = frame.scatter;
      uniforms.uIntro.value = frame.intro;
      uniforms.uTime.value = frame.time;
      uniforms.uOpacity.value = frame.opacity;
      // Points larger than the grid spacing, so neighbours overlap and no paper shows through.
      uniforms.uSize.value = Math.max(1.5, (rect.width / grid) * 1.7);
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
