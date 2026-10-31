import {
  CanvasTexture,
  DirectionalLight,
  HemisphereLight,
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
  const material = new MeshLambertMaterial({ map: texture });
  const sphere = new Mesh(geometry, material);
  sphere.rotation.set(0.12, 0.15, -0.08);
  scene.add(sphere);
  scene.add(new HemisphereLight(0xffffff, 0xaeb99d, 2));
  const key = new DirectionalLight(0xfff8ed, 1.1);
  key.position.set(-3, 4, 5);
  const rim = new DirectionalLight(0xf1d2b3, 0.35);
  rim.position.set(3, 1, -2);
  scene.add(key, rim);

  let active = false;
  let disposed = false;
  let frame = 0;
  let lastFrame = 0;
  let lastDraw = 0;
  const frameInterval = 1000 / 30;
  const fullTurn = Math.PI * 2;
  const spinDuration = 12000;

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
    // Repeat on opposite hemispheres so the mark returns as the sphere turns.
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
    const turn = (Math.min(now - lastDraw, 100) / spinDuration) * fullTurn;
    sphere.rotation.x = (sphere.rotation.x + turn * 0.75) % fullTurn;
    sphere.rotation.y = (sphere.rotation.y + turn) % fullTurn;
    sphere.rotation.z = (sphere.rotation.z + turn * 0.6) % fullTurn;
    lastDraw = now;
    render();
  }

  function setActive(next: boolean) {
    if (disposed || active === next) return;
    active = next;
    canvas.dataset.renderState = next ? "running" : "idle";
    if (next) {
      lastFrame = performance.now();
      lastDraw = lastFrame;
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
