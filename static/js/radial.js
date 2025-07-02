// radial.js
// wolniejsze drag + łagodna inercja ograniczona do koła

document.addEventListener('DOMContentLoaded', () => {
  const circle  = document.getElementById('radial-circle');
  const handle  = document.getElementById('radial-handle');
  const message = document.getElementById('message');

  const rect   = circle.getBoundingClientRect();
  const cx     = rect.left + rect.width/2;
  const cy     = rect.top  + rect.height/2;
  const handleR = handle.offsetWidth/2;
  const radius  = rect.width/2 - handleR;

  let isDragging = false;
  let lastTime   = 0;
  let lastPos    = { x: 0, y: 0 };
  let vel        = { x: 0, y: 0 };
  let targetPos  = { x: 0, y: 0 };
  let inertiaId;

  message.textContent = 'Przeciągnij i rzuć kółko';

  function clamp(vx, vy) {
    const len = Math.hypot(vx, vy);
    if (len > radius) {
      const f = radius / len;
      return { x: vx * f, y: vy * f };
    }
    return { x: vx, y: vy };
  }

  function setHandle(vx, vy) {
    handle.style.left = (cx + vx - rect.left) + 'px';
    handle.style.top  = (cy + vy - rect.top ) + 'px';
  }

  function inertiaStep(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    // miękka inercja
    const friction = Math.exp(-4 * dt);
    vel.x *= friction; vel.y *= friction;

    let vx = lastPos.x + vel.x * dt;
    let vy = lastPos.y + vel.y * dt;
    ({ x: vx, y: vy } = clamp(vx, vy));
    lastPos = { x: vx, y: vy };
    setHandle(vx, vy);

    if (Math.hypot(vel.x, vel.y) > 1) {
      inertiaId = requestAnimationFrame(inertiaStep);
    }
  }

  function onDown(e) {
    isDragging = true;
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('dragging');
    lastTime = performance.now();

    // początkowy wektor od środka
    const initV = clamp(
      handle.offsetLeft + handleR + rect.left - cx,
      handle.offsetTop  + handleR + rect.top  - cy
    );
    lastPos   = { ...initV };
    vel       = { x: 0, y: 0 };
    const raw  = { x: e.clientX - cx, y: e.clientY - cy };
    targetPos  = clamp(raw.x, raw.y);
  }

  function onMove(e) {
    if (!isDragging) return;
    const now = performance.now();
    const dt  = (now - lastTime) / 1000;
    lastTime = now;

    // surowy wektor
    let raw = { x: e.clientX - cx, y: e.clientY - cy };
    targetPos = clamp(raw.x, raw.y);

    // prędkość na bazie różnicy
    vel.x = (targetPos.x - lastPos.x) / dt;
    vel.y = (targetPos.y - lastPos.y) / dt;

    // **lerp** -> wolniejszy ruch
    lastPos.x += (targetPos.x - lastPos.x) * 0.2;
    lastPos.y += (targetPos.y - lastPos.y) * 0.2;
    setHandle(lastPos.x, lastPos.y);
  }

  function onUp(e) {
    isDragging = false;
    handle.releasePointerCapture(e.pointerId);
    handle.classList.remove('dragging');
    lastTime = performance.now();
    inertiaId = requestAnimationFrame(inertiaStep);
  }

  handle.addEventListener('pointerdown', onDown);
  handle.addEventListener('pointermove', onMove);
  handle.addEventListener('pointerup',   onUp);
});
