import { useEffect, useRef, useState } from "react";

function Tag({ children, className = "" }) {
  return (
    <div
      className={`font-poppins text-charcoal border-light-gray flex w-fit items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function TagList({ items, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
function useAutoScroll(ref, { enabled, speed, pauseOnInteract = 1500 }) {
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef(null);

  const pause = () => {
    setIsPaused(true);
    clearTimeout(resumeTimer.current);
  };

  const resume = (delay = 0) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), delay);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let rafId;
    let lastTime = null;

    const tick = (time) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        const loopWidth = element.scrollWidth / 2;
        element.scrollLeft += (speed * delta) / 1000;
        if (element.scrollLeft >= loopWidth) {
          element.scrollLeft -= loopWidth;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ref, enabled, speed, isPaused]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const onPointerDown = () => pause();
    const onPointerUp = () => resume(pauseOnInteract);

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerup", onPointerUp);
    };
  }, [ref, enabled, pauseOnInteract]);

  return { pause, resume };
}

function HorizontalTagList({
  items,
  className = "",
  background = "var(--color-light-gray)",
  autoScroll = true,
  speed = 40,
}) {
  const scrollRef = useRef(null);
  const { pause, resume } = useAutoScroll(scrollRef, {
    enabled: autoScroll && items.length > 0,
    speed,
  });

  const loopItems = autoScroll ? [...items, ...items] : items;

  return (
    <div
      className={`relative w-full min-w-0 ${className}`}
      onMouseEnter={() => autoScroll && pause()}
      onMouseLeave={() => autoScroll && resume()}
    >
      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain py-2"
      >
        {loopItems.map((item, index) => (
          <Tag key={`${item}-${index}`} className="shrink-0">
            {item}
          </Tag>
        ))}
      </div>

      <div
        className="pointer-events-none absolute top-0 -left-1 h-full w-2"
        style={{
          background: `linear-gradient(to left, transparent, ${background})`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 -right-1 h-full w-3"
        style={{
          background: `linear-gradient(to right, transparent, ${background})`,
        }}
      />
    </div>
  );
}

export { Tag, TagList, HorizontalTagList };
