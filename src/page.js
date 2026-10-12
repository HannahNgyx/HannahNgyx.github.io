function listen(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

function startPond(pondUrl, isCancelled) {
  const room = document.querySelector(".room");
  const canvas = document.querySelector(".field");
  if (!room || !canvas) return () => {};
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return () => {};

  const stops = [];
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DROP_COUNT = 12;
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let reduce = motionQuery.matches;
  let onscreen = false;
  let imageReady = false;
  const pointer = { x: 0.32, y: 0.55, active: false, wake: 0 };
  const drops = new Float32Array(DROP_COUNT * 3);
  drops.fill(-1);
  let dropIndex = 0;
  let lastDrop = { x: -1, y: -1, t: 0 };

  let dropGlsl = "";
  for (let i = 0; i < DROP_COUNT; i += 1) {
    dropGlsl += `
      {
        float born = uDrops[${i}].z;
        float age = uTime - born;
        float alive = step(0.0, born) * step(0.0, age) * step(age, 3.4);
        vec2 d = uv - uDrops[${i}].xy;
        float dist = length(d);
        float wave = sin(dist * 90.0 - age * 7.0);
        float env = exp(-dist * 9.0) * exp(-age * 1.15);
        vec2 dir = dist > 0.0008 ? d / dist : vec2(0.0);
        offset += dir * wave * env * alive * 0.016;
      }
    `;
  }

  const vertSrc = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos * 0.5 + 0.5;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;
  const fragSrc = `
    precision mediump float;
    uniform sampler2D uPond;
    uniform vec2 uOrigin;
    uniform vec2 uSpan;
    uniform float uTime;
    uniform vec2 uCursor;
    uniform float uWake;
    uniform vec3 uDrops[${DROP_COUNT}];
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec2 offset = vec2(
        sin(uv.y * 18.0 + uTime * 0.45) * 0.0028 + sin(uv.x * 9.0 - uTime * 0.22) * 0.0012,
        cos(uv.x * 14.0 + uTime * 0.32) * 0.0028
      );
      vec2 wake = uv - uCursor;
      float wd = length(wake);
      float wakeAmp = exp(-wd * 16.0) * uWake;
      vec2 wdir = wd > 0.0008 ? wake / wd : vec2(0.0);
      offset += wdir * sin(wd * 70.0 - uTime * 5.5) * wakeAmp * 0.014;
      ${dropGlsl}
      vec2 sampleUv = clamp(uOrigin + (uv + offset) * uSpan, vec2(0.001), vec2(0.999));
      vec4 color = texture2D(uPond, sampleUv);
      float crest = clamp(length(offset) * 20.0, 0.0, 1.0);
      color.rgb += vec3(0.95, 0.98, 0.96) * crest * 0.32;
      color.rgb *= 1.0 - crest * 0.08;
      gl_FragColor = color;
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  const vert = compile(gl.VERTEX_SHADER, vertSrc);
  const frag = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return () => {};
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return () => {};
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uOrigin = gl.getUniformLocation(program, "uOrigin");
  const uSpan = gl.getUniformLocation(program, "uSpan");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uCursor = gl.getUniformLocation(program, "uCursor");
  const uWake = gl.getUniformLocation(program, "uWake");
  const uDrops = gl.getUniformLocation(program, "uDrops[0]");
  gl.uniform1i(gl.getUniformLocation(program, "uPond"), 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.clearColor(0, 0, 0, 0);

  let imgW = 16;
  let imgH = 9;
  const painting = new Image();
  painting.onload = () => {
    if (isCancelled()) return;
    imgW = painting.naturalWidth || imgW;
    imgH = painting.naturalHeight || imgH;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, painting);
    imageReady = true;
    draw(performance.now());
    if (!reduce && onscreen) start();
  };
  painting.src = pondUrl;

  function cover() {
    const canvasAspect = width / Math.max(height, 1);
    const imageAspect = imgW / imgH;
    let spanX = 1;
    let spanY = 1;
    if (canvasAspect > imageAspect) spanY = imageAspect / canvasAspect;
    else spanX = canvasAspect / imageAspect;
    const biasX = width < 760 ? 0.12 : 0.22;
    gl.uniform2f(uOrigin, (1 - spanX) * biasX, (1 - spanY) * 0.5);
    gl.uniform2f(uSpan, spanX, spanY);
  }

  function measure() {
    const box = room.getBoundingClientRect();
    if (box.width === width && box.height === height) return;
    width = box.width;
    height = box.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function pushDrop(u, v, now) {
    const base = dropIndex * 3;
    drops[base] = u;
    drops[base + 1] = v;
    drops[base + 2] = now;
    dropIndex = (dropIndex + 1) % DROP_COUNT;
    lastDrop = { x: u, y: v, t: now };
  }

  function draw(now) {
    if (!imageReady) return;
    const t = now * 0.001;
    pointer.wake += ((pointer.active ? 1 : 0) - pointer.wake) * 0.08;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uCursor, pointer.x, pointer.y);
    gl.uniform1f(uWake, pointer.wake);
    gl.uniform3fv(uDrops, drops);
    cover();
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function step(now) {
    if (!running) return;
    draw(now);
    frame = requestAnimationFrame(step);
  }

  function start() {
    if (reduce || running || !imageReady || isCancelled()) return;
    running = true;
    step(performance.now());
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  function placePointer(event) {
    const box = room.getBoundingClientRect();
    const u = (event.clientX - box.left) / Math.max(box.width, 1);
    const v = 1 - ((event.clientY - box.top) / Math.max(box.height, 1));
    pointer.x = u;
    pointer.y = v;
    pointer.active = true;
    const now = performance.now() * 0.001;
    const dist = Math.hypot(u - lastDrop.x, v - lastDrop.y);
    if (dist > 0.045 || now - lastDrop.t > 0.16) pushDrop(u, v, now);
  }

  stops.push(listen(room, "pointermove", placePointer));
  stops.push(listen(room, "pointerdown", (event) => {
    placePointer(event);
    pushDrop(pointer.x, pointer.y, performance.now() * 0.001);
  }));
  stops.push(listen(room, "pointerleave", () => {
    pointer.active = false;
  }));

  const seen = new IntersectionObserver((entries) => {
    onscreen = entries.some((entry) => entry.isIntersecting);
    if (reduce) return;
    if (onscreen) start();
    else stop();
  }, { threshold: 0.02 });
  seen.observe(room);
  stops.push(() => seen.disconnect());

  const resized = new ResizeObserver(() => {
    measure();
    if (imageReady) draw(performance.now());
  });
  resized.observe(room);
  stops.push(() => resized.disconnect());

  function onVisibility() {
    if (document.hidden) stop();
    else if (!reduce && onscreen) start();
  }
  stops.push(listen(document, "visibilitychange", onVisibility));

  function onMotion() {
    reduce = motionQuery.matches;
    canvas.style.visibility = reduce ? "hidden" : "";
    if (reduce) stop();
    else start();
  }
  stops.push(listen(motionQuery, "change", onMotion));

  measure();
  if (reduce) canvas.style.visibility = "hidden";
  else onscreen = true;

  return () => {
    stop();
    stops.forEach((stopListener) => stopListener());
  };
}

function startChrome() {
  const stops = [];
  const filterButtons = document.querySelectorAll(".filter-button");
  const projects = document.querySelectorAll(".project");
  const emptyState = document.querySelector(".empty-state");

  filterButtons.forEach((button) => {
    stops.push(listen(button, "click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        if (active) item.setAttribute("aria-pressed", "true");
        else item.removeAttribute("aria-pressed");
      });
      let visibleCount = 0;
      projects.forEach((project) => {
        const visible = filter === "all" || project.dataset.category === filter;
        project.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    }));
  });

  const nav = document.querySelector(".site-nav");
  const syncNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  syncNav();
  stops.push(listen(window, "scroll", syncNav, { passive: true }));

  const toggle = document.querySelector(".menu-toggle");
  const note = document.querySelector(".contents-note");
  const setMenu = (open) => {
    note.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  stops.push(listen(toggle, "click", () => setMenu(!note.classList.contains("is-open"))));
  note.querySelectorAll("a").forEach((link) => {
    stops.push(listen(link, "click", () => setMenu(false)));
  });
  stops.push(listen(document, "click", (event) => {
    if (!note.classList.contains("is-open")) return;
    if (note.contains(event.target) || toggle.contains(event.target)) return;
    setMenu(false);
  }));

  document.querySelectorAll(".photo-slot img").forEach((img) => {
    const slot = img.closest(".photo-slot");
    const mark = () => {
      if (img.naturalWidth > 0) slot.classList.add("has-photo");
    };
    stops.push(listen(img, "load", mark));
    if (img.complete) mark();
  });

  const viewer = document.querySelector(".viewer");
  const viewerImage = document.querySelector("#viewer-image");
  const viewerCaption = document.querySelector("#viewer-caption");
  let pictureIndex = 0;
  let lastTrigger = null;

  function filledSlots() {
    return Array.from(document.querySelectorAll(".photo-slot.has-photo"));
  }

  function showPicture(nextIndex) {
    const slots = filledSlots();
    if (!slots.length) return;
    pictureIndex = (nextIndex + slots.length) % slots.length;
    const image = slots[pictureIndex].querySelector("img");
    const caption = slots[pictureIndex].querySelector(".slot-ready");
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = caption ? caption.textContent : "";
  }

  document.querySelectorAll(".photo-slot").forEach((slot) => {
    stops.push(listen(slot, "click", () => {
      if (!slot.classList.contains("has-photo")) return;
      lastTrigger = slot;
      showPicture(filledSlots().indexOf(slot));
      viewer.showModal();
    }));
    stops.push(listen(slot, "keydown", (event) => {
      if (!slot.classList.contains("has-photo")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      slot.click();
    }));
  });

  const markInteractive = () => {
    document.querySelectorAll(".photo-slot").forEach((slot) => {
      if (!slot.classList.contains("has-photo")) return;
      slot.tabIndex = 0;
      slot.setAttribute("role", "button");
    });
  };
  document.querySelectorAll(".photo-slot img").forEach((img) => {
    stops.push(listen(img, "load", markInteractive));
  });
  markInteractive();

  viewer.querySelectorAll("[data-dir]").forEach((button) => {
    stops.push(listen(button, "click", () => showPicture(pictureIndex + Number(button.dataset.dir))));
  });
  stops.push(listen(viewer, "close", () => { if (lastTrigger) lastTrigger.focus(); }));
  stops.push(listen(document, "keydown", (event) => {
    if (event.key !== "Escape") return;
    if (viewer.open) return;
    if (!note.classList.contains("is-open")) return;
    setMenu(false);
    toggle.focus();
  }));
  stops.push(listen(viewer, "keydown", (event) => {
    if (event.key === "ArrowRight") showPicture(pictureIndex + 1);
    if (event.key === "ArrowLeft") showPicture(pictureIndex - 1);
  }));

  return () => stops.forEach((stop) => stop());
}

export function startPage(pondUrl) {
  let cancelled = false;
  const stopPond = startPond(pondUrl, () => cancelled);
  const stopChrome = startChrome();
  return () => {
    cancelled = true;
    stopPond();
    stopChrome();
  };
}
