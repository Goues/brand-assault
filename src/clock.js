let isRunning = false;
let raf = null;
let start = null;

const listeners = new Set();

export const getStart = () => start;

export const addListener = listener => {
  listeners.add(listener);

  if (!isRunning) {
    run();
  }

  return () => removeListener(listener);
};

export const removeListener = listener => {
  listeners.delete(listener);

  if (listeners.size === 0) {
    stop();
  }
};

const tick = frame => {
  if (start === null) {
    start = frame;
  }
  for (const listener of listeners) {
    try {
      listener(frame);
    } catch (e) {
      console.error(e);
    }
  }
  if (isRunning) {
    raf = window.requestAnimationFrame(tick);
  }
};

export const run = () => {
  isRunning = true;
  raf = window.requestAnimationFrame(tick);
};

export const stop = () => {
  isRunning = false;
  if (raf) {
    window.cancelAnimationFrame(raf);
  }
};