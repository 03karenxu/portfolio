import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function SquigglyArrow({
  className = "",
  containerRef,
  startRef,
  endRef,
  ready = true,
}) {
  const pathRef = useRef(null);
  const arrowRef = useRef(null);
  const animationFrameRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [length, setLength] = useState(0);
  const [box, setBox] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    function measure() {
      if (!containerRef?.current || !startRef?.current || !endRef?.current)
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      const startX = startRect.right - containerRect.left;
      const startY = startRect.bottom - containerRect.top;
      const endX = endRect.left - containerRect.left + endRect.width * 0.35;
      const endY = endRect.top - containerRect.top + endRect.height;

      setBox({
        left: startX,
        top: startY - 90,
        width: Math.abs(endX - startX),
        height: Math.abs(endY - startY),
        flipY: endY < startY,
      });
    }

    measure();
    window.addEventListener("resize", measure);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }

    const ro = new ResizeObserver(measure);
    if (containerRef?.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [containerRef, startRef, endRef]);

  useEffect(() => {
    if (!containerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          setIsVisible(true);
        } else if (entry.intersectionRatio === 0) {
          setIsVisible(false);
          hasAnimatedRef.current = false;
        }
      },
      {
        threshold: [0, 0.1],
      },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (
      !isVisible ||
      !ready ||
      !pathRef.current ||
      !box ||
      hasAnimatedRef.current
    ) {
      if (!isVisible && pathRef.current) {
        const path = pathRef.current;
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        if (arrowRef.current) arrowRef.current.style.opacity = "0";
      }
      return;
    }

    hasAnimatedRef.current = true;
    const path = pathRef.current;
    const arrow = arrowRef.current;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const pathLength = path.getTotalLength();
    setLength(pathLength);

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    let startTime = null;
    const duration = 1500;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const distance = eased * pathLength;

      const point = path.getPointAtLength(distance);
      const behindDistance = Math.max(distance - 1, 0);
      const behindPoint = path.getPointAtLength(behindDistance);

      const angle =
        (Math.atan2(point.y - behindPoint.y, point.x - behindPoint.x) * 180) /
        Math.PI;

      if (arrow) {
        arrow.setAttribute(
          "transform",
          `translate(${point.x}, ${point.y}) rotate(${angle})`,
        );
        arrow.style.opacity = distance > 1 ? "1" : "0";
      }

      path.style.strokeDashoffset = pathLength - distance;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, ready, box]);

  if (!box) return null;

  return (
    <svg
      viewBox="0 0 142.32632 33.230305"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        transform: `${box.flipY ? "scaleY(-1) " : ""}rotate(5deg)`,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <g transform="translate(-36.834844,-90.117185)">
        <path
          ref={pathRef}
          d="
  M 34.922782,113.49904
C 34.922782,113.49904 46.946381,124.94123 70.76458,125.90582
C 105,127.29228 105,100.13488 92.715591,100.80461
C 80.571195,101.46671 82.925082,131.08109 124.10253,127.67468
C 154.87947,125.12865 171.85747,102.47079 171.85747,102.47079
"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
          style={{
            strokeDasharray: length,
            strokeDashoffset: length,
          }}
        />

        <path
          ref={arrowRef}
          d="M -2,-4 9,0 -2,4 c 2,-2.33 2,-5.66 0,-8 z"
          style={{
            fill: "currentColor",
            fillRule: "evenodd",
            opacity: 0,
          }}
        />
      </g>
    </svg>
  );
}
