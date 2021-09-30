import { run as begin, stop as pause } from "./controls";
import store from "./gameState";

let isRunning = false;
let raf = null;
let start = 0;
let lastFrame = null;

const listeners = new Set();


export const getStart = () => start;

export const addListener = (listener) => {
  listeners.add(listener);

  if (!isRunning) {
    run();
  }

  return () => removeListener(listener);
};

export const removeListener = (listener) => {
  listeners.delete(listener);

  if (listeners.size === 0) {
    stop();
  }
};

const tick = (frame) => {
  for (const listener of listeners) {
    try {
      listener(frame, frame - lastFrame);
    } catch (e) {
      console.error(e);
    }
  }
  if (!listeners.size) {
    stop();
  }
  if (isRunning) {
    raf = window.requestAnimationFrame(tick);
  }
  lastFrame = frame;
};

export const run = () => {
  isRunning = true;
  store.dispatch(begin())
  raf = window.requestAnimationFrame((frame) => {
    start = frame;
    lastFrame = frame;
    tick(frame);
  });
};

export const stop = () => {
  isRunning = false;
  store.dispatch(pause())
  if (raf) {
    window.cancelAnimationFrame(raf);
  }
};
