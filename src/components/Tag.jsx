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
function HorizontalTagList({
  items,
  className = "",
  background = "var(--color-light-gray)",
}) {
  const scrollRef = useRef(null);
  const [hasMoreLeft, setHasMoreLeft] = useState(false);
  const [hasMoreRight, setHasMoreRight] = useState(false);

  const checkScrollable = () => {
    const element = scrollRef.current;
    if (!element) return;

    setHasMoreLeft(element.scrollLeft > 0);
    setHasMoreRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  };

  useEffect(() => {
    checkScrollable();

    const element = scrollRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [items]);

  return (
    <div className={`relative w-full min-w-0 ${className}`}>
      <div
        ref={scrollRef}
        onScroll={checkScrollable}
        className="no-scrollbar flex w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain py-2"
      >
        {items.map((item, index) => (
          <Tag key={`${item}-${index}`} className="shrink-0">
            {item}
          </Tag>
        ))}
      </div>

      {hasMoreLeft && (
        <div
          className="pointer-events-none absolute top-0 -left-1 h-full w-8"
          style={{
            background: `linear-gradient(to left, transparent, ${background})`,
          }}
        />
      )}

      {hasMoreRight && (
        <div
          className="pointer-events-none absolute top-0 -right-1 h-full w-8"
          style={{
            background: `linear-gradient(to right, transparent, ${background})`,
          }}
        />
      )}
    </div>
  );
}

export { Tag, TagList, HorizontalTagList };
