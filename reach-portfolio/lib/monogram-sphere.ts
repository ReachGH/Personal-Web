import {
  AmbientLight,
  CanvasTexture,
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  OrthographicCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";

export function createMonogramSphere(
  host: HTMLElement,
  onContextLost: () => void,
) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 256;
  const context = textureCanvas.getContext("2d");
  if (!context) throw new Error("Canvas texture unavailable");

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  const canvas = renderer.domElement;
  // Three.js sets an inline display value; leave visibility to our motion CSS.
  canvas.style.display = "";
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.maxFps = "30";
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1.12, 1.12, 1.12, -1.12, 0.1, 10);
  camera.position.z = 4;

  const texture = new CanvasTexture(textureCanvas);
  texture.colorSpace = SRGBColorSpace;
  const geometry = new SphereGeometry(1, 32, 24);
  // Mostly ambient fill keeps the shadow side only slightly darker.
  // Lambert shading adds form without reflective highlights or shadow maps.
  const material = new MeshLambertMaterial({ map: texture });
  const sphere = new Mesh(geometry, material);
  sphere.rotation.set(0, 0, -0.08);
  scene.add(sphere);
  // Compensate for Lambert's 1/PI response: roughly 94–104% base colour.
  scene.add(new AmbientLight(0xffffff, Math.PI * 0.94));
  const light = new DirectionalLight(0xffffff, Math.PI * 0.1);
  light.position.set(-3, 4, 5);
  scene.add(light);

  let disposed = false;
  let active = false;
  let frame = 0;
  let lastFrame = 0;
  let lastDraw = 0;
  const frameInterval = 1000 / 30;
  const fullTurn = Math.PI * 2;
  const spinDuration = 10000;
  let spinPhase = 0;

  function render() {
    if (!disposed) renderer.render(scene, camera);
  }

  function updateTheme() {
    const style = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.theme === "dark";
    // A slightly lighter sage keeps the sphere legible against the dark page.
    context!.fillStyle = dark ? "#c4cfb2" : "#e3e8d8";
    context!.fillRect(0, 0, 512, 256);
    context!.font = `600 168px ${style.getPropertyValue("--font-display").trim()}, sans-serif`;
    context!.textBaseline = "middle";
    const letterWidth = context!.measureText("r").width;
    const dotWidth = context!.measureText(".").width;
    // Opposite marks return every half-turn while the sphere spins upright.
    for (const centre of [128, 384]) {
      const left = centre - (letterWidth + dotWidth) / 2;
      context!.fillStyle = "#252e21";
      context!.fillText("r", left, 133);
      context!.fillStyle = style.getPropertyValue("--accent").trim();
      context!.fillText(".", left + letterWidth, 133);
    }
    texture.needsUpdate = true;
    render();
  }

  function resize() {
    // This is a 42–64 CSS-pixel object, not a full-hero WebGL surface.
    const side = Math.min(
      160,
      Math.ceil(host.clientWidth * Math.min(devicePixelRatio, 2)),
    );
    if (side > 0 && (canvas.width !== side || canvas.height !== side)) {
      renderer.setSize(side, side, false);
      render();
    }
  }

  function animate(now: number) {
    if (!active || disposed) return;
    frame = requestAnimationFrame(animate);
    const elapsed = now - lastFrame;
    if (elapsed < frameInterval) return;
    lastFrame = now - (elapsed % frameInterval);
    spinPhase =
      (spinPhase + (Math.min(now - lastDraw, 100) / spinDuration) * fullTurn) %
      fullTurn;
    // Linger on the readable front/back marks, then move faster through
    // edge-on views. The spin stays continuous and never reverses direction.
    sphere.rotation.y = spinPhase - 0.38 * Math.sin(2 * spinPhase);
    lastDraw = now;
    render();
  }

  function setActive(next: boolean) {
    if (disposed || active === next) return;
    active = next;
    canvas.dataset.renderState = next ? "running" : "idle";
    if (next) {
      lastFrame = lastDraw = performance.now();
      frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  const themeObserver = new MutationObserver(updateTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  canvas.addEventListener("webglcontextlost", onContextLost);
  host.appendChild(canvas);
  updateTheme();
  resize();
  resizeObserver.observe(host);
  canvas.dataset.drawCalls = String(renderer.info.render.calls);
  canvas.dataset.triangles = String(renderer.info.render.triangles);
  canvas.dataset.renderState = "idle";

  return {
    setActive,
    dispose() {
      if (disposed) return;
      setActive(false);
      disposed = true;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}

export type MonogramSphereScene = ReturnType<typeof createMonogramSphere>;
