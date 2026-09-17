import { useEffect, useRef, useState } from "react";

export default function ScrollCard({
  children,
  className = "",
  background = "var(--color-light-gray)",
}) {
  const contentRef = useRef(null);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);

  const checkScrollable = () => {
    const element = contentRef.current;
    if (!element) return;

    setHasMoreBelow(
      element.scrollHeight - element.scrollTop > element.clientHeight + 1,
    );
  };

  useEffect(() => {
    checkScrollable();

    const element = contentRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className={`relative flex h-full overflow-hidden rounded-lg ${className}`}
      style={{ background }}
    >
      <div
        ref={contentRef}
        onScroll={checkScrollable}
        className="flex w-full flex-col gap-4 overflow-y-auto"
      >
        {children}
      </div>

      {hasMoreBelow && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-15"
          style={{
            background: `linear-gradient(to top, ${background}, transparent)`,
          }}
        />
      )}
    </div>
  );
}
